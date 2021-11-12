import { axios } from '@/lib/axios';

const createPost = (postData) => axios.put('/commonarea', postData);

export default createPost;
