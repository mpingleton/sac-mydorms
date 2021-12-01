import { axios } from '@/lib/axios';

const getRoomInspectionsForRoom = (id) => axios.get(`/roominspection/room/${id}`);

export default getRoomInspectionsForRoom;
