import { axios } from '@/lib/axios';

const getEventsCreatedByMe = () => axios.get('/event/createdbyme');

export default getEventsCreatedByMe;
