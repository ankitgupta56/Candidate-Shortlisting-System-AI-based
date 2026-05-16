import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Candidate APIs
export const candidateAPI = {
  addCandidate: (data) => axios.post(`${API_BASE_URL}/candidates`, data),
  getAllCandidates: () => axios.get(`${API_BASE_URL}/candidates`),
  getCandidateById: (id) => axios.get(`${API_BASE_URL}/candidates/${id}`),
  updateCandidate: (id, data) => axios.put(`${API_BASE_URL}/candidates/${id}`, data),
  deleteCandidate: (id) => axios.delete(`${API_BASE_URL}/candidates/${id}`),
  searchCandidates: (params) => axios.get(`${API_BASE_URL}/candidates/search`, { params })
};

// Matching APIs
export const matchingAPI = {
  basicMatch: (data) => axios.post(`${API_BASE_URL}/match`, data),
  aiShortlist: (data) => axios.post(`${API_BASE_URL}/ai/shortlist`, data),
  generateQuestions: (data) => axios.post(`${API_BASE_URL}/ai/questions`, data)
};
