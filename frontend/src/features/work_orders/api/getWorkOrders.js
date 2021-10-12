import { axios } from '@/lib/axios';

const getWorkOrders = () => axios.get('/workorders');

export default getWorkOrders;
