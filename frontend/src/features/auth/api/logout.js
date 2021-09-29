import { axios } from '@/lib/axios';
import storage from '@/utils/storage';

export const logout = () => {
  if (storage.getToken('refresh')) {
    axios.post('/auth/logout', { refreshToken: storage.getToken('refresh') });
  }
};

export default logout;
