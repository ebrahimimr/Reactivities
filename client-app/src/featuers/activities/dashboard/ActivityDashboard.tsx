import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import ActivityStore from "../../../app/stores/activityStore";
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDashboard: React.FC = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) 
     return <LoadingComponent content="Loading Activities ..."/>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList/>
      </Grid.Column>
      <GridColumn width={6}>
        <h2>Activity filter</h2>
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivityDashboard)