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

module.exports = {
  getWorkOrders,
  getWorkOrderById,
};
