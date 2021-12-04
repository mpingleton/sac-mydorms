import { axios } from '@/lib/axios';

const getUpcomingEvents = () => axios.get('/event/upcoming');

export default getUpcomingEvents;
