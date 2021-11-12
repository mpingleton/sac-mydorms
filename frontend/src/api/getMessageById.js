import { axios } from '@/lib/axios';

const getMessageById = (id) => axios.get(`/message/id/${id}`);

export default getMessageById;
