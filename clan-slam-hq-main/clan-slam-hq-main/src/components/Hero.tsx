import { Trophy, Shield } from "lucide-react";
import heroCocBright from "@/assets/hero-coc-bright.jpg";

interface HeroProps {
  onViewLeaderboard: () => void;
  onSuperuserLogin: () => void;
}

const Hero = ({ onViewLeaderboard, onSuperuserLogin }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 parallax-bg opacity-70"
        style={{ backgroundImage: `url(${heroCocBright})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-0" />
      
      <div className="container mx-auto px-4 py-32 relative z-10 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-7xl md:text-9xl font-black mb-8 text-coc-yellow text-coc-stroke leading-none bounce-float uppercase">
            CODE SLAM
          </h1>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-coc-stroke">
            Battle of Algorithms
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-white mb-16 max-w-2xl mx-auto" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Compete. Code. Conquer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              onClick={onViewLeaderboard}
              className="btn-3d btn-3d-orange text-white font-black text-xl px-12 py-6 rounded-2xl uppercase tracking-wide shine flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform"
            >
              <Trophy className="w-6 h-6" />
              View Leaderboard
            </button>
            <button 
              onClick={onSuperuserLogin}
              className="btn-3d btn-3d-green text-white font-black text-xl px-12 py-6 rounded-2xl uppercase tracking-wide shine flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform"
            >
              <Shield className="w-6 h-6" />
              Superuser Login
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bounce-float">
        <div className="w-8 h-12 border-4 border-white rounded-full flex justify-center p-1.5 bg-coc-orange/30" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <div className="w-2 h-4 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
