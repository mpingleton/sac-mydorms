const express = require('express');

const personnelController = require('@/controllers/personnel.controller');

const router = express.Router();

router.get('/', personnelController.getPersonnel);

module.exports = router;
