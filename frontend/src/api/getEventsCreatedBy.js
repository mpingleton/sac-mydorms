import { axios } from '@/lib/axios';

const getEventsCreatedBy = (id) => axios.get(`/event/createdby/${id}`);

export default getEventsCreatedBy;
