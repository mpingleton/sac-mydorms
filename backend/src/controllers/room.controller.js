const roomService = require('@/services/room.service');

const getRooms = async (req, res) => {
  const rooms = await roomService.getRooms();
  res.send(200, rooms);
};

const getRoomById = async (req, res) => {
  const room = await roomService.getRoomById(parseInt(req.params.id, 10));
  res.send(200, room);
};

module.exports = {
  getRooms,
  getRoomById,
};
