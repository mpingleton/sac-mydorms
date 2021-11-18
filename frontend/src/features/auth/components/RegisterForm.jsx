import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import registerCall from '../api/register';

export const RegisterForm = ({ onSuccess }) => {
  const [resName, setName] = React.useState('');
  const [resEmail, setEmail] = React.useState('');
  const [resPassword, setPassword] = React.useState('');

  const submit = () => {
    const data = {
      name: resName,
      email: resEmail,
      password: resPassword,
    };

    registerCall(data).then(() => onSuccess());
  };

  return (
    <Stack direction="column" spacing={1}>
      <TextField
        label="Name"
        fullWidth
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        type="email"
        label="Email Address"
        fullWidth
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        fullWidth
        onChange={(event) => setPassword(event.target.value)}
      />
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={() => {}}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => { submit(); }}
          fullWidth
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSuccess: () => {},
};

export default RegisterForm;
