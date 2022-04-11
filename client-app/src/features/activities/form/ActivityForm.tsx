import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { loading, createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useNavigate();
    // const location = useLocation();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
        else{
            setActivity({
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            })
        }

    }, [id, loadActivity])


    function handelSubmit() {
        if (activity.id.length === 0) {
            let newActivity = { ...activity, id: uuid() };
            createActivity(newActivity).then(() => {
                history(`/activities/${activity.id}`);
            })
        }
        else {
            updateActivity(activity).then(() => {
                history(`/activities/${activity.id}`);
            })
        }
    }

    function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial && id) return (<LoadingComponent content='Loading activity...' />);

    return (
        <Segment clearing>
            
            <Form onSubmit={handelSubmit} autoComplete="off">
                <Form.Input placeholder='Title' name="title" value={activity.title} onChange={handelInputChange} />
                <Form.TextArea placeholder='Description' name="description" value={activity.description} onChange={handelInputChange} />
                <Form.Input type='date' placeholder='Date' name="date" value={activity.date} onChange={handelInputChange} />
                <Form.Input placeholder='Category' name="category" value={activity.category} onChange={handelInputChange} />
                <Form.Input placeholder='City' name="city" value={activity.city} onChange={handelInputChange} />
                <Form.Input placeholder='Venue' name="venue" value={activity.venue} onChange={handelInputChange} />
                <Button loading={loading} type='submit' content="Subimt" floated='right' positive />
                <Button as={Link} to='/activities' content="Cancel" floated='right' />
            </Form>
        </Segment>
    )
})