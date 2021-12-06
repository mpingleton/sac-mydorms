import { axios } from '@/lib/axios';

const getMyWorkOrders = () => axios.get('/workorders/my');

export default getMyWorkOrders;
