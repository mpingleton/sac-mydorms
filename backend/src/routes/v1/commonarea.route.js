const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const commonAreaController = require('@/controllers/commonarea.controller');
const commonAreaValidation = require('@/validations/commonarea.validation');
const dormManagerGatekeeper = require('@/gatekeepers/dormmanager.gatekeeper');

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

router.get(
  '/base/:base_id',
  auth(),
  validate(commonAreaValidation.getPostsByBase),
  commonAreaController.getPostsByBase,
);

router.get(
  '/postedby/:personnel_id',
  auth(),
  validate(commonAreaValidation.getPostsCreatedBy),
  commonAreaController.getPostsCreatedBy,
);

router.get(
  '/createdbyme',
  auth(),
  commonAreaController.getPostsCreatedByMe,
);

router.put(
  '/',
  auth(),
  dormManagerGatekeeper.isDormManager,
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

router.get(
  '/comments/post/:id',
  auth(),
  validate(commonAreaValidation.getCommentsByPost),
  commonAreaController.getCommentsByPost,
);

router.put(
  '/comments',
  auth(),
  validate(commonAreaValidation.createComment),
  commonAreaController.createComment,
);

module.exports = router;
