// In frontend-vite/src/App.jsx
import React, { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import './App.css';

function App() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="App">
      {showLeaderboard ? (
        <LeaderboardPage />
      ) : (
        <LandingPage onLeaderboardClick={() => setShowLeaderboard(true)} />
      )}
    </div>
  );
}

export default App;