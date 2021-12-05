import { axios } from '@/lib/axios';

const getRoomAssignmentsForPersonnel = (personnelId) => axios.get(`/roomassignment/personnel/${personnelId}`);

export default getRoomAssignmentsForPersonnel;
