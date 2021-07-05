import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent } from 'react'
import { useContext } from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {editMode,selectedActivity} = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList/>
      </Grid.Column>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails/>
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity!}
          />
        )}
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivityDashboard)