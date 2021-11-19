import { axios } from '@/lib/axios';

const getPendingEnrollmentForPerson = (personnelId) => axios.get(
  `/enrollment/pending/${personnelId}`,
);

export default getPendingEnrollmentForPerson;
