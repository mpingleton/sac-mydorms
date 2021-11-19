import { axios } from '@/lib/axios';

const createPendingEnrollment = (personnelId) => axios.put('/enrollment/pending', {
  personnelId,
});

export default createPendingEnrollment;
