const catchAsync = require('../utils/catchAsync');
const {
  dataService,
} = require('../services');

const getPersonnel = catchAsync(async (req, res) => {
  const personnel = await dataService.getPersonnel();
  res.send(200, personnel);
});

module.exports = {
  getPersonnel,
};
