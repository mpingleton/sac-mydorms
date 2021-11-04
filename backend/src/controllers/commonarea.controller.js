const commonAreaService = require('@/services/commonarea.service');
const personnelService = require('@/services/personnel.service');

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

const getPostById = async (req, res) => {
  const post = await commonAreaService.getPostById(parseInt(req.params.id, 10));

  await personnelService.getPersonnelById(post.posted_by)
    .then((personnelObject) => {
      post.personnelObject = personnelObject;
    });

  res.send(200, post);
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

module.exports = {
  getPosts,
  getPostById,
  getComments,
  getCommentById,
};
