import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PageNotFound from './components/PageNotFound';
import SignUp from './pages/SignUp';
import FillOTP from './pages/FillOTP';


function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/fill-otp/:name/:email/:password' element={<FillOTP />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
