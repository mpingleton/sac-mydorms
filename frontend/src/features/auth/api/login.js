import { axios } from '@/lib/axios';

export const loginWithUsernameAndPassword = (data) => axios.post('/auth/login', data);

export default loginWithUsernameAndPassword;
