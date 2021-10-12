const workOrdersService = require('@/services/workorders.service');

const getWorkOrders = async (req, res) => {
  const workOrders = await workOrdersService.getWorkOrders();
  res.send(200, workOrders);
};

const getWorkOrderById = async (req, res) => {
  const workOrder = await workOrdersService.getWorkOrderById(parseInt(req.params.id, 10));
  res.send(200, workOrder);
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
};
