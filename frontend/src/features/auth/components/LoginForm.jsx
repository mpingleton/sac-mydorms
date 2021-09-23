import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuth } from '@/lib/auth';

export const LoginForm = ({ onSuccess }) => {
  const { login, isLoggingIn } = useAuth();
  const { handleSubmit, control } = useForm();
  const onSubmit = async (values) => {
    await login(values);
    onSuccess();
  };

  return (
    <div>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...field} type="email" label="Email Address" fullWidth />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...field} sx={{ mt: 3 }} type="password" label="Password" fullWidth />
          )}
        />
        <LoadingButton sx={{ mt: 3 }} type="submit" loading={isLoggingIn} variant="contained" fullWidth>
          Log In
        </LoadingButton>
      </Box>
    </div>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func,
};

LoginForm.defaultProps = {
  onSuccess: () => {},
};

export default LoginForm;
