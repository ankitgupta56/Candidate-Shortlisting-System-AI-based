import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import '../styles/shortlist.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ShortlistedResults({ results, aiResults }) {
  if (!results && !aiResults) {
    return <div className="no-results">No results yet. Generate shortlist first.</div>;
  }

  const renderBasicResults = () => {
    if (!results) return null;

    const { high, medium, low } = results.results || {};
    const allCandidates = results.allCandidates || [];

    // Prepare chart data
    const chartData = {
      labels: allCandidates.slice(0, 5).map(c => c.name),
      datasets: [
        {
          label: 'Match Score',
          data: allCandidates.slice(0, 5).map(c => c.matchScore),
          backgroundColor: [
            '#4CAF50',
            '#8BC34A',
            '#FFC107',
            '#FF9800',
            '#F44336'
          ]
        }
      ]
    };

    const rankingData = {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          data: [
            (high || []).length,
            (medium || []).length,
            (low || []).length
          ],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
        }
      ]
    };

    return (
      <div className="results-container">
        <h2>Basic Skill Matching Results</h2>

        <div className="charts-section">
          <div className="chart">
            <h3>Top Candidates Match Score</h3>
            <Bar data={chartData} options={{ responsive: true }} />
          </div>

          <div className="chart">
            <h3>Ranking Distribution</h3>
            <Pie data={rankingData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="ranking-section">
          {high && high.length > 0 && (
            <div className="ranking-group high">
              <h3>🟢 High Match ({high.length})</h3>
              {high.map(candidate => (
                <div key={candidate._id} className="candidate-result">
                  <h4>{candidate.name}</h4>
                  <p><strong>Match Score:</strong> {candidate.matchScore}%</p>
                  <p><strong>Matched Skills:</strong> {candidate.matchedSkills.join(', ')}</p>
                  <p><strong>Experience:</strong> {candidate.experience} years</p>
                </div>
              ))}
            </div>
          )}

          {medium && medium.length > 0 && (
            <div className="ranking-group medium">
              <h3>🟡 Medium Match ({medium.length})</h3>
              {medium.map(candidate => (
                <div key={candidate._id} className="candidate-result">
                  <h4>{candidate.name}</h4>
                  <p><strong>Match Score:</strong> {candidate.matchScore}%</p>
                  <p><strong>Matched Skills:</strong> {candidate.matchedSkills.join(', ')}</p>
                  <p><strong>Experience:</strong> {candidate.experience} years</p>
                </div>
              ))}
            </div>
          )}

          {low && low.length > 0 && (
            <div className="ranking-group low">
              <h3>🔴 Low Match ({low.length})</h3>
              {low.map(candidate => (
                <div key={candidate._id} className="candidate-result">
                  <h4>{candidate.name}</h4>
                  <p><strong>Match Score:</strong> {candidate.matchScore}%</p>
                  <p><strong>Matched Skills:</strong> {candidate.matchedSkills.join(', ') || 'None'}</p>
                  <p><strong>Experience:</strong> {candidate.experience} years</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAIResults = () => {
    if (!aiResults) return null;

    const { aiAnalysis, basicRanking } = aiResults;

    return (
      <div className="results-container ai-results">
        <h2>AI-Based Shortlisting Results</h2>

        <div className="ai-analysis">
          <h3>AI Analysis Summary</h3>
          {aiAnalysis.summary && (
            <div className="summary">
              {aiAnalysis.summary}
            </div>
          )}

          {aiAnalysis.topCandidates && aiAnalysis.topCandidates.length > 0 && (
            <div className="top-candidates">
              <h4>Top Recommended Candidates</h4>
              {aiAnalysis.topCandidates.map((candidate, index) => (
                <div key={index} className="ai-candidate">
                  <h5>{index + 1}. {candidate.name}</h5>
                  <p><strong>Suitability Score:</strong> {candidate.suitability}/10</p>
                  <p><strong>Fit:</strong> {candidate.fit}</p>
                  {candidate.strengths && candidate.strengths.length > 0 && (
                    <p><strong>Strengths:</strong> {candidate.strengths.join(', ')}</p>
                  )}
                  {candidate.gaps && candidate.gaps.length > 0 && (
                    <p><strong>Gaps:</strong> {candidate.gaps.join(', ')}</p>
                  )}
                  {candidate.recommendation && (
                    <p><strong>Recommendation:</strong> {candidate.recommendation}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="basic-ranking">
          <h3>Basic Ranking for Reference</h3>
          {basicRanking && basicRanking.slice(0, 5).map((candidate, index) => (
            <div key={index} className="candidate-result">
              <h4>{candidate.name}</h4>
              <p><strong>Match Score:</strong> {candidate.matchScore}%</p>
              <p><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="shortlist-display">
      {aiResults ? renderAIResults() : renderBasicResults()}
    </div>
  );
}

export default ShortlistedResults;
