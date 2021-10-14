const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getWorkOrders = async () => {
  const workOrders = await prisma.workOrders.findMany({});
  return workOrders;
};

const getWorkOrderById = async (workOrderId) => {
  const workOrder = await prisma.workOrders.findUnique({
    where: {
      id: workOrderId,
    },
  });
  return workOrder;
};

const createWorkOrder = async (subjectLine, roomId, createdBy, creatorRemarks) => {
  const data = {
    subject: subjectLine,
    room_id: roomId,
    created_by: createdBy,
    creator_remarks: creatorRemarks,
    created_timestamp: new Date().toISOString(),
    status: 0,
    status_timestamp: new Date().toISOString(),
  };

  await prisma.workOrders.create({ data });
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
};
