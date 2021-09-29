/* eslint-disable no-param-reassign */

import Axios from 'axios';

import { API_URL } from '@/config';
import { useNotificationStore } from '@/stores/notifications';
import storage from '@/utils/storage';

function authRequestInterceptor(config) {
  const token = storage.getToken('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  },
);

export default axios;
