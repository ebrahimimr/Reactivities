import React, { useState,useEffect,Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { IActivity } from "../Models/Activity";
import { NavBar } from "../../featuers/nav/NavBar";
import { ActivityDashboard } from "../../featuers/activities/dashboard/ActivityDashboard";


const App =() => {
  const[activities,setActivities] = useState<IActivity[]>([]);
  const[selectedActivity,setSelectedActivity] =useState<IActivity | null >(null);
  const[editMode,setEditMode] = useState(false);

  const handleSelectActivity =(id:string) => {
      setSelectedActivity(activities.filter(a => a.id === id)[0]);
  }

  const handleOpenCreateForm  = () =>{
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity : IActivity ) =>
  {
    setActivities([...activities,activity]);
    setSelectedActivity(activity);
    setEditMode (false);
  }
  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id),activity]);
    setSelectedActivity(activity);
    setEditMode (false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
    setSelectedActivity(null);
    setEditMode (false);
  }


  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/Activities")
        .then((response) => {
          setActivities(response.data);  
          });
  }, [])
 
    return (
      <Fragment>
        <NavBar OpenCreateForm ={handleOpenCreateForm}/>
        <Container style = {{marginTop:"7em"}}>
          <ActivityDashboard 
              activities={activities} 
              selectActivity={handleSelectActivity}
              selectedActivity={selectedActivity!}
              editMode ={editMode}
              setEditMode ={setEditMode}
              setSelectedActivity = {setSelectedActivity}
              createActivity ={handleCreateActivity}
              editActivity = {handleEditActivity}
              deleteActivity={handleDeleteActivity}/>
        </Container>
      </Fragment>
    );

}

export default App;
