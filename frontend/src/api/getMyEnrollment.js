import { axios } from '@/lib/axios';

const getMyEnrollment = () => axios.get('/enrollment/my');

export default getMyEnrollment;
