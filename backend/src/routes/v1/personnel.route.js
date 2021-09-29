const express = require('express');
const dataController = require('../../controllers/personnel.controller');

const router = express.Router();

router.get('/', dataController.getPersonnel);

module.exports = router;
