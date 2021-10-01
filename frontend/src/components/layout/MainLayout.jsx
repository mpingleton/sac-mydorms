import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Container, Stack, Box, AppBar, Toolbar, IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, AccountBox as AccountBoxIcon, NavigateBefore as BackIcon, NavigateNext as ForwardIcon } from '@mui/icons-material';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';

export const MainLayout = ({ children }) => {
  const [leftDrawerIsOpen, setLeftDrawerPosition] = React.useState(false);
  const [rightDrawerIsOpen, setRightDrawerPosition] = React.useState(false);

  const { checkAccess } = useAuthorization();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const drawerWidth = 240;

  const openLeftDrawer = () => {
    setLeftDrawerPosition(true);
    if (rightDrawerIsOpen) {
      setRightDrawerPosition(false);
    }
  };

  const closeLeftDrawer = () => {
    setLeftDrawerPosition(false);
  };

  const openRightDrawer = () => {
    setRightDrawerPosition(true);
    if (leftDrawerIsOpen) {
      setLeftDrawerPosition(false);
    }
  };

  const closeRightDrawer = () => {
    setRightDrawerPosition(false);
  };

  const navigation = [
    { name: 'Dashboard', to: '.' },
    checkAccess({ allowedRoles: [ROLES.ADMIN] })
      && { name: 'Users', to: './users' },
    { name: 'Your Profile', to: './profile' },
    { name: 'Sign out', to: '', onClick: () => logout() },
  ].filter(Boolean);

  const navigationTwo = [
    { name: 'Your Profile', to: './profile' },
    { name: 'Sign out', to: '', onClick: () => logout() },
  ].filter(Boolean);

  return (
    <Container disableGutters maxWidth={false}>
      <Stack>
        <AppBar position="static" sx={{ zIndex: 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" sx={{ marginRight: 'auto' }} onClick={openLeftDrawer}>
              <MenuIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" sx={{ marginLeft: 'auto' }} onClick={openRightDrawer}>
              <AccountBoxIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={leftDrawerIsOpen} sx={{ zIndex: 2, width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
          <Toolbar>
            <IconButton edge="end" color="inherit" sx={{ marginLeft: 'auto' }} onClick={closeLeftDrawer}>
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
                    closeLeftDrawer();
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
        <Drawer variant="persistent" anchor="right" open={rightDrawerIsOpen} sx={{ zIndex: 2, width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" sx={{ marginRight: 'auto' }} onClick={closeRightDrawer}>
              <ForwardIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem
                key="My Account"
                button
                onClick={() => {}}
              >
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItem>
              <ListItem
                key="My Account"
                button
                onClick={() => {}}
              />
              {navigationTwo.map((item) => (
                <ListItem
                  key={item.name}
                  button
                  onClick={() => {
                    closeRightDrawer();
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
