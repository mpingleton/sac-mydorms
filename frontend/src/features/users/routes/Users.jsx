import React from 'react';

import { ContentLayout } from '@/components/layout';
import { Authorization, ROLES } from '@/lib/authorization';

import { UsersList } from '../components/UsersList';

export const Users = () => (
  <ContentLayout title="Users">
    <div style={{ width: '100%', height: '100%' }}>
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <UsersList />
      </Authorization>
    </div>
  </ContentLayout>
);

export default Users;
