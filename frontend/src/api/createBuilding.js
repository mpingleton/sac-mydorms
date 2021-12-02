import { axios } from '@/lib/axios';

const createBuilding = (baseId, buildingName, buildingNumber, address) => axios.put('/base/buildings', {
  base_id: baseId,
  building_name: buildingName,
  building_number: buildingNumber,
  address,
});

export default createBuilding;
