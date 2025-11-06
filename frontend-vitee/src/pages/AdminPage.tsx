import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../index.css'; // Make sure styles are imported

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamGems, setNewTeamGems] = useState(0);
  const [updateGems, setUpdateGems] = useState({});

  async function fetchTeams() {
    setLoading(true);
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching teams:', error);
      alert('Error fetching teams');
    } else {
      setTeams(data);
      const gemState = {};
      data.forEach(team => {
        gemState[team.id] = team.gems;
      });
      setUpdateGems(gemState);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName) {
      alert('Please enter a team name.');
      return;
    }
    const { error } = await supabase
      .from('teams')
      .insert({ name: newTeamName, gems: newTeamGems });

    if (error) alert(error.message);
    else {
      alert('Team created!');
      setNewTeamName('');
      setNewTeamGems(0);
      fetchTeams();
    }
  };

  const handleGemChange = (teamId, value) => {
    setUpdateGems(prev => ({
      ...prev,
      [teamId]: parseInt(value, 10) || 0
    }));
  };

  const handleUpdateGems = async (e, teamId) => {
    e.preventDefault();
    const newGems = updateGems[teamId];
    const { error } = await supabase
      .from('teams')
      .update({ gems: newGems })
      .eq('id', teamId);
    
    if (error) alert(error.message);
    else {
      alert('Gems updated!');
      fetchTeams();
    }
  };

  const handleDeleteTeam = async (teamId, teamName) => {
    // This is the original code, as requested
    if (window.confirm(`Are you sure you want to delete "${teamName}"?`)) {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', teamId);
      
      if (error) alert(error.message);
      else {
        alert('Team deleted.');
        fetchTeams();
      }
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error);
    else navigate('/');
  };

  // --- Re-usable Tailwind classes for inputs ---
  const inputClasses = "w-full p-3 rounded-lg bg-input text-foreground border-2 border-border focus:ring-ring focus:ring-2 outline-none";
  const labelClasses = "block text-sm font-bold text-accent-foreground mb-2";
  
  return (
    // --- THIS IS THE NEW OVERLAY WRAPPER ---
    // It covers the screen, sits under the navbar (z-40),
    // and adds the blur effect. It's scrollable.
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black/80 backdrop-blur-sm">
      
      {/* --- Main Page Container --- */}
      {/* pt-32 adds padding to clear your fixed navbar */}
      <div className="w-full max-w-4xl mx-auto p-8 pt-32 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl text-coc-yellow font-bold">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="btn-3d btn-3d-orange px-6 py-2 rounded-lg text-white font-bold"
          >
            Log Out
          </button>
        </div>
        <p className="text-xl text-muted-foreground mb-8">Welcome, Superadmin!</p>
        
        <hr className="border-border opacity-30 my-8" />

        {/* --- Create Team Form --- */}
        <h2 className="text-3xl text-coc-yellow font-bold mb-4">Create New Team</h2>
        <form 
          onSubmit={handleCreateTeam}
          className="card-coc bg-card p-6 rounded-2xl flex flex-col md:flex-row items-end gap-6"
        >
          <div className="flex-grow w-full">
            <label className={labelClasses}>Team Name:</label>
            <input 
              type="text" 
              className={inputClasses}
              value={newTeamName} 
              onChange={(e) => setNewTeamName(e.target.value)} 
              required
            />
          </div>
          <div className="w-full md:w-48">
            <label className={labelClasses}>Initial Gems:</label>
            <input 
              type="number" 
              className={inputClasses}
              value={newTeamGems} 
              onChange={(e) => setNewTeamGems(parseInt(e.target.value))} 
            />
          </div>
          <button 
            type="submit" 
            className="btn-3d btn-3d-green px-6 py-3 rounded-lg text-white font-bold w-full md:w-auto"
          >
            Create Team
          </button>
        </form>
        
        <hr className="border-border opacity-30 my-12" />

        {/* --- Manage Existing Teams --- */}
        <h2 className="text-3xl text-coc-yellow font-bold mb-6">Manage Teams</h2>
        {loading ? (
          <p className="text-lg text-muted-foreground">Loading teams...</p>
        ) : (
          <div className="flex flex-col gap-6">
            {teams.map((team) => (
              <div key={team.id} className="card-coc bg-card p-6 rounded-2xl">
                
                <h4 className="text-2xl text-white font-bold mb-4">{team.name}</h4>
                
                {/* Update Gems Form */}
                <form 
                  onSubmit={(e) => handleUpdateGems(e, team.id)}
                  className="flex flex-col md:flex-row items-center gap-4 mb-4"
                >
                  <label className="text-lg text-accent-foreground font-semibold">Gems:</label>
                  <input 
                    type="number" 
                    className={`${inputClasses} flex-grow`}
                    value={updateGems[team.id] || 0} 
                    // Fixed the typo from e.g.target.value
                    onChange={(e) => handleGemChange(team.id, e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="btn-3d btn-3d-green px-5 py-3 rounded-lg text-white font-bold w-full md:w-auto"
                  >
                    Update Gems
                  </button>
                </form>
                
                {/* Delete Button */}
                <button 
                  onClick={() => handleDeleteTeam(team.id, team.name)}
                  className="btn-3d btn-3d-orange px-5 py-2 rounded-lg text-white font-bold"
                >
                  Delete "{team.name}"
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;