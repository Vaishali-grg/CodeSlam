// src/pages/LoginPage.tsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

// We'll import the global CSS here just to be explicit,
// although it's likely already loaded from main.tsx
import '../index.css'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Add type for the form event
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  // --- STYLING ---
  // Simple inline styles to help center the form.
  const pageStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'var(--background)', // Uses the --background from your CSS
  };

  // Some basic styles for the form layout
  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '8px',
    background: 'hsl(var(--input))', // Use your --input color
    color: 'hsl(var(--foreground))',
    border: '2px solid hsl(var(--border))',
  };

  const labelStyle: React.CSSProperties = {
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'hsl(var(--accent-foreground))',
  };
  // --- END STYLING ---


  return (
    // This div centers the login card on the page
    <div style={pageStyle}>
      
      {/* Use the "card-coc" class from your index.css */}
      <div className="card-coc" style={{ padding: '2rem' }}>
        
        {/* Use the font from your index.css */}
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          Admin Login
        </h2>
        
        <form onSubmit={handleLogin} style={formStyle}>
          
          <div>
            <label style={labelStyle}>Email:</label>
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Password:</label>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Use the "btn-3d" and "btn-3d-green" classes */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-3d btn-3d-green"
            style={{ 
              marginTop: '20px', 
              padding: '12px 0', 
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white',
              borderRadius: '12px' // Add border-radius to match button style
            }}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        
        </form>
      </div>
    </div>
  );
}

export default LoginPage;