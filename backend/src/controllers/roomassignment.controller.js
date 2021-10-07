const roomAssignmentService = require('@/services/roomassignment.service');

const getRoomAssignments = async (req, res) => {
  const roomAssignments = await roomAssignmentService.getRoomAssignments();
  res.send(200, roomAssignments);
};

module.exports = {
  getRoomAssignments,
};
