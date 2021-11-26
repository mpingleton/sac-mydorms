/* eslint-disable no-else-return */

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import {
  Button,
  Stack,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountBox as AccountBoxIcon,
  NavigateBefore as BackIcon,
  NavigateNext as ForwardIcon,
  ArrowCircleRight as ArrowCircleRightIcon,
} from '@mui/icons-material';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';

import getMyEnrollment from '@/api/getMyEnrollment';

export const MainLayout = ({ children }) => {
  const [leftDrawerIsOpen, setLeftDrawerPosition] = React.useState(false);
  const [rightDrawerIsOpen, setRightDrawerPosition] = React.useState(false);
  const [userEnrollment, setUserEnrollment] = React.useState({});

  const { checkAccess } = useAuthorization();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    getMyEnrollment().then((responseData) => setUserEnrollment(responseData));
  }, [user.id]);

  if (userEnrollment.id === undefined) {
    return (<Typography>Loading...</Typography>);
  } else if (userEnrollment.id < 0) {
    return (
      <Stack direction="row" spacing={1}>
        <Typography>ERROR: This account is not properly registered.</Typography>
        <Button variant="contained" onClick={() => logout()}>Logout</Button>
      </Stack>
    );
  }

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
    userEnrollment.personnelObject.is_dorm_manager
     && { name: 'Residents', to: './residents' },
    userEnrollment.personnelObject.is_dorm_manager
     && { name: 'Rooms', to: './rooms' },
    { name: 'Work Orders', to: './workorders' },
    { name: 'Inspections', to: './inspections' },
    { name: 'Common Area', to: './commonarea' },
    { name: 'Events', to: './events' },
    { name: 'Messages', to: './messages' },
  ].filter(Boolean);

  const navigationTwo = [
    checkAccess({ allowedRoles: [ROLES.ADMIN] })
      && { name: 'Users', to: './users' },
    { name: 'Your Profile', to: './profile' },
    { name: 'Sign out', to: '', onClick: () => logout() },
  ].filter(Boolean);

  return (
    <Stack direction="column" sx={{ width: '100vw', height: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
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
                    <ArrowCircleRightIcon />
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
                    <ArrowCircleRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      {children}
    </Stack>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainLayout;
