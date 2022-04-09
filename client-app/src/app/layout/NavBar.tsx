import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface Prop {
    openForm: () => void;
}
export default function NavBar({ openForm }: Prop) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img alt='logo' src='/assets/logo.png' style={{ marginRight: '10px' }}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activites' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Activiy'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}