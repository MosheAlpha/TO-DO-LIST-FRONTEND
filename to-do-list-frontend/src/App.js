import React, { useState, useEffect } from 'react';
import Login from './Pages/Login';
import Register from './Pages/Register'
import Home from './Pages/Home';
import NotFound from './Pages/404';
import WithNavBarLayout from './Components/WithNavBarLayout';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route element={<WithNavBarLayout/>}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
