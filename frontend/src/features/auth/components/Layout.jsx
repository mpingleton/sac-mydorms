import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Box, Link, Typography, Card,
} from '@mui/material';

import { Head } from '@/components/elements/Head';
import SACPatchImage from '@/assets/sac-patch.png';

export const Layout = ({ children, title }) => (
  <>
    <Head title={title} />
    <Container
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', sm: { px: 6 }, lg: { px: 8 } }}
    >
      <Box sx={{ mx: [0, 'auto'], width: ['auto', '100%'], maxWidth: ['none', '28rem'] }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={SACPatchImage} height={100} p={3} />
          </Link>
        </Box>

        <Typography
          variant="h2"
          sx={{ textAlign: 'center', fontWeight: 800, fontSize: '1.875rem', lineHeight: '2.25rem' }}
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
