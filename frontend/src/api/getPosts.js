import { axios } from '@/lib/axios';

const getPosts = () => axios.get('/commonarea');

export default getPosts;
