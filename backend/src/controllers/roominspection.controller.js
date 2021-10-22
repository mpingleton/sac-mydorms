const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const roomInspectionService = require('@/services/roominspection.service');
const roomService = require('@/services/room.service');
const personnelService = require('@/services/personnel.service');

const getRoomInspections = async (req, res) => {
  const roomInspections = await roomInspectionService.getRoomInspections();
  const promises = [];
  for (let i = 0; i < roomInspections.length; i += 1) {
    promises.push(roomService.getRoomById(roomInspections[i].room_id)
      .then((roomObject) => {
        roomInspections[i].roomObject = roomObject;
      }));
    promises.push(personnelService.getPersonnelById(roomInspections[i].resident_id)
      .then((personnelObject) => {
        roomInspections[i].residentPersonnelObject = personnelObject;
      }));
    promises.push(personnelService.getPersonnelById(roomInspections[i].dorm_manager_id)
      .then((personnelObject) => {
        roomInspections[i].dormManagerPersonnelObject = personnelObject;
      }));
  }
  await Promise.all(promises);
  res.send(200, roomInspections);
};

const getRoomInspectionById = async (req, res) => {
  const roomInspection = await roomInspectionService.getRoomInspectionById(
    parseInt(req.params.id, 10),
  );
  roomInspection.roomObject = await roomService.getRoomById(roomInspection.room_id);
  roomInspection.residentPersonnelObject = await personnelService.getPersonnelById(
    roomInspection.resident_id,
  );
  roomInspection.dormManagerPersonnelObject = await personnelService.getPersonnelById(
    roomInspection.dorm_manager_id,
  );
  res.send(200, roomInspection);
};

const createRoomInspection = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  await roomInspectionService.createRoomInspection(
    req.body.timestamp,
    req.body.room_id,
    1,
    user.id,
    req.body.inspector_name,
    req.body.inspector_remarks,
  );

  res.send(200);
};

module.exports = {
  getRoomInspections,
  getRoomInspectionById,
  createRoomInspection,
};
