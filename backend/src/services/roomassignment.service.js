const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRoomAssignments = async () => {
  const roomassignments = await prisma.roomAssignments.findMany({});
  return roomassignments;
};

const createRoomAssignment = async (personnelId, roomId) => {
  const data = {
    personnel_id: personnelId,
    room_id: roomId,
  };
  await prisma.roomAssignments.create({ data });
};

module.exports = {
  getRoomAssignments,
  createRoomAssignment,
};
