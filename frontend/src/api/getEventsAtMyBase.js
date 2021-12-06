import { axios } from '@/lib/axios';

const getEventsAtMyBase = () => axios.get('/event/mybase');

export default getEventsAtMyBase;
