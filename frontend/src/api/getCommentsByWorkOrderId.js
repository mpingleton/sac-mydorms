import { axios } from '@/lib/axios';

const getCommentsByWorkOrderId = (id) => axios.get(`/workorders/comments/forworkorder/${id}`);

export default getCommentsByWorkOrderId;
