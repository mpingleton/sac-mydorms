import { axios } from '@/lib/axios';

const createRoomInspections = (roomInspectionData) => axios.put('/roominspection', roomInspectionData);

export default createRoomInspections;
