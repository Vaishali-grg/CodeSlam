// In src/Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css'; // We will create this file next

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
      <h1>🏆 Team Gem Leaderboard 🏆</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Gems</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id}>
              <td>#{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.gem_count} 💎</td>
            </tr>
          ))}
          
          {/* Show a message if there are no teams */}
          {teams.length === 0 && (
            <tr>
              <td colSpan="3">No teams created yet. Go to admin to add one!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;