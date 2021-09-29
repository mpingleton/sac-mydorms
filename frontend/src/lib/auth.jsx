import React from 'react';
import { initReactQueryAuth } from 'react-query-auth';
import CircularProgress from '@mui/material/CircularProgress';

import {
  getUser,
  loginWithEmailAndPassword,
  logout,
  refreshTokens,
} from '@/features/auth';
import storage from '@/utils/storage';

async function handleUserResponse(data) {
  const { tokens, user } = data;
  storage.setToken('access', tokens?.access?.token);
  storage.setToken('refresh', tokens?.refresh?.token);
  return user;
}

async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  logout();
  storage.clearTokens();
  window.location.assign(window.location.origin);
}

async function loadUser() {
  if (storage.getToken('access')) {
    const user = await getUser()
      .then((data) => data.user)
      .catch(() => (
        refreshTokens(storage.getToken('refresh'))
          .then((data) => handleUserResponse(data))
          .catch(logoutFn)
      ));
    return user;
  }
  return null;
}

const authConfig = {
  loadUser,
  loginFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);
