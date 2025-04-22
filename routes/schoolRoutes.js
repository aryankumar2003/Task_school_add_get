const express = require('express');
const router = express.Router();
const schoolController = require('../Controller/schoolController');

router.post('/addSchool', schoolController.addSchool);
router.get('/listSchools', schoolController.listSchools);

module.exports = router;
