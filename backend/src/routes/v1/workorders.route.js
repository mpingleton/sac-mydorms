const express = require('express');

const workOrdersController = require('@/controllers/workorders.controller');

const router = express.Router();

router.get('/', workOrdersController.getWorkOrders);

module.exports = router;
