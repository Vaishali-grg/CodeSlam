import React from "react";
import "./LandingPage.css";
import { Trophy, Crown, BookOpen } from "lucide-react"; // optional icons

const LandingPage = ({ onLeaderboardClick }) => {
  return (
    <div className="landing-wrapper">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/shield.png" alt="Code Slam Logo" className="logo-icon" />
          <span>CODE SLAM</span>
        </div>
        <div className="nav-buttons">
          <button className="nav-btn">
            <Trophy size={18} /> Leaderboard
          </button>
          <button className="nav-btn">
            <Crown size={18} /> Superuser
          </button>
          <button className="nav-btn">
            <BookOpen size={18} /> Rules
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="hero-card">
          <h1 className="title">CODE SLAM</h1>
          <h2 className="subtitle">Battle of Algorithms</h2>
          <p className="description">
            Lead your code to glory! Join the ultimate algorithmic warfare where
            champions are forged!
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">⚔ Start Your Journey</button>
            <button className="secondary-btn" onClick={onLeaderboardClick}>
              🏆 View Champions
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
