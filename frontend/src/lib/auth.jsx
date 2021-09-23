import React from 'react';
import { initReactQueryAuth } from 'react-query-auth';
import CircularProgress from '@mui/material/CircularProgress';

import {
  loginWithEmailAndPassword,
  getUser,
} from '@/features/auth';
import storage from '@/utils/storage';

async function handleUserResponse(data) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin);
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
