const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRooms = async () => {
  const rooms = await prisma.rooms.findMany({});
  const buildingsPromises = rooms.map((room) => prisma.buildings.findUnique({
    where: {
      id: room.building_id,
    },
  }));

  const buildings = await Promise.all(buildingsPromises);
  for (let i = 0; i < buildings.length; i += 1) {
    if (buildings[i].building_name !== undefined) {
      rooms[i].building_name = buildings[i].building_name;
    }
  }

  return rooms;
};

module.exports = {
  getRooms,
};
