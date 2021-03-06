const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const commonAreaService = require('@/services/commonarea.service');
const personnelService = require('@/services/personnel.service');
const enrollmentService = require('@/services/enrollment.service');

const getPosts = async (req, res) => {
  const posts = await commonAreaService.getPosts();

  const postPromises = [];
  for (let i = 0; i < posts.length; i += 1) {
    postPromises.push(personnelService.getPersonnelById(posts[i].posted_by)
      .then((personnelObject) => {
        posts[i].personnelObject = personnelObject;
      }));
  }
  await Promise.all(postPromises);

  res.send(200, posts);
};

const getPostsByBase = async (req, res) => {
  const posts = await commonAreaService.getPostsByBase(req.params.base_id);

  const postPromises = [];
  for (let i = 0; i < posts.length; i += 1) {
    postPromises.push(personnelService.getPersonnelById(posts[i].posted_by)
      .then((personnelObject) => {
        posts[i].personnelObject = personnelObject;
      }));
  }
  await Promise.all(postPromises);

  res.send(200, posts);
};

const getPostsAtMyBase = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const person = await personnelService.getPersonnelById(enrollment.personnel_id);

  const posts = await commonAreaService.getPostsByBase(person.base_id);

  const postPromises = [];
  for (let i = 0; i < posts.length; i += 1) {
    postPromises.push(personnelService.getPersonnelById(posts[i].posted_by)
      .then((personnelObject) => {
        posts[i].personnelObject = personnelObject;
      }));
  }
  await Promise.all(postPromises);

  res.send(200, posts);
};

const getPostsCreatedBy = async (req, res) => {
  const posts = await commonAreaService.getPostsCreatedBy(req.params.personnel_id);

  const postPromises = [];
  for (let i = 0; i < posts.length; i += 1) {
    postPromises.push(personnelService.getPersonnelById(posts[i].posted_by)
      .then((personnelObject) => {
        posts[i].personnelObject = personnelObject;
      }));
  }
  await Promise.all(postPromises);

  res.send(200, posts);
};

const getPostsCreatedByMe = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const posts = await commonAreaService.getPostsCreatedBy(enrollment.personnel_id);

  const postPromises = [];
  for (let i = 0; i < posts.length; i += 1) {
    postPromises.push(personnelService.getPersonnelById(posts[i].posted_by)
      .then((personnelObject) => {
        posts[i].personnelObject = personnelObject;
      }));
  }
  await Promise.all(postPromises);

  res.send(200, posts);
};

const getPostById = async (req, res) => {
  const post = await commonAreaService.getPostById(parseInt(req.params.id, 10));

  await personnelService.getPersonnelById(post.posted_by)
    .then((personnelObject) => {
      post.personnelObject = personnelObject;
    });

  res.send(200, post);
};

const createPost = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));
  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  const enrolledPerson = await personnelService.getPersonnelById(enrollment.personnel_id);
  await commonAreaService.createPost(
    enrolledPerson.base_id,
    enrollment.personnel_id,
    new Date().toISOString(),
    req.body.text,
    true,
  );

  res.send(200);
};

const getComments = async (req, res) => {
  const comments = await commonAreaService.getComments();

  const commentPromises = [];
  for (let i = 0; i < comments.length; i += 1) {
    commentPromises.push(personnelService.getPersonnelById(comments[i].commenter_id)
      .then((personnelObject) => {
        comments[i].personnelObject = personnelObject;
      }));
  }
  await Promise.all(commentPromises);

  res.send(200, comments);
};

const getCommentById = async (req, res) => {
  const comment = await commonAreaService.getCommentById(parseInt(req.params.id, 10));

  await personnelService.getPersonnelById(comment.commenter_id)
    .then((personnelObject) => {
      comment.personnelObject = personnelObject;
    });

  res.send(200, comment);
};

const getCommentsByPost = async (req, res) => {
  const comments = await commonAreaService.getCommentsByPost(parseInt(req.params.id, 10));

  const commentPromises = [];
  for (let i = 0; i < comments.length; i += 1) {
    commentPromises.push(personnelService.getPersonnelById(comments[i].commenter_id)
      .then((personnelObject) => {
        comments[i].personnelObject = personnelObject;
      }));
  }
  await Promise.all(commentPromises);

  res.send(200, comments);
};

const createComment = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  await commonAreaService.createComment(
    req.body.post_id,
    enrollment.personnel_id,
    new Date().toISOString(),
    req.body.text,
    true,
  );

  res.send(200);
};

module.exports = {
  getPosts,
  getPostsByBase,
  getPostsAtMyBase,
  getPostsCreatedBy,
  getPostsCreatedByMe,
  getPostById,
  createPost,
  getComments,
  getCommentById,
  getCommentsByPost,
  createComment,
};
