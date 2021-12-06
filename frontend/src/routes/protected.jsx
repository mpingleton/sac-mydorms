import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/layout';

import { Dashboard } from '@/features/misc';
import { Residents } from '@/features/residents';
import { Rooms } from '@/features/rooms';
import { WorkOrders } from '@/features/work_orders';
import { Inspections } from '@/features/inspections';
import { CommonArea } from '@/features/common_area';
import { Events } from '@/features/events';
import { Messages } from '@/features/messages';
import { BasesBuildingsRooms } from '@/features/bases_buildings_rooms';
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
      { path: '/app/rooms', element: <Rooms /> },
      { path: '/app/workorders', element: <WorkOrders /> },
      { path: '/app/inspections', element: <Inspections /> },
      { path: '/app/commonarea', element: <CommonArea /> },
      { path: '/app/events', element: <Events /> },
      { path: '/app/messages', element: <Messages /> },
      { path: '/app/bases_buildings_rooms', element: <BasesBuildingsRooms /> },
      { path: '/app', element: <Dashboard /> },
      { path: '/app/*', element: <Navigate to="." /> },
    ],
  },
];

export default protectedRoutes;
