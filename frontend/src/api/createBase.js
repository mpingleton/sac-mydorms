import { axios } from '@/lib/axios';

const createBase = (baseName) => axios.put('/base', { name: baseName });

export default createBase;
