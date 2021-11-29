import { axios } from '@/lib/axios';

const getBases = () => axios.get('/base');

export default getBases;
