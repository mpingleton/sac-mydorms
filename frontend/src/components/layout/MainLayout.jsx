import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Container, Stack, Box, AppBar, Toolbar, IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, AccountBox as AccountBoxIcon, NavigateBefore as BackIcon } from '@mui/icons-material';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';

export const MainLayout = ({ children }) => {
  const [drawerIsOpen, setDrawerPosition] = React.useState(false);

  const { checkAccess } = useAuthorization();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const drawerWidth = 240;

  const openDrawer = () => {
    setDrawerPosition(true);
  };

  const closeDrawer = () => {
    setDrawerPosition(false);
  };

  const navigation = [
    { name: 'Dashboard', to: '.' },
    checkAccess({ allowedRoles: [ROLES.ADMIN] })
      && { name: 'Users', to: './users' },
    { name: 'Your Profile', to: './profile' },
    { name: 'Sign out', to: '', onClick: () => logout() },
  ].filter(Boolean);

  return (
    <Container disableGutters maxWidth={false}>
      <Stack>
        <AppBar position="static" sx={{ zIndex: 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" sx={{ marginRight: 'auto' }} onClick={openDrawer}>
              <MenuIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" sx={{ marginLeft: 'auto' }}>
              <AccountBoxIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={drawerIsOpen} sx={{ zIndex: 2, width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
          <Toolbar>
            <IconButton edge="end" color="inherit" sx={{ marginLeft: 'auto' }} onClick={closeDrawer}>
              <BackIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {navigation.map((item) => (
                <ListItem
                  key={item.name}
                  button
                  onClick={() => {
                    closeDrawer();
                    if (item.onClick === undefined) {
                      navigate(item.to);
                    } else {
                      item.onClick();
                    }
                  }}
                >
                  <ListItemIcon>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
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
