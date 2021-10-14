import { axios } from '@/lib/axios';

const createWorkOrderComment = (workOrderCommentData) => axios.put('/workorders/comments', workOrderCommentData);

export default createWorkOrderComment;
