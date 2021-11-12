import { axios } from '@/lib/axios';

const getMessages = (recipientId, subject, body) => axios.put('/message/send', {
  recipient_id: recipientId,
  subject,
  body,
});

export default getMessages;
