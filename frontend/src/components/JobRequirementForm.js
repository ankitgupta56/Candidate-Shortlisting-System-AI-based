import React, { useState } from 'react';
import { matchingAPI } from '../services/api';
import '../styles/form.css';

function JobRequirementForm({ onResults, onAIResults }) {
  const [formData, setFormData] = useState({
    requiredSkills: '',
    minExperience: '',
    preferredSkills: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [matchType, setMatchType] = useState('basic');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const requiredSkills = formData.requiredSkills.split(',').map(s => s.trim());
      const preferredSkills = formData.preferredSkills
        ? formData.preferredSkills.split(',').map(s => s.trim())
        : [];

      const payload = {
        requiredSkills,
        minExperience: parseInt(formData.minExperience) || 0,
        preferredSkills
      };

      if (matchType === 'basic') {
        const response = await matchingAPI.basicMatch(payload);
        setMessage('Shortlisting completed successfully!');
        if (onResults) onResults(response.data);
      } else {
        setMessage('Generating AI recommendations...');
        const response = await matchingAPI.aiShortlist(payload);
        setMessage('AI shortlisting completed!');
        if (onAIResults) onAIResults(response.data);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error processing request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Job Requirements</h2>
      {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Required Skills * (comma-separated)</label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            required
            placeholder="e.g., React, Node.js"
          />
        </div>

        <div className="form-group">
          <label>Minimum Experience (Years) *</label>
          <input
            type="number"
            name="minExperience"
            value={formData.minExperience}
            onChange={handleChange}
            required
            placeholder="e.g., 2"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Preferred Skills (comma-separated)</label>
          <input
            type="text"
            name="preferredSkills"
            value={formData.preferredSkills}
            onChange={handleChange}
            placeholder="e.g., AWS, Docker"
          />
        </div>

        <div className="form-group">
          <label>Matching Type</label>
          <select value={matchType} onChange={(e) => setMatchType(e.target.value)}>
            <option value="basic">Basic Skill Matching</option>
            <option value="ai">AI-Based Shortlisting (requires API key)</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Generate Shortlist'}
        </button>
      </form>
    </div>
  );
}

export default JobRequirementForm;
