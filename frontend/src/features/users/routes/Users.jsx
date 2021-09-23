import React from 'react';

import { ContentLayout } from '@/components/layout';
import { Authorization, ROLES } from '@/lib/authorization';

import { UsersList } from '../components/UsersList';

export const Users = () => (
  <ContentLayout title="Users">
    <div>
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
