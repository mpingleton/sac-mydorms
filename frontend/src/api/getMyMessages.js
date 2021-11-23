import { axios } from '@/lib/axios';

const getMessages = () => axios.get('/message/my');

export default getMessages;
