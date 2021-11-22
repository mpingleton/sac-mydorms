import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';

export const AuthRoutes = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Routes>
);

export default AuthRoutes;
