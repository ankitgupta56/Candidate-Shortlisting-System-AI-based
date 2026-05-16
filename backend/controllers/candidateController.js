const Candidate = require('../models/Candidate');

// Add a new candidate
exports.addCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio, projects } = req.body;

    if (!name || !email || !skills || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, skills, and experience are required'
      });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({
        success: false,
        message: 'Candidate with this email already exists'
      });
    }

    const candidate = new Candidate({
      name,
      email,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
      experience,
      bio: bio || '',
      projects: Array.isArray(projects) ? projects : []
    });

    await candidate.save();

    res.status(201).json({
      success: true,
      message: 'Candidate added successfully',
      data: candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update candidate
exports.updateCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio, projects } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (skills) updateData.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
    if (experience !== undefined) updateData.experience = experience;
    if (bio) updateData.bio = bio;
    if (projects) updateData.projects = Array.isArray(projects) ? projects : [];
    updateData.updatedAt = Date.now();

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Candidate updated successfully',
      data: candidate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search candidates
exports.searchCandidates = async (req, res) => {
  try {
    const { skill, minExperience, maxExperience, name } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (skill) {
      query.skills = { $in: [skill] };
    }

    if (minExperience) {
      query.experience = { $gte: parseInt(minExperience) };
    }

    if (maxExperience) {
      query.experience = { ...query.experience, $lte: parseInt(maxExperience) };
    }

    const candidates = await Candidate.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
