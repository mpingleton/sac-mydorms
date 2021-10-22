const express = require('express');

const auth = require('@/middlewares/auth');
const roomController = require('@/controllers/room.controller');

const router = express.Router();

router.get('/', auth(), roomController.getRooms);
router.get('/:id', auth(), roomController.getRoomById);

module.exports = router;
