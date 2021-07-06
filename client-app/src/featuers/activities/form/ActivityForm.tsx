import React,{ChangeEvent, useState,useEffect } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'
import { v4 as uuid } from 'uuid';
import { useContext } from 'react';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';


interface DetailParam{
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({match,history}) => {
  const activityStore = useContext(ActivityStore);
  const {createActivity,
         editActivity,
         submitting,
         activity : initializeFormState,
         loadActivity,
         clearActivity} = activityStore;
         
  useEffect(() => {
    if(match.params.id && activity.id.length == 0) {
    loadActivity(match.params.id).then(()=>{
      initializeFormState && setActivity(initializeFormState)
    });
   }
   return () => {
     clearActivity();
   }
  },[loadActivity,match.params.id,clearActivity,initializeFormState])


  const [activity, setActivity] = useState<IActivity>( {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  const handleSubmmit = () => {
    
    if (activity.id.length === 0) {
      //Create Mode
      //console.log(activity);
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`));
      console.log(newActivity);
    } else {
      //Edit mode
      editActivity(activity).then(()=> history.push(`/activities/${activity.id}`));;
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
          onClick={() => history.push('/activities')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm)