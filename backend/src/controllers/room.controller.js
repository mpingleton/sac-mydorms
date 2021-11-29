const roomService = require('@/services/room.service');

const getRooms = async (req, res) => {
  const rooms = await roomService.getRooms();

  const promises = [];
  for (let i = 0; i < rooms.length; i += 1) {
    promises.push(roomService.getBuildingById(rooms[i].building_id)
      .then((buildingObject) => {
        rooms[i].buildingObject = buildingObject;
      }));
  }
  await Promise.all(promises);

  res.send(200, rooms);
};

const getRoomsInBuilding = async (req, res) => {
  const rooms = await roomService.getRoomsInBuilding(req.params.building_id);

  const promises = [];
  for (let i = 0; i < rooms.length; i += 1) {
    promises.push(roomService.getBuildingById(rooms[i].building_id)
      .then((buildingObject) => {
        rooms[i].buildingObject = buildingObject;
      }));
  }
  await Promise.all(promises);

  res.send(200, rooms);
};

const getRoomById = async (req, res) => {
  const room = await roomService.getRoomById(parseInt(req.params.id, 10));
  room.buildingObject = await roomService.getBuildingById(room.building_id);
  res.send(200, room);
};

module.exports = {
  getRooms,
  getRoomsInBuilding,
  getRoomById,
};
