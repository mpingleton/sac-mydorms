const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const personnelRoute = require('./personnel.route');
const roomRoute = require('./room.route');
const roomAssignmentRoute = require('./roomassignment.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/personnel',
    route: personnelRoute,
  },
  {
    path: '/room',
    route: roomRoute,
  },
  {
    path: '/roomassignment',
    route: roomAssignmentRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
