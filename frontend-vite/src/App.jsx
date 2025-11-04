// In frontend-vite/src/App.jsx
import React from 'react';
import Leaderboard from './Leaderboard.jsx'; // <-- Import your component
import './App.css'; // We'll clear this file next

function App() {
  return (
    <div className="App">
      <Leaderboard />
    </div>
  );
}

export default App;