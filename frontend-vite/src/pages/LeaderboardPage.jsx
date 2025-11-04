import React from 'react';
import Leaderboard from '../Leaderboard.jsx';
import '../Leaderboard.css';

// Thin wrapper page component — keeps App.jsx simple and imports CSS
export default function LeaderboardPage(props) {
  return (
    <div>
      <Leaderboard {...props} />
    </div>
  );
}
