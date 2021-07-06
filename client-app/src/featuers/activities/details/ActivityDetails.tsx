import { observer } from 'mobx-react-lite'
import React, { useContext,useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import ActivityStore from '../../../app/stores/activityStore'

interface DetailParams{
  id :string
}

const ActivityDetails :React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
    const activityStore = useContext(ActivityStore);
    const {activity,
          loadActivity,
          loadingInitial} = activityStore;

    useEffect(() => {
     loadActivity(match.params.id);
    }, [loadActivity,match.params.id])

    if (loadingInitial || !activity ) return <LoadingComponent content="Loading Activity ..." />

    return (
      <Card fluid>
        <Image
          src={`/assets/categoryimages/${activity!.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>{activity!.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <ButtonGroup widths={2}>
            {/* onClick={() => openEditForm(activity!.id)} */}
            <Button
              as ={Link} to ={`/manage/${activity.id}`}
              basic
              content="Edit"
              color="blue"
            />
            {/* onClick={cancelSelectedActivity} */}
            {/* onClick={()=>history.goBack()} */}
            <Button
              onClick={()=>history.push('/activities')}
              basic
              content="Cancel"
              color="grey"
            />
          </ButtonGroup>
        </Card.Content>
      </Card>
    );
}
export default observer(ActivityDetails);    