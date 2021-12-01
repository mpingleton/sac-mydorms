import { axios } from '@/lib/axios';

const getRoomInspectionsForResident = (id) => axios.get(`/roominspection/resident/${id}`);

export default getRoomInspectionsForResident;
