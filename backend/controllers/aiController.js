const Candidate = require('../models/Candidate');
const { rankCandidates } = require('../utils/matchingLogic');
const { getCandidateSuggestions, generateInterviewQuestions } = require('../utils/openRouterAPI');

// AI-based shortlisting
exports.aiShortlist = async (req, res) => {
  try {
    const { requiredSkills, minExperience, preferredSkills } = req.body;

    if (!requiredSkills || !Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'requiredSkills array is required'
      });
    }

    const candidates = await Candidate.find();

    if (candidates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No candidates found in the system'
      });
    }

    const job = {
      requiredSkills,
      minExperience: parseInt(minExperience) || 0,
      preferredSkills: preferredSkills || []
    };

    // First do basic ranking
    const basicRanked = rankCandidates(candidates, job);

    // Get AI suggestions
    const aiSuggestions = await getCandidateSuggestions(candidates, job);

    res.status(200).json({
      success: true,
      jobRequirements: job,
      basicRanking: basicRanked,
      aiAnalysis: aiSuggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Generate interview questions for a candidate
exports.generateQuestions = async (req, res) => {
  try {
    const { candidateId, requiredSkills, minExperience } = req.body;

    if (!candidateId) {
      return res.status(400).json({
        success: false,
        message: 'candidateId is required'
      });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    const jobRequirements = {
      requiredSkills: requiredSkills || [],
      minExperience: minExperience || 0
    };

    const questions = await generateInterviewQuestions(candidate, jobRequirements);

    res.status(200).json({
      success: true,
      candidate: {
        id: candidate._id,
        name: candidate.name,
        skills: candidate.skills
      },
      questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
