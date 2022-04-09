import React from 'react';
import { Button, Item, ItemExtra, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/Models/Activity';

interface Prop {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}
export default function ActivityList({ activities,selectActivity,deleteActivity }: Prop) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a' >{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city} , {activity.venue}</div>
                            </Item.Description>
                            <ItemExtra>
                                <Button onClick={()=> selectActivity(activity.id)} floated='right' color='blue' content='View' />
                                <Button onClick={()=> deleteActivity(activity.id)} floated='right' color='red' content='Delete' />
                                <Label basic content={activity.category} />
                            </ItemExtra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}