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
  '/:id',
  auth(),
  validate(baseValidation.getBaseById),
  baseController.getBaseById,
);

module.exports = router;
