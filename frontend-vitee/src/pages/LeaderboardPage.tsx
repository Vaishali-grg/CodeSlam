// src/pages/LeaderboardPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import '../index.css'; // Make sure your styles are imported

// Use the Supabase-generated type for your 'teams' table
import type { Database } from '../types/supabase';
type Team = Database['public']['Tables']['teams']['Row'];

function LeaderboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This function fetches data from Supabase
  const fetchData = useCallback(async () => {
    setRefreshing(true);
    setError(null);

    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('gems', { ascending: false }); // <-- Your logic is here

    if (error) {
      console.warn(error);
      setError('Failed to load leaderboard. Please try again.');
    } else if (data) {
      setTeams(data);
    }

    setLoading(false);
    setRefreshing(false);
  }, []); // Supabase client is stable, no dependency needed

  // Fetch data on initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Helper function for 1st, 2nd, 3rd place
  const medalForIndex = (i: number) => (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null);

  // Show a themed loading message
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <h2 className="text-2xl text-coc-yellow font-bold">Loading Leaderboard...</h2>
      </div>
    );
  }

  return (
    // Use the theme background
    <div className="min-h-screen bg-background text-foreground">
      <main className="py-12">
        <div className="container mx-auto px-4">
          
          {/* --- Header --- */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-coc-yellow mb-4">
              🏆 Team Leaderboard 🏆
            </h1>
            <p className="text-xl text-muted-foreground">
              Witness the rise of champions. Teams are ranked by gems.
            </p>
          </div>

          {/* --- Error Message --- */}
          {error && (
            <div className="text-center p-4 bg-destructive text-destructive-foreground rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* --- Refresh Button --- */}
          <div className="flex justify-center mb-6">
            <button 
              className="btn-3d btn-3d-green px-8 py-3 rounded-lg text-white font-bold" 
              onClick={fetchData} 
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {/* --- Leaderboard List --- */}
          <div className="max-w-3xl mx-auto">
            {/* Header Row */}
            <div className="flex items-center text-lg font-bold text-accent-foreground p-4">
              <div className="w-1/6 text-center">Rank</div>
              <div className="w-3/6">Team</div>
              <div className="w-2/6 text-right">Gems</div>
            </div>

            {/* Body Rows */}
            <div className="flex flex-col gap-3">
              {teams.map((team, index) => (
                <div 
                  key={team.id} 
                  className="card-coc bg-card flex items-center p-4 rounded-2xl"
                >
                  {/* Rank */}
                  <div className="w-1/6 text-center text-2xl font-bold">
                    <span>{medalForIndex(index) ?? (index + 1)}</span>
                  </div>
                  
                  {/* Team Name & Avatar */}
                  <div className="w-3/6 flex items-center gap-4">
                    <img 
                      className="w-12 h-12 rounded-full border-2 border-border" 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(team.name || 'team')}`} 
                      alt={`${team.name} avatar`} 
                    />
                    <div>
                      <span className="text-lg text-white font-bold">{team.name}</span>
                      {/* We don't have member_count, so I removed that part */}
                    </div>
                  </div>

                  {/* Points (Gems) */}
                  <div className="w-2/6 text-right text-xl text-coc-yellow font-bold">
                    {(team.gems ?? 0)} <span aria-hidden>💎</span>
                  </div>
                </div>
              ))}

              {/* No Teams Message */}
              {teams.length === 0 && !loading && (
                <div className="card-coc bg-card p-6 rounded-2xl text-center text-muted-foreground">
                  No teams have been created yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;