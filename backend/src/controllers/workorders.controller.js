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

  const workOrderData = {
    subject: req.body.subject,
    room_id: req.body.room_id,
    status: 0,
    created_by: user.id,
    creator_remarks: req.body.remarks,
    created_timestamp: '2021-09-20T00:00:00.000Z',
    status_timestamp: '2021-09-20T00:00:00.000Z',
  };

  await workOrdersService.createWorkOrder(workOrderData);
  res.send(200);
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
};
