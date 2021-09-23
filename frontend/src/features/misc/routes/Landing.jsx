import React from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/lib/auth';
import { Head } from '@/components/elements/Head';
import SACPatchImage from '@/assets/sac-patch.png';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <Head description="Welcome to MyDorms" />
      <Container component="main" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <CssBaseline />
        <Box maxWidth="80rem" mx="auto" py={12} px={4} textAlign="center">
          <Typography variant="h2" fontWeight="800">MyDorms</Typography>
          <Box component="img" src={SACPatchImage} maxHeight="300px" p={3} />
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button variant="contained" startIcon={<HomeOutlinedIcon />} onClick={handleStart}>
              Get started
            </Button>
            <Link href="https://github.com/therubyshore/sac-mydorms" target="_blank" rel="noreferrer" underline="none">
              <Button variant="outlined" startIcon={<GitHubIcon />}>
                GitHub Repo
              </Button>
            </Link>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Landing;
