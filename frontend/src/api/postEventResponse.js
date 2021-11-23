import { axios } from '@/lib/axios';

const postEventResponse = (eventId, responseCode) => axios.post('/event/response', {
  eventId,
  responseCode,
});

export default postEventResponse;
