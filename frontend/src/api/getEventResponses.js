import { axios } from '@/lib/axios';

const getEventResponses = (eventId) => axios.get(`/event/response/count/${eventId}`);

export default getEventResponses;
