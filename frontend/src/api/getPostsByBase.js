import { axios } from '@/lib/axios';

const getPostsByBase = (baseId) => axios.get(`/commonarea/base/${baseId}`);

export default getPostsByBase;
