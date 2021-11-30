import { axios } from '@/lib/axios';

const getPersonnelAssignedToBase = (baseId) => axios.get(`/personnel/in/base/${baseId}`);

export default getPersonnelAssignedToBase;
