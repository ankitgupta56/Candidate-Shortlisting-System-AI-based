const express = require('express');
const router = express.Router();
const matchingController = require('../controllers/matchingController');

// POST - Basic skill matching
router.post('/', matchingController.matchCandidates);

module.exports = router;
