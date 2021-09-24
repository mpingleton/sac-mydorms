import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Container, Stack, AppBar, Toolbar, Typography } from '@mui/material';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';

export const MainLayout = ({ children }) => {
  const { checkAccess } = useAuthorization();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', to: '.' },
    checkAccess({ allowedRoles: [ROLES.ADMIN] })
      && { name: 'Users', to: './users' },
    { name: 'Your Profile', to: './profile' },
    { name: 'Sign out', to: '', onClick: () => logout() },
  ].filter(Boolean);

  return (
    <Container>
      <Stack>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
              Hello World
            </Typography>
          </Toolbar>
        </AppBar>

        {navigation.map((item, index) => (
          <NavLink
            end={index === 0}
            key={item.name}
            to={item.to}
            onClick={item.onClick}
          >
            {item.name}
          </NavLink>
        ))}
      </Stack>

      {children}
    </Container>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainLayout;
