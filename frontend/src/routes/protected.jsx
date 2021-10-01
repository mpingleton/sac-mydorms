import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/layout';

import { Dashboard } from '@/features/misc';
import { Residents } from '@/features/residents';
import { Profile, Users } from '@/features/users';

const App = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/app/users', element: <Users /> },
      { path: '/app/profile', element: <Profile /> },
      { path: '/app/residents', element: <Residents /> },
      { path: '/app', element: <Dashboard /> },
      { path: '/app/*', element: <Navigate to="." /> },
    ],
  },
];

export default protectedRoutes;
