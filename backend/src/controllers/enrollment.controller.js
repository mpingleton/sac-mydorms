/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */

const { ExtractJwt } = require('passport-jwt');
const omit = require('lodash/omit');
const { authService } = require('@/services');
const enrollmentService = require('@/services/enrollment.service');
const personnelService = require('@/services/personnel.service');
const userService = require('@/services/user.service');

const getEnrollments = async (req, res) => {
  const enrollments = await enrollmentService.getEnrollments();
  res.send(200, enrollments);
};

const getEnrollmentForPerson = async (req, res) => {
  const enrollment = await enrollmentService.getEnrollmentByPersonnelId(
    parseInt(req.params.personnelId, 10),
  );
  if (enrollment === null) {
    res.send(200, { id: -1 });
  } else {
    const user = await userService.getUserById(enrollment.user_id);
    enrollment.userObject = omit(user, ['password', 'iat']);
    enrollment.personnelObject = await personnelService.getPersonnelById(enrollment.personnel_id);
    res.send(200, enrollment);
  }
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

const enrollCurrentUserUsingCode = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  const pendingEnrollment = await enrollmentService.getPendingEnrollmentByCode(
    req.body.registrationCode,
  );
  if (pendingEnrollment === null) {
    res.send(200, { id: -1 });
  } else {
    await enrollmentService.createEnrollment(user.id, pendingEnrollment.personnel_id);
    await enrollmentService.deletePendingEnrollmentsForPersonnel(pendingEnrollment.personnel_id);
    res.send(200);
  }
};

const createPendingEnrollment = async (req, res) => {
  while (1) {
    // Create a code randomly.
    const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let regCode = '';
    for (let i = 0; i < 10; i += 1) {
      const charIndex = Math.floor(Math.random() * characterSet.length);
      regCode += characterSet[charIndex];
    }

    // Check for an existing one.
    const existingEnrollment = await enrollmentService.getPendingEnrollmentByCode(regCode);

    // Create it in the database.
    if (existingEnrollment === null) {
      await enrollmentService.createPendingEnrollment(req.body.personnelId, regCode);
      res.send(201, {
        personnelId: req.body.personnelId,
        registrationCode: regCode,
      });
      break;
    }
  }
};

const getPendingEnrollmentForPerson = async (req, res) => {
  const pendingEnrollment = await enrollmentService.getPendingEnrollmentForPerson(
    req.params.personnelId,
  );

  if (pendingEnrollment === null) {
    res.send(200, { id: -1 });
  } else {
    res.send(200, {
      id: pendingEnrollment.id,
      personnelId: pendingEnrollment.personnel_id,
      registrationCode: pendingEnrollment.registration_code,
    });
  }
};

module.exports = {
  getEnrollments,
  getEnrollmentForPerson,
  getMyEnrollment,
  createEnrollment,
  enrollCurrentUserUsingCode,
  createPendingEnrollment,
  getPendingEnrollmentForPerson,
};
