import { axios } from '@/lib/axios';

const createPersonnel = (personnelData) => axios.put('/personnel', personnelData);

export default createPersonnel;
