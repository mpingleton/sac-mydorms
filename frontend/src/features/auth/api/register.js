import { axios } from '@/lib/axios';

export const register = (data) => axios.post('/auth/register', data);

export default register;
