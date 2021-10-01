import React from 'react';
import PropTypes from 'prop-types';

import { useAuth } from './auth';

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const POLICIES = {
  'user:delete': (user) => {
    if (user.role === 'ADMIN') {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.role);
      }

      return true;
    },
    [user.role],
  );

  return { checkAccess, role: user.role };
};

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (policyCheck && typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};

Authorization.propTypes = {
  policyCheck: PropTypes.bool,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  forbiddenFallback: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Authorization.defaultProps = {
  policyCheck: null,
  forbiddenFallback: null,
};
