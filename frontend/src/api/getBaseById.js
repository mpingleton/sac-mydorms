import { axios } from '@/lib/axios';

const getBaseById = (baseId) => axios.get(`/base/${baseId}`);

export default getBaseById;
