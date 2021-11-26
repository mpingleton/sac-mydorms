import { axios } from '@/lib/axios';

const getPersonnelInMyBase = () => axios.get('/personnel/my');

export default getPersonnelInMyBase;
