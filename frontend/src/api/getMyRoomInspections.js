import { axios } from '@/lib/axios';

const getMyRoomInspections = () => axios.get('/roominspection/my');

export default getMyRoomInspections;
