import React, { useState,useEffect,Fragment, SyntheticEvent } from "react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { IActivity } from "../models/Activity";
import { NavBar } from "../../featuers/nav/NavBar";
import { ActivityDashboard } from "../../featuers/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";


const App =() => {
  const[activities,setActivities] = useState<IActivity[]>([]);
  const[selectedActivity,setSelectedActivity] =useState<IActivity | null >(null);
  const[editMode,setEditMode] = useState(false);
  const[loading,setLoading] = useState(true);
  const[submitting,setSubmitting] =useState (false);
  const[target,setTarget] =useState ('');


  const handleSelectActivity =(id:string) => {
      setSelectedActivity(activities.filter(a => a.id === id)[0]);
  }

  const handleOpenCreateForm  = () =>{
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity : IActivity ) =>
  {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));

  }
  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));;
  }

  const handleDeleteActivity = (event : SyntheticEvent<HTMLButtonElement>,id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
      setSelectedActivity(null);
      setEditMode(false);
    }).then(() => setSubmitting(false));;
  }


  // useEffect(() => {
  //   axios.get<IActivity[]>("http://localhost:5000/api/Activities")
  //       .then((response) => {
  //         let activities  : IActivity [] = [];
  //         response.data.forEach(activity => {
  //           activity.date = activity.date.split('.')[0];
  //           activities.push(activity);
  //         });
  //         setActivities(activities);  
  //         });
  // }, [])

  //if my default list not define type of return value
  //response.forEach((activity : any)  => {

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: IActivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
    }).then(()=> {
      setLoading(false);
    });
  }, [])

  if (loading) return <LoadingComponent content="Loading Activities ..."/>
    
 
    return (
      <Fragment>
        <NavBar OpenCreateForm={handleOpenCreateForm} />
        <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            selectedActivity={selectedActivity!}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
            createActivity={handleCreateActivity}
            editActivity={handleEditActivity}
            deleteActivity={handleDeleteActivity}
            submitting ={submitting}
            target = {target}
          />
        </Container>
      </Fragment>
    );

}

export default App;
