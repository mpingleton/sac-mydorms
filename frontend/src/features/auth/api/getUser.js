import { axios } from '@/lib/axios';

export const getUser = () => axios.get('/auth/me');

export default getUser;
