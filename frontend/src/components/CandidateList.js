import React, { useState, useEffect } from 'react';
import { candidateAPI, matchingAPI } from '../services/api';
import '../styles/list.css';

function CandidateList({ refreshTrigger }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState('');
  const [jobRequirements, setJobRequirements] = useState({
    requiredSkills: '',
    minExperience: 0
  });

  useEffect(() => {
    fetchCandidates();
  }, [refreshTrigger]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await candidateAPI.getAllCandidates();
      setCandidates(response.data.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await candidateAPI.searchCandidates({ name: searchQuery });
      setCandidates(response.data.data);
    } catch (error) {
      console.error('Error searching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await candidateAPI.deleteCandidate(id);
        fetchCandidates();
      } catch (error) {
        console.error('Error deleting candidate:', error);
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCandidates(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleGenerateQuestions = async () => {
    if (!selectedCandidateId || !jobRequirements.requiredSkills) {
      alert('Please select a candidate and provide job requirements');
      return;
    }

    try {
      const response = await matchingAPI.generateQuestions({
        candidateId: selectedCandidateId,
        requiredSkills: jobRequirements.requiredSkills.split(',').map(s => s.trim()),
        minExperience: parseInt(jobRequirements.minExperience)
      });

      const { questions } = response.data;
      alert(`Generated ${questions.length} interview questions for the candidate!`);
      setShowQuestionForm(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error generating questions');
    }
  };

  return (
    <div className="list-container">
      <h2>Candidates</h2>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={fetchCandidates}>Reset</button>
        </form>
      </div>

      {selectedCandidates.length > 0 && (
        <div className="selected-section">
          <p>{selectedCandidates.length} candidate(s) selected</p>
          <button className="btn-primary" onClick={() => setShowQuestionForm(!showQuestionForm)}>
            Generate Interview Questions
          </button>
        </div>
      )}

      {showQuestionForm && (
        <div className="question-form">
          <div className="form-group">
            <label>Select Candidate</label>
            <select
              value={selectedCandidateId}
              onChange={(e) => setSelectedCandidateId(e.target.value)}
            >
              <option value="">Choose a candidate</option>
              {selectedCandidates.map(id => {
                const candidate = candidates.find(c => c._id === id);
                return (
                  <option key={id} value={id}>
                    {candidate?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Required Skills (comma-separated)</label>
            <input
              type="text"
              value={jobRequirements.requiredSkills}
              onChange={(e) => setJobRequirements({ ...jobRequirements, requiredSkills: e.target.value })}
              placeholder="e.g., React, Node.js"
            />
          </div>

          <div className="form-group">
            <label>Minimum Experience (Years)</label>
            <input
              type="number"
              value={jobRequirements.minExperience}
              onChange={(e) => setJobRequirements({ ...jobRequirements, minExperience: e.target.value })}
              min="0"
            />
          </div>

          <button onClick={handleGenerateQuestions}>Generate Questions</button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading candidates...</div>
      ) : candidates.length === 0 ? (
        <div className="empty">No candidates found</div>
      ) : (
        <div className="candidates-grid">
          {candidates.map(candidate => (
            <div key={candidate._id} className="candidate-card">
              <div className="checkbox-section">
                <input
                  type="checkbox"
                  checked={selectedCandidates.includes(candidate._id)}
                  onChange={() => handleCheckboxChange(candidate._id)}
                />
              </div>
              <h3>{candidate.name}</h3>
              <p><strong>Email:</strong> {candidate.email}</p>
              <p><strong>Experience:</strong> {candidate.experience} years</p>
              <p><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
              {candidate.bio && <p><strong>Bio:</strong> {candidate.bio}</p>}
              {candidate.projects && candidate.projects.length > 0 && (
                <p><strong>Projects:</strong> {candidate.projects.join(', ')}</p>
              )}
              <div className="actions">
                <button className="btn-delete" onClick={() => handleDelete(candidate._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateList;
