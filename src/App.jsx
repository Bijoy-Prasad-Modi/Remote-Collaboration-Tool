import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PageNotFound from './components/PageNotFound';
import SignUp from './pages/SignUp';
import FillOTP from './pages/FillOTP';
import Dashboard from './components/Dashboard/Dashboard';
import Createroom from './components/Createroom/Createroom';


function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/fill-otp/:name/:email/:password' element={<FillOTP />} />
        <Route path='/dashboard/:roomID/:userID' element={<Dashboard />} />
        <Route path='/create-room/:userID' element={<Createroom />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
