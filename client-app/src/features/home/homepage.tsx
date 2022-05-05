import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import ModalContainer from '../../app/common/modals/ModalContainer';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <ModalContainer />
            <Container>
                <Header as='h1' inverted>
                    <Image src='/assets/logo.png' size='massive' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as="h2" inverted content='Welecome to Rectivities' />
                        <Button as={Link} to='/activites' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register!
                        </Button>
                    </>

                )}

            </Container>
        </Segment>
    )
})