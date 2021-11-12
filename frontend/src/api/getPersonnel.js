import { axios } from '@/lib/axios';

const getPersonnel = () => axios.get('/personnel');

export default getPersonnel;
