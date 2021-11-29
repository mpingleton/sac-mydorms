const baseService = require('@/services/base.service');

const getBases = async (req, res) => {
  const bases = await baseService.getBases();
  res.send(200, bases);
};

const getBaseById = async (req, res) => {
  const bases = await baseService.getBaseById(req.params.base_id);
  res.send(200, bases);
};

module.exports = {
  getBases,
  getBaseById,
};
