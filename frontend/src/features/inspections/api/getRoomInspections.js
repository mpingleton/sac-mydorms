import { axios } from '@/lib/axios';

const getRoomInspections = () => axios.get('/roominspection');

export default getRoomInspections;
