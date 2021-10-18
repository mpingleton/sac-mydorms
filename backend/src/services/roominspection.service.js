const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRoomInspections = async () => {
  const roomInspections = await prisma.roomInspections.findMany({});
  return roomInspections;
};

module.exports = {
  getRoomInspections,
};
