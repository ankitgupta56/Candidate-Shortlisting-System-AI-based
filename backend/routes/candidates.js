const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// POST - Add a new candidate
router.post('/', candidateController.addCandidate);

// GET - Get all candidates
router.get('/', candidateController.getAllCandidates);

// GET - Search candidates
router.get('/search', candidateController.searchCandidates);

// GET - Get candidate by ID
router.get('/:id', candidateController.getCandidateById);

// PUT - Update candidate
router.put('/:id', candidateController.updateCandidate);

// DELETE - Delete candidate
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
