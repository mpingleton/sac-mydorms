import { axios } from '@/lib/axios';

const getResidents = () => axios.get('/personnel');

export default getResidents;
