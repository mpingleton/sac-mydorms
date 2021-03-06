const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const personnelService = require('@/services/personnel.service');
const enrollmentService = require('@/services/enrollment.service');

const getPersonnel = async (req, res) => {
  const personnel = await personnelService.getPersonnel();
  res.send(200, personnel);
};

const getPersonnelById = async (req, res) => {
  const person = await personnelService.getPersonnelById(parseInt(req.params.id, 10));
  res.send(200, person);
};

const getPersonnelAssignedToMyBase = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const enrolledPerson = await personnelService.getPersonnelById(enrollment.personnel_id);

  const personnel = await personnelService.getPersonnelByBase(enrolledPerson.base_id);
  res.send(200, personnel);
};

const getPersonnelAssignedToBase = async (req, res) => {
  const personnel = await personnelService.getPersonnelByBase(req.params.base_id);
  res.send(200, personnel);
};

const createPersonnel = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const enrolledPerson = await personnelService.getPersonnelById(enrollment.personnel_id);
  await personnelService.createPersonnel(
    enrolledPerson.base_id,
    req.body.rank,
    req.body.first_name,
    req.body.middle_name,
    req.body.last_name,
    req.body.phone,
    req.body.email,
    req.body.is_dorm_manager,
  );
  res.send(200);
};

module.exports = {
  getPersonnel,
  getPersonnelById,
  getPersonnelAssignedToBase,
  getPersonnelAssignedToMyBase,
  createPersonnel,
};
