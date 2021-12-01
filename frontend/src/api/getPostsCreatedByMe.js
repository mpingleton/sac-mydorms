import { axios } from '@/lib/axios';

const getPostsCreatedByMe = () => axios.get('/commonarea/createdbyme');

export default getPostsCreatedByMe;
