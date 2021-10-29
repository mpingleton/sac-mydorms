const roomAssignmentService = require('@/services/roomassignment.service');
const roomService = require('@/services/room.service');
const personnelService = require('@/services/personnel.service');

const getRoomAssignments = async (req, res) => {
  const roomAssignments = await roomAssignmentService.getRoomAssignments();

  const roomAssignmentPromises = [];
  for (let i = 0; i < roomAssignments.length; i += 1) {
    roomAssignmentPromises.push(personnelService.getPersonnelById(roomAssignments[i].personnel_id)
      .then((personnelObject) => {
        roomAssignments[i].personnelObject = personnelObject;
      }));
    roomAssignmentPromises.push(roomService.getRoomById(roomAssignments[i].room_id)
      .then((roomObject) => {
        roomAssignments[i].roomObject = roomObject;
      }));
  }
  await Promise.all(roomAssignmentPromises);

  res.send(200, roomAssignments);
};

const getRoomAssignmentsForPersonnel = async (req, res) => {
  const roomAssignments = await roomAssignmentService.getRoomAssignmentsForPersonnel(
    parseInt(req.params.personnel_id, 10),
  );

  const roomAssignmentPromises = [];
  for (let i = 0; i < roomAssignments.length; i += 1) {
    roomAssignmentPromises.push(personnelService.getPersonnelById(roomAssignments[i].personnel_id)
      .then((personnelObject) => {
        roomAssignments[i].personnelObject = personnelObject;
      }));
    roomAssignmentPromises.push(roomService.getRoomById(roomAssignments[i].room_id)
      .then((roomObject) => {
        roomAssignments[i].roomObject = roomObject;
      }));
  }
  await Promise.all(roomAssignmentPromises);

  res.send(200, roomAssignments);
};

const getPersonnelAssignedToRoom = async (req, res) => {
  const roomAssignments = await roomAssignmentService.getPersonnelAssignedToRoom(
    parseInt(req.params.room_id, 10),
  );

  const roomAssignmentPromises = [];
  for (let i = 0; i < roomAssignments.length; i += 1) {
    roomAssignmentPromises.push(personnelService.getPersonnelById(roomAssignments[i].personnel_id)
      .then((personnelObject) => {
        roomAssignments[i].personnelObject = personnelObject;
      }));
    roomAssignmentPromises.push(roomService.getRoomById(roomAssignments[i].room_id)
      .then((roomObject) => {
        roomAssignments[i].roomObject = roomObject;
      }));
  }
  await Promise.all(roomAssignmentPromises);

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
