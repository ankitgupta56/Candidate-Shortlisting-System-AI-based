// Calculate skill overlap percentage
function calculateSkillMatch(candidateSkills, requiredSkills) {
  const matchedSkills = candidateSkills.filter(skill =>
    requiredSkills.some(req => req.toLowerCase() === skill.toLowerCase())
  );
  
  if (requiredSkills.length === 0) return 0;
  return (matchedSkills.length / requiredSkills.length) * 100;
}

// Check if candidate meets experience requirement
function meetsExperienceRequirement(candidateExperience, minExperience) {
  return candidateExperience >= minExperience;
}

// Calculate overall match score
function calculateMatchScore(candidate, job) {
  const skillScore = calculateSkillMatch(candidate.skills, job.requiredSkills);
  const experienceBonus = meetsExperienceRequirement(candidate.experience, job.minExperience) ? 10 : 0;
  
  // Check for preferred skills
  let preferredBonus = 0;
  if (job.preferredSkills && job.preferredSkills.length > 0) {
    const preferredMatches = candidate.skills.filter(skill =>
      job.preferredSkills.some(pref => pref.toLowerCase() === skill.toLowerCase())
    );
    preferredBonus = (preferredMatches.length / job.preferredSkills.length) * 10;
  }
  
  return skillScore + experienceBonus + preferredBonus;
}

// Rank candidates
function rankCandidates(candidates, job) {
  return candidates
    .map(candidate => {
      const matchScore = calculateMatchScore(candidate, job);
      const skillMatches = candidate.skills.filter(skill =>
        job.requiredSkills.some(req => req.toLowerCase() === skill.toLowerCase())
      );
      
      return {
        ...candidate.toObject ? candidate.toObject() : candidate,
        matchScore: Math.round(matchScore * 100) / 100,
        matchedSkills: skillMatches,
        meetsExperience: meetsExperienceRequirement(candidate.experience, job.minExperience),
        ranking: matchScore >= 70 ? 'High' : matchScore >= 40 ? 'Medium' : 'Low'
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = {
  calculateSkillMatch,
  meetsExperienceRequirement,
  calculateMatchScore,
  rankCandidates
};
