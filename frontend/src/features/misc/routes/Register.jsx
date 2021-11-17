import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import { Head } from '@/components/elements/Head';

export const Register = () => (
  <>
    <Head description="Register for an account" />
    <Container component="main" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <CssBaseline />
      <Box maxWidth="80rem" mx="auto" py={12} px={4} textAlign="center">
        <Typography variant="h2" fontWeight="800">Register for an account</Typography>
      </Box>
    </Container>
  </>
);

export default Register;
