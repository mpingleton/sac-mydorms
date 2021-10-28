const Joi = require('joi');

const getAllCommentsForWorkOrder = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
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
    comment: Joi.string().required(),
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
  getWorkOrderCommentById,
  createWorkOrderComment,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrderStatus,
};
