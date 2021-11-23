import { axios } from '@/lib/axios';

const getPersonnelById = (id) => axios.get(`/personnel/${id}`);

export default getPersonnelById;
