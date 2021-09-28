const express = require('express');
const dataController = require('../../controllers/data.controller');

const router = express.Router();

router.get('/getpersonnel', dataController.getPersonnel);

module.exports = router;
