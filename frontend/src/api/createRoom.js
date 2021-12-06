import { axios } from '@/lib/axios';

const createBase = (buildingId, roomNumber, status) => axios.put('/room', {
  building_id: buildingId,
  room_number: roomNumber,
  status,
});

export default createBase;
