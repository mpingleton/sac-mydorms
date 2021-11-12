import { axios } from '@/lib/axios';

const getEvents = () => axios.get('/event');

export default getEvents;
