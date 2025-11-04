import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Leaderboard.css'; 

function Leaderboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // This is the URL of your Django API endpoint
  const API_URL = 'http://127.0.0.1:8000/api/leaderboard/';

  const fetchData = useCallback(() => {
    setRefreshing(true);
    axios.get(API_URL)
      .then(response => {
        setTeams(response.data || []);
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching data from Django API!", err);
        setError('Failed to load leaderboard. Please check the server.');
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, [API_URL]);

  useEffect(() => {
    fetchData();

    // Optional: Refresh data every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);

  }, [fetchData]); // fetchData is stable via useCallback

  if (loading) {
    return <div className="loading">Loading Leaderboard...</div>;
  }

  // Sort teams by gem_count descending (highest gems first)
  const sortedTeams = [...teams].sort((a, b) => (b.gem_count || 0) - (a.gem_count || 0));

  const medalForIndex = (i) => (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null);

  return (
    <div className="leaderboard-container">
      <h1><span role="img" aria-label="trophy">🏆</span> Leaderboard</h1>
      <p className="subtitle">Witness the rise of champions. Teams are ranked by performance.</p>

      {error && <div className="error">{error}</div>}

      <div className="controls">
        <button className="refresh-btn" onClick={fetchData} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      <div className="leaderboard-list">
        
        {/* --- HEADER ROW --- */}
        <div className="leaderboard-header">
          <div className="header-rank">Rank</div>
          <div className="header-team">Team</div>
          <div className="header-points">Gems</div>
        </div>

        {/* --- DATA ROWS --- */}
        <div className="leaderboard-body">
          {sortedTeams.map((team, index) => (
            <div className="leaderboard-row" key={team.id ?? team.name ?? index}>
              
              {/* Rank Column */}
              <div className="rank">
                <span>{medalForIndex(index) ?? (index + 1)}</span>
              </div>
              
              {/* Team Column */}
              <div className="team">
                <img 
                  className="avatar" 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(team.name || 'team')}`} 
                  alt={`${team.name} avatar`} 
                />
                <div className="team-details">
                  <span className="team-name">{team.name}</span>
                  {team.member_count ? <div className="team-meta">{team.member_count} members</div> : null}
                </div>
              </div>

              {/* Points Column */}
              <div className="points">
                {(team.gem_count ?? 0)} <span aria-hidden>💎</span>
              </div>

            </div>
          ))}
          
          {/* Show a message if there are no teams */}
          {sortedTeams.length === 0 && (
            <div className="no-teams">No teams created yet. Go to admin to add one!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;