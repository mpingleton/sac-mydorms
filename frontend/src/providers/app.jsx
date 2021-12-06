import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { Notifications } from '@/components/elements/Notifications';

const ErrorFallback = () => (
  <div>
    <h2>Ooops, something went wrong :(</h2>
    <Button onClick={() => window.location.assign(window.location.origin)}>
      Refresh
    </Button>
  </div>
);

// const theme = createTheme();

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000050',
    },
    secondary: {
      main: '#000050',
    },
    text: {
      primary: grey[200],
      secondary: grey[500],
    },
  },
});

export const AppProvider = ({ children }) => (
  <React.Suspense
    fallback={(
      <div>
        <CircularProgress />
      </div>
    )}
  >
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <Notifications />
            <AuthProvider>
              <Router>{children}</Router>
            </AuthProvider>
          </HelmetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.Suspense>
);

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppProvider;
