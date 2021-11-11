import { axios } from '@/lib/axios';

const getCommentsByPost = (postId) => axios.get(`/commonarea/comments/post/${postId}`);

export default getCommentsByPost;
