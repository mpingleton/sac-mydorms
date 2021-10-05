const personnelService = require('@/services/personnel.service');

const getPersonnel = async (req, res) => {
  const personnel = await personnelService.getPersonnel();
  res.send(200, personnel);
};

const getPersonnelById = async (req, res) => {
  const person = await personnelService.getPersonnelById(Number(req.params.id));
  res.send(200, person);
};

const createPersonnel = async (req, res) => {
  await personnelService.createPersonnel(req.body);
  res.send(200, 'Created personnel.');
};

module.exports = {
  getPersonnel,
  getPersonnelById,
  createPersonnel,
};
