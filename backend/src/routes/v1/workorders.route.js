const express = require('express');

const workOrdersController = require('@/controllers/workorders.controller');

const router = express.Router();

router.get('/', workOrdersController.getWorkOrders);
router.get('/comments', workOrdersController.getAllWorkOrderComments);
router.get('/:id', workOrdersController.getWorkOrderById);
router.put('/', workOrdersController.createWorkOrder);

module.exports = router;
