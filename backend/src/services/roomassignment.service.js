const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRoomAssignments = async () => {
  const roomassignments = await prisma.roomAssignments.findMany({});
  return roomassignments;
};

module.exports = {
  getRoomAssignments,
};
