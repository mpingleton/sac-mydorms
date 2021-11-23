import { axios } from '@/lib/axios';

const getResidentById = (id) => axios.get(`/personnel/${id}`);

export default getResidentById;
