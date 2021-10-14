import { axios } from '@/lib/axios';

const createWorkOrder = (workOrderData) => axios.put('/workorders', workOrderData);

export default createWorkOrder;
