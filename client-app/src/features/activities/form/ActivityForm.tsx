import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/Models/Activity';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { loading, createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useNavigate();
    // const location = useLocation();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required("The activity title is required"),
        description: Yup.string().required("The activity description is required"),
        date: Yup.string().required("The activity date is required").nullable(),
        category: Yup.string().required("The activity category is required"),
        city: Yup.string().required("The activity city is required"),
        venue: Yup.string().required("The activity venue is required")
    })

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
        else {
            setActivity({
                id: '',
                title: '',
                description: '',
                category: '',
                date: null,
                city: '',
                venue: ''
            })
        }

    }, [id, loadActivity])


    function handleFormSubmit(activity: Activity) {
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



    if (loadingInitial && id) return (<LoadingComponent content='Loading activity...' />);

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, dirty, isSubmitting}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name='title' placeholder='title'></MyTextInput>
                        <MyTextArea row={3} placeholder='Description' name="description" />
                        <MyDateInput
                            placeholderText='Date'
                            name="date"
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM dd, yyyy hh:mm aa'
                        />
                        <MySelectInput options={categoryOptions} placeholder='Category' name="category" />
                        <Header content='Activity Location' sub color='teal' />
                        <MyTextInput placeholder='City' name="city" />
                        <MyTextInput placeholder='Venue' name="venue" />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}
                            loading={loading}
                            type='submit'
                            content="Subimt"
                            floated='right'
                            positive />
                        <Button as={Link} to='/activities' content="Cancel" floated='right' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})