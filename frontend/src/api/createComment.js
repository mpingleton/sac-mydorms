import { axios } from '@/lib/axios';

const createComment = (commentData) => axios.put('/commonarea/comments', commentData);

export default createComment;
