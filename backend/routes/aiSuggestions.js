const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST - AI-based shortlisting
router.post('/shortlist', aiController.aiShortlist);

// POST - Generate interview questions
router.post('/questions', aiController.generateQuestions);

module.exports = router;
