import { axios } from '@/lib/axios';

const getWorkOrdersInBuilding = (buildingId) => axios.get(`/workorders/in/building/${buildingId}`);

export default getWorkOrdersInBuilding;
