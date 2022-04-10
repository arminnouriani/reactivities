import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'

export default function NavBar() {
    const {activityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img alt='logo' src='/assets/logo.png' style={{ marginRight: '10px' }}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activites' />
                <Menu.Item>
                    <Button onClick={()=> activityStore.openForm()} positive content='Create Activiy'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}