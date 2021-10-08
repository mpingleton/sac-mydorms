const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRoomAssignments = async () => {
  const roomassignments = await prisma.roomAssignments.findMany({});
  return roomassignments;
};

const getRoomAssignmentsForPersonnel = async (personnelId) => {
  const roomassignments = await prisma.roomAssignments.findMany({
    where: {
      personnel_id: personnelId,
    },
  });
  return roomassignments;
};

const getPersonnelAssignedToRoom = async (roomId) => {
  const roomassignments = await prisma.roomAssignments.findMany({
    where: {
      room_id: roomId,
    },
  });
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
  getRoomAssignmentsForPersonnel,
  getPersonnelAssignedToRoom,
  createRoomAssignment,
};
