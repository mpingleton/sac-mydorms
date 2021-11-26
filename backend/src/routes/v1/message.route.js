const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const messageController = require('@/controllers/message.controller');
const messageValidation = require('@/validations/message.validation');

const router = express.Router();

router.get(
  '/my',
  auth(),
  messageController.getMyMessages,
);

router.get(
  '/id/:id',
  auth(),
  validate(messageValidation.getMessageById),
  messageController.getMessageById,
);

router.put(
  '/send',
  auth(),
  validate(messageValidation.sendMessage),
  messageController.sendMessage,
);

module.exports = router;
