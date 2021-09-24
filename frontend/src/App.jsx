import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <AppProvider>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Hello World
          </Typography>
        </Toolbar>
      </AppBar>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
