const express = require('express');

const roomInspectionController = require('@/controllers/roominspection.controller');

const router = express.Router();

router.get('/', roomInspectionController.getRoomInspections);

module.exports = router;
