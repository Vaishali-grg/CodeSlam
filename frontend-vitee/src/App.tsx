import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Index from "./pages/Index";
import LeaderboardPage from "./pages/Leaderboard";
import RulebookPage from "./pages/Rulebook";
import TimerPage from "./pages/Timer";
import NotFound from "./pages/NotFound";

import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Index />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/rulebook" element={<RulebookPage />} />
          <Route path="/timer" element={<TimerPage />} />

          {/*Other Routes*/}
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
