import { axios } from '@/lib/axios';

const getPostsCreatedBy = (personnelId) => axios.get(`/commonarea/postedby/${personnelId}`);

export default getPostsCreatedBy;
