const express = require('express');

const workOrdersController = require('@/controllers/workorders.controller');

const router = express.Router();

router.get('/', workOrdersController.getWorkOrders);
router.get('/comments', workOrdersController.getAllWorkOrderComments);
router.get('/comments/forworkorder/:id', workOrdersController.getAllCommentsForWorkOrder);
router.get('/comments/:id', workOrdersController.getWorkOrderCommentById);
router.put('/comments', workOrdersController.createWorkOrderComment);
router.get('/:id', workOrdersController.getWorkOrderById);
router.put('/', workOrdersController.createWorkOrder);

module.exports = router;
