const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRoomInspections = async () => {
  const roomInspections = await prisma.roomInspections.findMany({});
  return roomInspections;
};

const getRoomInspectionById = async (id) => {
  const roomInspection = await prisma.roomInspections.findUnique({
    where: {
      id,
    },
  });
  return roomInspection;
};

const createRoomInspection = async (
  timestamp,
  roomId,
  personnelId,
  dormManagerId,
  inspectorName,
  inspectorRemarks,
) => {
  const data = {
    timestamp,
    room_id: roomId,
    personnel_id: personnelId,
    dorm_manager_id: dormManagerId,
    inspector_name: inspectorName,
    inspector_remarks: inspectorRemarks,
  };

  await prisma.roomInspections.create({ data });
};

module.exports = {
  getRoomInspections,
  getRoomInspectionById,
  createRoomInspection,
};
