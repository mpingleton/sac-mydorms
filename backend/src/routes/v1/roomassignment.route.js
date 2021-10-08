const express = require('express');

const roomAssignmentController = require('@/controllers/roomassignment.controller');

const router = express.Router();

router.get('/', roomAssignmentController.getRoomAssignments);
router.get('/personnel/:personnel_id', roomAssignmentController.getRoomAssignmentsForPersonnel);
router.get('/room/:room_id', roomAssignmentController.getPersonnelAssignedToRoom);
router.put('/:personnel_id/:room_id', roomAssignmentController.createRoomAssignment);

module.exports = router;
