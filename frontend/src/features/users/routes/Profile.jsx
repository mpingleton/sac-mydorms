import React from 'react';
import PropTypes from 'prop-types';
import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

const Entry = ({ label, value }) => (
  <div>
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
);

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <ContentLayout title="Profile">
      <div>
        <div>
          <dl>
            <Entry label="Name" value={user.name} />
            <Entry label="Email Address" value={user.email} />
            <Entry label="Role" value={user.role} />
          </dl>
        </div>
      </div>
    </ContentLayout>
  );
};

Entry.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Profile;
