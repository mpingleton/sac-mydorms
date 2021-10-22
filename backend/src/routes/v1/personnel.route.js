const express = require('express');

const auth = require('@/middlewares/auth');
const personnelController = require('@/controllers/personnel.controller');

const router = express.Router();

router.get('/', auth(), personnelController.getPersonnel);
router.get('/:id', auth(), personnelController.getPersonnelById);
router.put('/', auth(), personnelController.createPersonnel);

module.exports = router;
