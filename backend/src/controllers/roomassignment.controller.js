const roomAssignmentService = require('@/services/roomassignment.service');

const getRoomAssignments = async (req, res) => {
  const roomAssignments = await roomAssignmentService.getRoomAssignments();
  res.send(200, roomAssignments);
};

const getRoomAssignmentsForPersonnel = async (req, res) => {
  const roomAssignments = await roomAssignmentService.getRoomAssignmentsForPersonnel(
    parseInt(req.params.personnel_id, 10),
  );
  res.send(200, roomAssignments);
};

const getPersonnelAssignedToRoom = async (req, res) => {
  const roomAssignments = await roomAssignmentService.getPersonnelAssignedToRoom(
    parseInt(req.params.room_id, 10),
  );
  res.send(200, roomAssignments);
};

const createRoomAssignment = async (req, res) => {
  await roomAssignmentService.createRoomAssignment(
    parseInt(req.params.personnel_id, 10),
    parseInt(req.params.room_id, 10),
  );
  res.send(200);
};

module.exports = {
  getRoomAssignments,
  getRoomAssignmentsForPersonnel,
  getPersonnelAssignedToRoom,
  createRoomAssignment,
};
