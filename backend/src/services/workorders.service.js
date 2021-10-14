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

const createWorkOrder = async (subjectLine,
  roomId,
  createdBy,
  creatorRemarks,
  createdTimestamp,
  status,
  statusTimestamp) => {
  const data = {
    subject: subjectLine,
    room_id: roomId,
    created_by: createdBy,
    creator_remarks: creatorRemarks,
    created_timestamp: createdTimestamp,
    status: 0,
    status_timestamp: statusTimestamp,
  };

  await prisma.workOrders.create({ data });
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
};
