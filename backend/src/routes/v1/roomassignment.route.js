const express = require('express');

const auth = require('@/middlewares/auth');
const roomAssignmentController = require('@/controllers/roomassignment.controller');

const router = express.Router();

router.get('/', auth(), roomAssignmentController.getRoomAssignments);
router.get('/personnel/:personnel_id', auth(), roomAssignmentController.getRoomAssignmentsForPersonnel);
router.get('/room/:room_id', auth(), roomAssignmentController.getPersonnelAssignedToRoom);
router.put('/:personnel_id/:room_id', auth(), roomAssignmentController.createRoomAssignment);

module.exports = router;
