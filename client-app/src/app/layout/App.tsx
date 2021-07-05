import React, { useEffect,Fragment, SyntheticEvent, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, List } from "semantic-ui-react";
import  NavBar  from "../../featuers/nav/NavBar";
import ActivityDashboard from "../../featuers/activities/dashboard/ActivityDashboard";
import  LoadingComponent  from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";


const App =() => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Activities ..."/>
    
 
    return (
      <Fragment>
        <NavBar/>
        <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard/>
        </Container>
      </Fragment>
    );

}

export default observer(App);
