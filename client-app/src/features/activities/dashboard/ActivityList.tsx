import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemExtra, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity,loading,activitiesByDate } = activityStore;

    const [target, setTarget] = useState('');
    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a' >{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city} , {activity.venue}</div>
                            </Item.Description>
                            <ItemExtra>
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' color='blue' content='View' />
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={(e) => handleDeleteActivity(e, activity.id)}
                                    floated='right'
                                    color='red'
                                    content='Delete' />
                                <Label basic content={activity.category} />
                            </ItemExtra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})