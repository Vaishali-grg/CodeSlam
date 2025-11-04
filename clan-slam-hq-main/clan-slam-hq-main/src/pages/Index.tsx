import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Leaderboard from "@/components/Leaderboard";
import SuperuserLoginModal from "@/components/SuperuserLoginModal";
import Rulebook from "@/components/Rulebook";
import Instructions from "@/components/Instructions";
import Footer from "@/components/Footer";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSuperuserClick={() => setLoginModalOpen(true)}
        onLeaderboardClick={() => scrollToSection("leaderboard")}
        onRulebookClick={() => scrollToSection("rulebook")}
      />
      
      <Hero 
        onViewLeaderboard={() => scrollToSection("leaderboard")}
        onSuperuserLogin={() => setLoginModalOpen(true)}
      />
      
      <Leaderboard />
      
      <Rulebook />
      
      <Instructions />
      
      <Footer />
      
      <SuperuserLoginModal 
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
      />
    </div>
  );
};

export default Index;
