const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const roomInspectionService = require('@/services/roominspection.service');

const getRoomInspections = async (req, res) => {
  const roomInspections = await roomInspectionService.getRoomInspections();
  res.send(200, roomInspections);
};

const createRoomInspection = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  await roomInspectionService.createRoomInspection(
    new Date().toISOString(),
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
  createRoomInspection,
};
