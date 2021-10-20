const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const roomInspectionService = require('@/services/roominspection.service');

const getRoomInspections = async (req, res) => {
  const roomInspections = await roomInspectionService.getRoomInspections();
  res.send(200, roomInspections);
};

const getRoomInspectionById = async (req, res) => {
  const roomInspection = await roomInspectionService.getRoomInspectionById(
    parseInt(req.params.id, 10),
  );
  res.send(200, roomInspection);
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
  getRoomInspectionById,
  createRoomInspection,
};
