import { axios } from '@/lib/axios';

const getRooms = () => axios.get('/room');

export default getRooms;
