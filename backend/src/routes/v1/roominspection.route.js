const express = require('express');

const roomInspectionController = require('@/controllers/roominspection.controller');

const router = express.Router();

router.get('/', roomInspectionController.getRoomInspections);
router.put('/', roomInspectionController.createRoomInspection);

module.exports = router;
