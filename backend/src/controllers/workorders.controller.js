const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const workOrdersService = require('@/services/workorders.service');
const roomService = require('@/services/room.service');

const getWorkOrders = async (req, res) => {
  const workOrders = await workOrdersService.getWorkOrders();
  const promises = [];
  for (let i = 0; i < workOrders.length; i += 1) {
    promises.push(roomService.getRoomById(workOrders[i].room_id)
      .then((roomObject) => {
        workOrders[i].roomObject = roomObject;
      }));
  }
  await Promise.all(promises);
  res.send(200, workOrders);
};

const getWorkOrderById = async (req, res) => {
  const workOrder = await workOrdersService.getWorkOrderById(parseInt(req.params.id, 10));
  workOrder.roomObject = await roomService.getRoomById(workOrder.room_id);
  res.send(200, workOrder);
};

const createWorkOrder = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  await workOrdersService.createWorkOrder(req.body.subject,
    req.body.room_id,
    user.id,
    req.body.remarks,
    new Date().toISOString(),
    0,
    new Date().toISOString());

  res.send(200);
};

const getAllWorkOrderComments = async (req, res) => {
  const comments = await workOrdersService.getAllWorkOrderComments();
  res.send(200, comments);
};

const getWorkOrderCommentById = async (req, res) => {
  const comment = await workOrdersService.getWorkOrderCommentById(parseInt(req.params.id, 10));
  res.send(200, comment);
};

const createWorkOrderComment = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  await workOrdersService.createWorkOrderComment(
    req.body.workOrderId,
    user.id,
    new Date().toISOString(),
    req.body.comment,
  );
  res.send(200);
};

const getAllCommentsForWorkOrder = async (req, res) => {
  const comments = await workOrdersService.getAllCommentsForWorkOrder(parseInt(req.params.id, 10));
  res.send(200, comments);
};

const updateWorkOrderStatus = async (req, res) => {
  await workOrdersService.updateWorkOrderStatus(req.body.id, req.body.status);
  res.send(200);
};

module.exports = {
  getWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  getAllWorkOrderComments,
  getWorkOrderCommentById,
  createWorkOrderComment,
  getAllCommentsForWorkOrder,
  updateWorkOrderStatus,
};
