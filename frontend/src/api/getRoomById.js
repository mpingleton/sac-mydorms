import { axios } from '@/lib/axios';

const getRoomById = (id) => axios.get(`/room/${id}`);

export default getRoomById;
