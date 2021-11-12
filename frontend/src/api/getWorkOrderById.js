import { axios } from '@/lib/axios';

const getWorkOrderById = (id) => axios.get(`/workorders/${id}`);

export default getWorkOrderById;
