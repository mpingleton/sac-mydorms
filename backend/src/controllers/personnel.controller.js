const personnelService = require('@/services/personnel.service');

const getPersonnel = async (req, res) => {
  const personnel = await personnelService.getPersonnel();
  res.send(200, personnel);
};

const getPersonnelById = async (req, res) => {
  const person = await personnelService.getPersonnelById(Number(req.params.id));
  res.send(200, person);
};

module.exports = {
  getPersonnel,
  getPersonnelById,
};
