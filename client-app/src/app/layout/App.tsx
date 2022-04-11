import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
// import HomePage from '../../features/home/homepage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
    <>

      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path='activities' element={<ActivityDashboard />} ></Route>
          <Route path='activities/:id' element={<ActivityDetails />} ></Route>
          <Route key={location.key} path='createActivity' element={<ActivityForm />} ></Route>
          <Route key={location.key} path='manage/:id' element={<ActivityForm />} ></Route>
        </Routes>
      </Container>


    </>
  );
}

export default observer(App);

