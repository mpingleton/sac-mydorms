const baseService = require('@/services/base.service');

const getBases = async (req, res) => {
  const bases = await baseService.getBases();
  res.send(200, bases);
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
  getBaseById,
  createBase,
};
