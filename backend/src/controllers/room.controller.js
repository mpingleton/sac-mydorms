const roomService = require('@/services/room.service');

const getRooms = async (req, res) => {
  const rooms = await roomService.getRooms();
  res.send(200, rooms);
};

module.exports = {
  getRooms,
};
