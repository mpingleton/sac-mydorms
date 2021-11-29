import { axios } from '@/lib/axios';

const getRoomsByBuilding = (buildingId) => axios.get(`/room/in/building/${buildingId}`);

export default getRoomsByBuilding;
