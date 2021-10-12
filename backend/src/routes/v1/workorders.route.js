const express = require('express');

const workOrdersController = require('@/controllers/workorders.controller');

const router = express.Router();

router.get('/', workOrdersController.getWorkOrders);
router.get('/:id', workOrdersController.getWorkOrderById);

module.exports = router;
