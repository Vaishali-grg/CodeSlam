import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SuperuserLoginModal from "@/components/SuperuserLoginModal";
import Rulebook from "@/components/Rulebook";
import Footer from "@/components/Footer";
import TimerPage from "./Timer";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        // onSuperuserClick={() => setLoginModalOpen(true)}
        onLeaderboardClick={() => navigate('/leaderboard')}
        onRulebookClick={() => navigate('/rulebook')}
        onSuperuserClick={() => navigate('/admin')} 
      />
      
      <Hero 
        onViewLeaderboard={() => navigate('/leaderboard')}
        // onSuperuserLogin={() => setLoginModalOpen(true)}
        onSuperuserLogin={() => navigate('/admin')} 
      />
      
      {/* Full-size timer page shown directly after hero to lengthen the main page */}
      <TimerPage />

      <Rulebook />
      
      <Footer />
      
      <SuperuserLoginModal 
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
      />
    </div>
  );
};

export default Index;
