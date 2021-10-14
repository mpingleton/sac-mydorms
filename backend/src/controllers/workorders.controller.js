const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
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
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  await workOrdersService.createWorkOrder(req.body.subject,
    req.body.room_id, user.id, req.body.remarks);
  res.send(200);
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
};
