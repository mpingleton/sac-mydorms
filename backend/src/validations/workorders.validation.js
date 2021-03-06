const Joi = require('joi');

const getAllCommentsForWorkOrder = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getWorkOrdersInRoom = {
  params: Joi.object().keys({
    room_id: Joi.number().integer().required(),
  }),
};

const getWorkOrdersInBuilding = {
  params: Joi.object().keys({
    building_id: Joi.number().integer().required(),
  }),
};

const getWorkOrderCommentById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createWorkOrderComment = {
  body: Joi.object().keys({
    workOrderId: Joi.number().integer().required(),
    comment: Joi.string().max(250).required(),
  }),
};

const getWorkOrderById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createWorkOrder = {
  body: Joi.object().keys({
    subject: Joi.string().required(),
    room_id: Joi.number().integer().required(),
    remarks: Joi.string().required(),
  }),
};

const updateWorkOrderStatus = {
  body: Joi.object().keys({
    id: Joi.number().integer().required(),
    status: Joi.number().integer().required(),
  }),
};

module.exports = {
  getAllCommentsForWorkOrder,
  getWorkOrdersInRoom,
  getWorkOrdersInBuilding,
  getWorkOrderCommentById,
  createWorkOrderComment,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrderStatus,
};
