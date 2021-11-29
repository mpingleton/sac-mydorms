import { axios } from '@/lib/axios';

const getWorkOrdersInRoom = (roomId) => axios.get(`/workorders/in/room/${roomId}`);

export default getWorkOrdersInRoom;
