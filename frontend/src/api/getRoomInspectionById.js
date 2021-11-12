import { axios } from '@/lib/axios';

const getRoomInspectionById = (id) => axios.get(`/roominspection/${id}`);

export default getRoomInspectionById;
