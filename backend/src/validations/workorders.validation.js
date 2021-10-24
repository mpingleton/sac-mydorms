const Joi = require('joi');

const getAllCommentsForWorkOrder = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const getWorkOrderCommentById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const createWorkOrderComment = {
  body: Joi.object().keys({
    workOrderId: Joi.number().integer(),
    comment: Joi.string(),
  }),
};

const getWorkOrderById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const createWorkOrder = {
  body: Joi.object().keys({
    subject: Joi.string(),
    room_id: Joi.number().integer(),
    remarks: Joi.string(),
  }),
};

const updateWorkOrderStatus = {
  body: Joi.object().keys({
    id: Joi.number().integer(),
    status: Joi.number().integer(),
  }),
};

module.exports = {
  getAllCommentsForWorkOrder,
  getWorkOrderCommentById,
  createWorkOrderComment,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrderStatus,
};
