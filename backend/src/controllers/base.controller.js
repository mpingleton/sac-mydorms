const baseService = require('@/services/base.service');

const getBases = async (req, res) => {
  const bases = await baseService.getBases();
  res.send(200, bases);
};

const getBuildingsByBase = async (req, res) => {
  const buildings = await baseService.getBuildingsByBase(req.params.base_id);
  res.send(200, buildings);
};

const getBaseById = async (req, res) => {
  const bases = await baseService.getBaseById(req.params.id);
  res.send(200, bases);
};

const createBase = async (req, res) => {
  await baseService.createBase(req.body.name);
  res.send(201);
};

module.exports = {
  getBases,
  getBuildingsByBase,
  getBaseById,
  createBase,
};
