import { axios } from '@/lib/axios';

const updateWorkOrderStatus = (workOrderId, newStatus) => axios.post('/workorders/status', { id: workOrderId, status: newStatus });

export default updateWorkOrderStatus;
