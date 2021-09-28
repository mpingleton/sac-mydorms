const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const dataRoute = require('./data.route');

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
    path: '/data',
    route: dataRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
