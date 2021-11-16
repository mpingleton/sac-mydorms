import { axios } from '@/lib/axios';

const getEventById = (id) => axios.get(`/event/id/${id}`);

export default getEventById;
