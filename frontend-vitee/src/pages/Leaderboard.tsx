import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuperuserLoginModal from "@/components/SuperuserLoginModal";
import './Leaderboard.css';

type Team = {
  id?: number | string;
  name?: string;
  gem_count?: number;
  member_count?: number;
};

const LeaderboardPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

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
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return <div className="loading">Loading Leaderboard...</div>;
  }

  const sortedTeams = [...teams].sort((a, b) => (b.gem_count || 0) - (a.gem_count || 0));
  const medalForIndex = (i: number) => (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSuperuserClick={() => setLoginModalOpen(true)}
        onLeaderboardClick={() => { /* already on leaderboard page */ }}
        onRulebookClick={() => {
          const el = document.getElementById('rulebook');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1><span role="img" aria-label="trophy">🏆</span> Leaderboard</h1>
            <p className="subtitle">Witness the rise of champions. Teams are ranked by performance.</p>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="controls">
            <button className="refresh-btn" onClick={fetchData} disabled={refreshing}>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="leaderboard-list">
            <div className="leaderboard-header">
              <div className="header-rank">Rank</div>
              <div className="header-team">Team</div>
              <div className="header-points">Gems</div>
            </div>

            <div className="leaderboard-body">
              {sortedTeams.map((team, index) => (
                <div className="leaderboard-row" key={team.id ?? team.name ?? index}>
                  <div className="rank">
                    <span>{medalForIndex(index) ?? (index + 1)}</span>
                  </div>
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

                  <div className="points">
                    {(team.gem_count ?? 0)} <span aria-hidden>💎</span>
                  </div>
                </div>
              ))}

              {sortedTeams.length === 0 && (
                <div className="no-teams">No teams created yet. Go to admin to add one!</div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <SuperuserLoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
};

export default LeaderboardPage;
