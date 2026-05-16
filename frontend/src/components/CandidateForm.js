import React, { useState } from 'react';
import { candidateAPI } from '../services/api';
import '../styles/form.css';

function CandidateForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
    bio: '',
    projects: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      const skills = formData.skills.split(',').map(s => s.trim());
      const projects = formData.projects
        ? formData.projects.split(',').map(p => p.trim())
        : [];

      const payload = {
        ...formData,
        skills,
        projects,
        experience: parseInt(formData.experience)
      };

      const response = await candidateAPI.addCandidate(payload);

      if (response.data.success) {
        setMessage('Candidate added successfully!');
        setFormData({
          name: '',
          email: '',
          skills: '',
          experience: '',
          bio: '',
          projects: ''
        });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Candidate</h2>
      {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Rahul Sharma"
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="e.g., rahul@gmail.com"
          />
        </div>

        <div className="form-group">
          <label>Skills * (comma-separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            placeholder="e.g., React, Node.js, MongoDB"
          />
        </div>

        <div className="form-group">
          <label>Experience (Years) *</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            placeholder="e.g., 2"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Brief description of the candidate"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Projects (comma-separated)</label>
          <input
            type="text"
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            placeholder="e.g., E-commerce Platform, CRM System"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Candidate'}
        </button>
      </form>
    </div>
  );
}

export default CandidateForm;
