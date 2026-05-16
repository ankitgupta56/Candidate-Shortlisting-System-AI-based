const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function getCandidateSuggestions(candidates, jobRequirements) {
  try {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      throw new Error('OpenRouter API key not configured. Please set OPENROUTER_API_KEY in .env');
    }

    // Format candidates and job data for the prompt
    const candidatesList = candidates
      .map((c, idx) => {
        const candidate = c.toObject ? c.toObject() : c;
        return `${idx + 1}. ${candidate.name} - Skills: ${candidate.skills.join(', ')} - Experience: ${candidate.experience} years${candidate.bio ? ` - Bio: ${candidate.bio}` : ''}`;
      })
      .join('\n');

    const jobDesc = `
    Required Skills: ${jobRequirements.requiredSkills.join(', ')}
    Minimum Experience: ${jobRequirements.minExperience} years
    ${jobRequirements.preferredSkills ? `Preferred Skills: ${jobRequirements.preferredSkills.join(', ')}` : ''}
    `;

    const prompt = `
    You are an expert recruiter. Please analyze the following candidates and job requirements.
    
    Job Requirements:
    ${jobDesc}
    
    Candidates:
    ${candidatesList}
    
    Please:
    1. Rank the top 3-5 candidates who would be the best fit for this role
    2. For each top candidate, provide:
       - Why they are a good fit
       - How their skills align with the requirements
       - Any concerns or gaps
       - Overall suitability score (1-10)
    
    Format your response as JSON with the following structure:
    {
      "topCandidates": [
        {
          "name": "candidate name",
          "suitability": 9,
          "fit": "explanation",
          "strengths": ["strength1", "strength2"],
          "gaps": ["gap1", "gap2"],
          "recommendation": "brief recommendation"
        }
      ],
      "summary": "overall summary of the shortlisting"
    }
    `;

    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Candidate Shortlisting System'
        }
      }
    );

    // Parse the AI response
    const aiContent = response.data.choices[0].message.content;
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        return {
          topCandidates: [],
          summary: aiContent,
          rawResponse: aiContent
        };
      }
    } catch (parseError) {
      return {
        topCandidates: [],
        summary: aiContent,
        rawResponse: aiContent
      };
    }
  } catch (error) {
    console.error('OpenRouter API Error:', error.message);
    throw new Error(`AI Suggestion Error: ${error.message}`);
  }
}

async function generateInterviewQuestions(candidate, jobRequirements) {
  try {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      throw new Error('OpenRouter API key not configured');
    }

    const prompt = `
    Generate 5 technical interview questions for a candidate with the following profile:
    
    Candidate: ${candidate.name}
    Skills: ${candidate.skills.join(', ')}
    Experience: ${candidate.experience} years
    Bio: ${candidate.bio || 'Not provided'}
    
    Job Requirements:
    Required Skills: ${jobRequirements.requiredSkills.join(', ')}
    Minimum Experience: ${jobRequirements.minExperience} years
    
    Generate questions that:
    1. Test their technical skills
    2. Are relevant to the job requirements
    3. Are appropriate for their experience level
    4. Include one behavioral question
    
    Format as JSON with this structure:
    {
      "questions": [
        {
          "id": 1,
          "question": "question text",
          "type": "technical|behavioral",
          "difficulty": "easy|medium|hard"
        }
      ]
    }
    `;

    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Candidate Shortlisting System'
        }
      }
    );

    const aiContent = response.data.choices[0].message.content;
    
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        return { questions: [], rawResponse: aiContent };
      }
    } catch (parseError) {
      return { questions: [], rawResponse: aiContent };
    }
  } catch (error) {
    console.error('Interview Questions Generation Error:', error.message);
    throw new Error(`Interview Questions Error: ${error.message}`);
  }
}

module.exports = {
  getCandidateSuggestions,
  generateInterviewQuestions
};
