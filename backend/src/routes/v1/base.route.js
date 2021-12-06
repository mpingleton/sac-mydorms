const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const baseController = require('@/controllers/base.controller');
const baseValidation = require('@/validations/base.validation');

const router = express.Router();

router.get(
  '/',
  auth(),
  baseController.getBases,
);

router.get(
  '/buildings/:base_id',
  auth(),
  validate(baseValidation.getBuildingsByBase),
  baseController.getBuildingsByBase,
);

router.get(
  '/:id',
  auth(),
  validate(baseValidation.getBaseById),
  baseController.getBaseById,
);

router.put(
  '/',
  auth(),
  validate(baseValidation.createBase),
  baseController.createBase,
);

router.put(
  '/buildings',
  auth(),
  validate(baseValidation.createBuilding),
  baseController.createBuilding,
);

module.exports = router;
