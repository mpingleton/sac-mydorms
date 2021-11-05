const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const commonAreaController = require('@/controllers/commonarea.controller');
const commonAreaValidation = require('@/validations/commonarea.validation');

const router = express.Router();

router.get(
  '/',
  auth(),
  commonAreaController.getPosts,
);

router.get(
  '/id/:id',
  auth(),
  validate(commonAreaValidation.getPostById),
  commonAreaController.getPostById,
);

router.put(
  '/',
  auth(),
  validate(commonAreaValidation.createPost),
  commonAreaController.createPost,
);

router.get(
  '/comments',
  auth(),
  commonAreaController.getComments,
);

router.get(
  '/comments/id/:id',
  auth(),
  validate(commonAreaValidation.getCommentById),
  commonAreaController.getCommentById,
);

router.put(
  '/comments',
  auth(),
  validate(commonAreaValidation.createComment),
  commonAreaController.createComment,
);

module.exports = router;
