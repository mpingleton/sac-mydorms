import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const RegisterForm = () => (
  <Stack direction="column" spacing={1}>
    <TextField type="name" label="Name" fullWidth />
    <TextField type="email" label="Email Address" fullWidth />
    <TextField type="password" label="Password" fullWidth />
    <Stack direction="row" spacing={1}>
      <Button variant="contained" onClick={() => {}} fullWidth>Cancel</Button>
      <Button variant="contained" onClick={() => {}} disabled fullWidth>Register</Button>
    </Stack>
  </Stack>
);

export default RegisterForm;
