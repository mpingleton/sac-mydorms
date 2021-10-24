const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const workOrdersController = require('@/controllers/workorders.controller');
const workOrdersValidation = require('@/validations/workorders.validation');

const router = express.Router();

router.get(
  '/',
  auth(),
  workOrdersController.getWorkOrders,
);

router.get(
  '/comments',
  auth(),
  workOrdersController.getAllWorkOrderComments,
);

router.get(
  '/comments/forworkorder/:id',
  auth(),
  validate(workOrdersValidation.getAllCommentsForWorkOrder),
  workOrdersController.getAllCommentsForWorkOrder,
);

router.get(
  '/comments/:id',
  auth(),
  validate(workOrdersValidation.getWorkOrderCommentById),
  workOrdersController.getWorkOrderCommentById,
);

router.put(
  '/comments',
  auth(),
  validate(workOrdersValidation.createWorkOrderComment),
  workOrdersController.createWorkOrderComment,
);

router.get(
  '/:id',
  auth(),
  validate(workOrdersValidation.getWorkOrderById),
  workOrdersController.getWorkOrderById,
);

router.put(
  '/',
  auth(),
  validate(workOrdersValidation.createWorkOrder),
  workOrdersController.createWorkOrder,
);

router.post(
  '/status',
  auth(),
  validate(workOrdersValidation.updateWorkOrderStatus),
  workOrdersController.updateWorkOrderStatus,
);

module.exports = router;
