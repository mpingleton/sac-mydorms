const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRooms = async () => {
  const rooms = await prisma.rooms.findMany({});
  return rooms;
};

const getRoomsInBuilding = async (buildingId) => {
  const rooms = await prisma.rooms.findMany({
    where: {
      building_id: buildingId,
    },
  });

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

const getBuildingsByBase = async (baseId) => {
  const buildings = await prisma.buildings.findMany({
    where: {
      base_id: baseId,
    },
  });

  return buildings;
};

module.exports = {
  getRooms,
  getRoomsInBuilding,
  getRoomById,
  getBuildingById,
  getBuildingsByBase,
};
