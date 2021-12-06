import { axios } from '@/lib/axios';

const getPostsAtMyBase = () => axios.get('/commonarea/mybase');

export default getPostsAtMyBase;
