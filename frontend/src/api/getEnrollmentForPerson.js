import { axios } from '@/lib/axios';

const getEnrollmentForPerson = (personnelId) => axios.get(
  `/enrollment/personnel/${personnelId}`,
);

export default getEnrollmentForPerson;
