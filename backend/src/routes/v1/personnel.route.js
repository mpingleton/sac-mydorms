const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const personnelController = require('@/controllers/personnel.controller');
const personnelValidation = require('@/validations/personnel.validation');

const router = express.Router();

router.get(
  '/',
  auth(),
  personnelController.getPersonnel,
);

router.get(
  '/:id',
  auth(),
  validate(personnelValidation.getPersonnelById),
  personnelController.getPersonnelById,
);

router.put(
  '/',
  auth(),
  validate(personnelValidation.putPersonnel),
  personnelController.createPersonnel,
);

module.exports = router;
