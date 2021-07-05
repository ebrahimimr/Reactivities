import React,{ChangeEvent, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'
import { v4 as uuid } from 'uuid';
import { useContext } from 'react';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';


interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
  activity: initializeFormState
}) => {
  const activityStore = useContext(ActivityStore);
  const {createActivity,editActivity,submitting,cancelFormOpen} = activityStore;
  const initializeForm = () => {
    if (initializeFormState) {
      return initializeFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmmit = () => {
    
    if (activity.id.length === 0) {
      //Create Mode
      //console.log(activity);
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
      console.log(newActivity);
    } else {
      //Edit mode
      editActivity(activity);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //console.log(event.target.value);
    //(event : any)
    //const{name,value}=event.target;.
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Titile"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="date"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button loading ={submitting} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm)