const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRooms = async () => {
  const rooms = await prisma.rooms.findMany({});
  return rooms;
};

const getRoomById = async (roomId) => {
  const room = await prisma.rooms.findUnique({
    where: {
      id: roomId,
    },
  });

  return room;
};

const getBuildingById = async (buildingId) => {
  const building = await prisma.buildings.findUnique({
    where: {
      id: buildingId,
    },
  });

  return building;
};

module.exports = {
  getRooms,
  getRoomById,
  getBuildingById,
};
