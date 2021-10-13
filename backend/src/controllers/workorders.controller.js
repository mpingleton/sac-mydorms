const workOrdersService = require('@/services/workorders.service');

const getWorkOrders = async (req, res) => {
  const workOrders = await workOrdersService.getWorkOrders();
  res.send(200, workOrders);
};

const getWorkOrderById = async (req, res) => {
  const workOrder = await workOrdersService.getWorkOrderById(parseInt(req.params.id, 10));
  res.send(200, workOrder);
};

const createWorkOrder = async (req, res) => {
  await workOrdersService.createWorkOrder(req.body);
  res.send(200);
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
};
