import React from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'

interface IProps{
  activity : IActivity;
  setEditMode : (editMode : boolean) => void;
  setSelectedActivity :(activity : IActivity | null) =>void;
}

export const ActivityDetails :React.FC<IProps> = ({activity,setEditMode,setSelectedActivity}) => {
    return (
      <Card fluid>
        <Image
          src={`/assets/categoryimages/${activity.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{activity.date}</span>
          </Card.Meta>
          <Card.Description>{activity.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <ButtonGroup widths={2}>
            <Button
              onClick={() => setEditMode(true)}
              basic
              content="Edit"
              color="blue"
            />
            <Button
              onClick={() => setSelectedActivity(null)}
              basic
              content="Cancel"
              color="grey"
            />
          </ButtonGroup>
        </Card.Content>
      </Card>
    );
}
