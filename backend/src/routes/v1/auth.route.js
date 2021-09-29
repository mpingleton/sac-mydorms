const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const authValidation = require('@/validations/auth.validation');
const authController = require('@/controllers/auth.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.get('/me', auth(), authController.me);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/logout', auth(), validate(authValidation.logout), authController.logout);

module.exports = router;
