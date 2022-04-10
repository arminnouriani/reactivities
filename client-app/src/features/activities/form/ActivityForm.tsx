import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer( function ActivityForm() {
    const {activityStore} = useStore();
    const {closeForm,loading,createActivity,updateActivity} = activityStore;
    const initialState = activityStore.selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handelSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handelSubmit} autoComplete="off">
                <Form.Input placeholder='Title' name="title" value={activity.title} onChange={handelInputChange} />
                <Form.TextArea placeholder='Description' name="description" value={activity.description} onChange={handelInputChange} />
                <Form.Input type='date' placeholder='Date' name="date" value={activity.date} onChange={handelInputChange} />
                <Form.Input placeholder='Category' name="category" value={activity.category} onChange={handelInputChange} />
                <Form.Input placeholder='City' name="city" value={activity.city} onChange={handelInputChange} />
                <Form.Input placeholder='Venue' name="venue" value={activity.venue} onChange={handelInputChange} />
                <Button loading={loading} type='submit' content="Subimt" floated='right' positive onChange={handelInputChange} />
                <Button content="Cancel" floated='right' onClick={closeForm} onChange={handelInputChange} />
            </Form>
        </Segment>
    )
})