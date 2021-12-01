import { axios } from '@/lib/axios';

const getEventsByBase = (id) => axios.get(`/event/base/${id}`);

export default getEventsByBase;
