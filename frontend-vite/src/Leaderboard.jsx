import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css'; 

function Leaderboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // This is the URL of your Django API endpoint
  const API_URL = 'http://127.0.0.1:8000/api/leaderboard/';

  useEffect(() => {
    // Function to fetch data
    const fetchData = () => {
      axios.get(API_URL)
        .then(response => {
          setTeams(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data from Django API!", error);
          setLoading(false);
        });
    };

    fetchData();

    // Optional: Refresh data every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);

  }, []); // The empty array [] means this runs once on mount

  if (loading) {
    return <div className="loading">Loading Leaderboard...</div>;
  }

  return (
    <div className="leaderboard-container">
      <h1><span role="img" aria-label="trophy">🏆</span> Leaderboard</h1>
      <p className="subtitle">Witness the rise of champions. Teams are ranked by performance.</p>
      
      <div className="leaderboard-list">
        
        {/* --- HEADER ROW --- */}
        <div className="leaderboard-header">
          <div className="header-rank">Rank</div>
          <div className="header-team">Team</div>
          <div className="header-points">Gems</div>
        </div>

        {/* --- DATA ROWS --- */}
        <div className="leaderboard-body">
          {teams.map((team, index) => (
            <div className="leaderboard-row" key={team.id}>
              
              {/* Rank Column */}
              <div className="rank">
                <span>{index + 1}</span>
              </div>
              
              {/* Team Column */}
              <div className="team">
                <img 
                  className="avatar" 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${team.name}`} 
                  alt={`${team.name} avatar`} 
                />
                <div className="team-details">
                  <span className="team-name">{team.name}</span>
                </div>
              </div>

              {/* Points Column - THIS IS THE CHANGED LINE */}
              <div className="points">
                {team.gem_count} 💎
              </div>

            </div>
          ))}
          
          {/* Show a message if there are no teams */}
          {teams.length === 0 && (
            <div className="no-teams">No teams created yet. Go to admin to add one!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;