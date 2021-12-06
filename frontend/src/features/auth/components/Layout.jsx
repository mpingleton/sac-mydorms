import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Box, Typography, Card,
} from '@mui/material';

import { Head } from '@/components/elements/Head';

export const Layout = ({ children, title }) => (
  <>
    <Head title={title} />
    <Container
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', sm: { px: 6 }, lg: { px: 8 } }}
    >
      <Box sx={{ mx: [0, 'auto'], width: ['auto', '100%'], maxWidth: ['none', '28rem'] }}>
        <Typography
          variant="h2"
          sx={{ textAlign: 'center', fontWeight: 800, fontSize: '1.875rem', lineHeight: '2.25rem' }}
          color="text.primary"
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, mx: [0, 'auto'], width: ['auto', '100%'], maxWidth: ['none', '28rem'] }}>
        <Card sx={{ py: 4, px: [2, 5] }} variant="outlined">
          {children}
        </Card>
      </Box>
    </Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: '',
};

export default Layout;
