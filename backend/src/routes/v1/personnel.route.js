const express = require('express');

const personnelController = require('@/controllers/personnel.controller');

const router = express.Router();

router.get('/', personnelController.getPersonnel);
router.get('/:id', personnelController.getPersonnelById);

module.exports = router;
