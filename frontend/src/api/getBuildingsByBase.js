import { axios } from '@/lib/axios';

const getBuildingsByBase = (baseId) => axios.get(`/base/buildings/${baseId}`);

export default getBuildingsByBase;
