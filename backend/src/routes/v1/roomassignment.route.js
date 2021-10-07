const express = require('express');

const roomAssignmentController = require('@/controllers/roomassignment.controller');

const router = express.Router();

router.get('/', roomAssignmentController.getRoomAssignments);
router.put('/:personnel_id/:room_id', roomAssignmentController.createRoomAssignment);

module.exports = router;
