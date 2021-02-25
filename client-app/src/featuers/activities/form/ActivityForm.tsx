import React,{ChangeEvent, useState} from 'react'
import { act } from 'react-dom/test-utils'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/Activity'
import { v4 as uuid } from 'uuid';



interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initializeFormState,
  createActivity,
  editActivity
}) => {
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
