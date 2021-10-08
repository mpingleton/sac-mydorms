import { axios } from '@/lib/axios';

const createRoomAssignment = (personnelId, roomId) => axios.put(`/roomassignment/${personnelId}/${roomId}`);

export default createRoomAssignment;
