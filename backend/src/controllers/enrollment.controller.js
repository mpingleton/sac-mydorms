const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const enrollmentService = require('@/services/enrollment.service');
const personnelService = require('@/services/personnel.service');

const getEnrollments = async (req, res) => {
  const enrollments = await enrollmentService.getEnrollments();
  res.send(200, enrollments);
};

const getMyEnrollment = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  if (enrollment === null) {
    res.send(200, { id: -1 });
  } else {
    enrollment.userObject = user;
    enrollment.personnelObject = await personnelService.getPersonnelById(enrollment.personnel_id);
    res.send(200, enrollment);
  }
};

const createEnrollment = async (req, res) => {
  await enrollmentService.createEnrollment(
    req.body.userId,
    req.body.personnelId,
  );

  res.send(200);
};

module.exports = {
  getEnrollments,
  getMyEnrollment,
  createEnrollment,
};
