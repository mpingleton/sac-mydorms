const roomInspectionService = require('@/services/roominspection.service');

const getRoomInspections = async (req, res) => {
  const roomInspections = await roomInspectionService.getRoomInspections();
  res.send(200, roomInspections);
};

module.exports = {
  getRoomInspections,
};
