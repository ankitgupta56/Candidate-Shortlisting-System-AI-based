import React, { useState } from 'react';
import CandidateForm from './components/CandidateForm';
import JobRequirementForm from './components/JobRequirementForm';
import CandidateList from './components/CandidateList';
import ShortlistedResults from './components/ShortlistedResults';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [results, setResults] = useState(null);
  const [aiResults, setAiResults] = useState(null);

  const handleCandidateAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎯 Candidate Shortlisting System</h1>
        <p>AI-Powered Candidate Matching & Recruitment</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={`nav-btn ${activeTab === 'candidates' ? 'active' : ''}`}
          onClick={() => setActiveTab('candidates')}
        >
          Candidates
        </button>
        <button
          className={`nav-btn ${activeTab === 'shortlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('shortlist')}
        >
          Shortlisting
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'home' && (
          <div className="home-section">
            <div className="home-grid">
              <div className="home-card">
                <h3>📋 Add Candidates</h3>
                <p>Manage candidate profiles with skills, experience, and project details</p>
                <button onClick={() => setActiveTab('candidates')}>Go to Candidates</button>
              </div>
              <div className="home-card">
                <h3>🔍 Smart Matching</h3>
                <p>Use skill matching and AI to find the best candidates for your jobs</p>
                <button onClick={() => setActiveTab('shortlist')}>Start Shortlisting</button>
              </div>
              <div className="home-card">
                <h3>🤖 AI Integration</h3>
                <p>OpenRouter API integration for intelligent candidate analysis</p>
                <button onClick={() => setActiveTab('shortlist')}>AI Shortlist</button>
              </div>
              <div className="home-card">
                <h3>📊 Analytics</h3>
                <p>View match scores, rankings, and generate interview questions</p>
                <button onClick={() => setActiveTab('shortlist')}>View Results</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="candidates-section">
            <div className="section-grid">
              <div className="form-section">
                <CandidateForm onSuccess={handleCandidateAdded} />
              </div>
              <div className="list-section">
                <CandidateList refreshTrigger={refreshTrigger} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shortlist' && (
          <div className="shortlist-section">
            <div className="section-grid">
              <div className="form-section">
                <JobRequirementForm
                  onResults={setResults}
                  onAIResults={setAiResults}
                />
              </div>
              <div className="results-section">
                <ShortlistedResults results={results} aiResults={aiResults} />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Candidate Shortlisting System | Powered by OpenRouter AI</p>
      </footer>
    </div>
  );
}

export default App;
