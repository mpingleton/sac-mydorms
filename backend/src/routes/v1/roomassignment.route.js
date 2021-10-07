const express = require('express');

const roomAssignmentController = require('@/controllers/roomassignment.controller');

const router = express.Router();

router.get('/', roomAssignmentController.getRoomAssignments);

module.exports = router;
