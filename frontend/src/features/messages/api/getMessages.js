import { axios } from '@/lib/axios';

const getMessages = () => axios.get('/message');

export default getMessages;
