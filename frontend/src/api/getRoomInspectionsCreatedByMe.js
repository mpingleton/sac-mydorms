import { axios } from '@/lib/axios';

const getRoomInspectionsCreatedByMe = () => axios.get('/roominspection/createdbyme');

export default getRoomInspectionsCreatedByMe;
