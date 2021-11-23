import { axios } from '@/lib/axios';

const getRoomAssignmentsByRoom = (roomId) => axios.get(`/roomassignment/room/${roomId}`);

export default getRoomAssignmentsByRoom;
