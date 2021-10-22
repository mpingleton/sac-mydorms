const express = require('express');

const auth = require('@/middlewares/auth');
const roomInspectionController = require('@/controllers/roominspection.controller');

const router = express.Router();

router.get('/', auth(), roomInspectionController.getRoomInspections);
router.get('/:id', auth(), roomInspectionController.getRoomInspectionById);
router.put('/', auth(), roomInspectionController.createRoomInspection);

module.exports = router;
