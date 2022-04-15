import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path='activities' element={<ActivityDashboard />} ></Route>
          <Route path='activities/:id' element={<ActivityDetails />} ></Route>
          <Route key={location.key} path='createActivity' element={<ActivityForm />} ></Route>
          <Route key={location.key} path='manage/:id' element={<ActivityForm />} ></Route>
          <Route path='/errors' element={<TestErrors />}></Route>
          <Route path='/server-error' element={<ServerError />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);

