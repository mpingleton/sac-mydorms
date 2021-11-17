import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Landing, Register } from '@/features/misc';
import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuth();
  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/register', element: <Register /> },
  ];
  const routes = auth.user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
};

export default AppRoutes;
