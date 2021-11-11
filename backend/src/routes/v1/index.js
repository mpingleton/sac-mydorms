const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const personnelRoute = require('./personnel.route');
const roomRoute = require('./room.route');
const roomAssignmentRoute = require('./roomassignment.route');
const workOrdersRoute = require('./workorders.route');
const roomInspectionRoute = require('./roominspection.route');
const commonAreaRoute = require('./commonarea.route');
const eventRoute = require('./event.route');

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
  {
    path: '/workorders',
    route: workOrdersRoute,
  },
  {
    path: '/roominspection',
    route: roomInspectionRoute,
  },
  {
    path: '/commonarea',
    route: commonAreaRoute,
  },
  {
    path: '/event',
    route: eventRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
