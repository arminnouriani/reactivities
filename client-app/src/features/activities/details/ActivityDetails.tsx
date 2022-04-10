import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


export default function ActivityDetails () {
    const {activityStore} = useStore();
    const activity = activityStore.selectedActivity;
    if(!activity) return (<LoadingComponent />);
    return (
        <Card fluid>
            <Image src={`/assets/categoryimages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group fluid>
                    <Button basic color='blue' content='Edit' onClick={()=> activityStore.openForm(activity.id)} />
                    <Button basic color='grey' content='Cancel' onClick={()=> activityStore.cancelSelectActivity()} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}