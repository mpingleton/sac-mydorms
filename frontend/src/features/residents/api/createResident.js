import { axios } from '@/lib/axios';

const createResident = (residentData) => axios.put('/personnel', residentData);

export default createResident;
