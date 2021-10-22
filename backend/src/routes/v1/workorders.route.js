const express = require('express');

const auth = require('@/middlewares/auth');
const workOrdersController = require('@/controllers/workorders.controller');

const router = express.Router();

router.get('/', auth(), workOrdersController.getWorkOrders);
router.get('/comments', auth(), workOrdersController.getAllWorkOrderComments);
router.get('/comments/forworkorder/:id', auth(), workOrdersController.getAllCommentsForWorkOrder);
router.get('/comments/:id', auth(), workOrdersController.getWorkOrderCommentById);
router.put('/comments', auth(), workOrdersController.createWorkOrderComment);
router.get('/:id', auth(), workOrdersController.getWorkOrderById);
router.put('/', auth(), workOrdersController.createWorkOrder);
router.post('/status', auth(), workOrdersController.updateWorkOrderStatus);

module.exports = router;
