const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const personnelController = require('@/controllers/personnel.controller');
const personnelValidation = require('@/validations/personnel.validation');
const dormManagerGatekeeper = require('@/gatekeepers/dormmanager.gatekeeper');

const router = express.Router();

router.get(
  '/',
  auth(),
  personnelController.getPersonnel,
);

router.get(
  '/my',
  auth(),
  personnelController.getPersonnelAssignedToMyBase,
);

router.get(
  '/in/base/:base_id',
  auth(),
  validate(personnelValidation.getPersonnelAssignedToBase),
  personnelController.getPersonnelAssignedToBase,
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
  dormManagerGatekeeper.isDormManager,
  validate(personnelValidation.putPersonnel),
  personnelController.createPersonnel,
);

module.exports = router;
