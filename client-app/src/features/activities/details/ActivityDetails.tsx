import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetaildChat from './ActivityDetaildChat';
import ActivityDetaildInfo from './ActivityDetaildInfo';
import ActivityDetaildSidebar from './ActivityDetaildSidebar';
import ActivityDetaildHeader from './ActivityDetailedHeader';


export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { id } = useParams<{ id: string }>();
    const { loadActivity, selectedActivity: activity, loadingInitial } = activityStore;
    useEffect(() => {
        if (id)
            loadActivity(id);

    }, [id, loadActivity])

    if (loadingInitial || !activity) return (<LoadingComponent />);
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetaildHeader activity={activity}/>
                <ActivityDetaildInfo activity={activity}/>
                <ActivityDetaildChat />
            </Grid.Column>
            <Grid.Column width={6} >
                <ActivityDetaildSidebar />
            </Grid.Column>
        </Grid>
    )
})