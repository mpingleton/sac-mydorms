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

const getRoomInspectionsForResident = async (personnelId) => {
  const roomInspections = await prisma.roomInspections.findMany({
    where: {
      resident_id: personnelId,
    },
  });
  return roomInspections;
};

const getRoomInspectionsForRoom = async (roomId) => {
  const roomInspections = await prisma.roomInspections.findMany({
    where: {
      room_id: roomId,
    },
  });
  return roomInspections;
};

const getRoomInspectionsCreatedBy = async (personnelId) => {
  const roomInspections = await prisma.roomInspections.findMany({
    where: {
      dorm_manager_id: personnelId,
    },
  });
  return roomInspections;
};

const createRoomInspection = async (
  timestamp,
  roomId,
  residentId,
  dormManagerId,
  inspectorName,
  inspectorRemarks,
) => {
  const data = {
    timestamp,
    room_id: roomId,
    resident_id: residentId,
    dorm_manager_id: dormManagerId,
    inspector_name: inspectorName,
    inspector_remarks: inspectorRemarks,
  };

  await prisma.roomInspections.create({ data });
};

module.exports = {
  getRoomInspections,
  getRoomInspectionsForResident,
  getRoomInspectionsForRoom,
  getRoomInspectionsCreatedBy,
  getRoomInspectionById,
  createRoomInspection,
};
