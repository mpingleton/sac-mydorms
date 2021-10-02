const personnelService = require('@/services/personnel.service');

const getPersonnel = async (req, res) => {
  const personnel = await personnelService.getPersonnel();
  res.send(200, personnel);
};

module.exports = {
  getPersonnel,
};
