const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const enrollmentController = require('@/controllers/enrollment.controller');
const enrollmentValidation = require('@/validations/enrollment.validation');

const router = express.Router();

router.get(
  '/',
  auth(),
  enrollmentController.getEnrollments,
);

router.get(
  '/my',
  auth(),
  enrollmentController.getMyEnrollment,
);

router.put(
  '/',
  auth(),
  validate(enrollmentValidation.createEnrollment),
  enrollmentController.createEnrollment,
);

router.post(
  '/enrollcurrentuser/using/code',
  auth(),
  validate(enrollmentValidation.enrollCurrentUserUsingCode),
  enrollmentController.enrollCurrentUserUsingCode,
);

router.put(
  '/pending',
  auth(),
  validate(enrollmentValidation.createPendingEnrollment),
  enrollmentController.createPendingEnrollment,
);

router.get(
  '/pending/:personnelId',
  auth(),
  validate(enrollmentValidation.getPendingEnrollmentForPerson),
  enrollmentController.getPendingEnrollmentForPerson,
);

module.exports = router;
