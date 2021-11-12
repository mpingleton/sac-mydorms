import { axios } from '@/lib/axios';

const createEvent = (
  scheduled,
  location,
  subject,
  description,
) => axios.put(
  '/event',
  {
    scheduled,
    location,
    subject,
    description,
  },
);

export default createEvent;
