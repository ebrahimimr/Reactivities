import React, { useEffect,Fragment, SyntheticEvent, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import  NavBar  from "../../featuers/nav/NavBar";
import ActivityDashboard from "../../featuers/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route ,RouteComponentProps,withRouter } from "react-router-dom";
import HomePage from "../../featuers/home/HomePage";
import ActivityForm from "../../featuers/activities/form/ActivityForm";
import ActivityDetails from "../../featuers/activities/details/ActivityDetails";


const App : React.FC<RouteComponentProps> =({location}) => {

    
 
    return (
      <Fragment>
                  <Route exact path='/' component={HomePage}/>
                  <Route  path={'/(.+)'} render ={() => (
                    <Fragment>
                        <NavBar/>
                        <Container style={{ marginTop: "7em" }}>
                        <Route exact path='/' component={HomePage}/>
                        <Route exact path='/activities' component={ActivityDashboard}/>
                        <Route path='/activities/:id' component={ActivityDetails}/>
                        <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
                      </Container>
                    </Fragment>
                  )}  />

      </Fragment>
    );

}

export default withRouter(observer(App));
