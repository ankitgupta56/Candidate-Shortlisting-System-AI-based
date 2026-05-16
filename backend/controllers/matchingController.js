const Candidate = require('../models/Candidate');
const { rankCandidates } = require('../utils/matchingLogic');

// Basic skill matching
exports.matchCandidates = async (req, res) => {
  try {
    const { requiredSkills, minExperience, preferredSkills } = req.body;

    if (!requiredSkills || !Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'requiredSkills array is required'
      });
    }

    if (minExperience === undefined) {
      return res.status(400).json({
        success: false,
        message: 'minExperience is required'
      });
    }

    const candidates = await Candidate.find();

    const job = {
      requiredSkills,
      minExperience: parseInt(minExperience),
      preferredSkills: preferredSkills || []
    };

    const rankedCandidates = rankCandidates(candidates, job);

    // Separate by ranking
    const results = {
      high: rankedCandidates.filter(c => c.ranking === 'High'),
      medium: rankedCandidates.filter(c => c.ranking === 'Medium'),
      low: rankedCandidates.filter(c => c.ranking === 'Low')
    };

    res.status(200).json({
      success: true,
      jobRequirements: job,
      results,
      allCandidates: rankedCandidates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
