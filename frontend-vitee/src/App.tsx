import { Routes, Route } from 'react-router-dom';
import './App.css';

// --- Your New Public Pages ---
// (You will need to create these files)
import Index from "./pages/Index"; 
import RulebookPage from "./pages/Rulebook"; 
import NotFound from "./pages/NotFound"; 

// --- Our Existing Pages ---
import LeaderboardPage from './pages/LeaderboardPage'; // This is our original leaderboard
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Your New Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/rulebook" element={<RulebookPage />} />

      {/* Our Admin & Login Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      {/* Your Catch-All "Not Found" Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;