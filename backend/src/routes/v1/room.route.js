const express = require('express');

const roomController = require('@/controllers/room.controller');

const router = express.Router();

router.get('/', roomController.getRooms);
router.get('/:id', roomController.getRoomById);

module.exports = router;
