const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const personnelService = require('@/services/personnel.service');
const enrollmentService = require('@/services/enrollment.service');

const isDormManager = async (req, res, next) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  if (enrollment === null) {
    res.send(500);
    return;
  }

  const personnel = await personnelService.getPersonnelById(enrollment.personnel_id);
  if (personnel.is_dorm_manager) {
    next();
  } else {
    res.send(401);
  }
};

module.exports = {
  isDormManager,
};
