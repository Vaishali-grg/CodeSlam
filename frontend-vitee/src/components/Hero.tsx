import { Trophy } from "lucide-react";
import heroCocBright from "@/assets/hero-coc-bright.jpg";
import bgImage from "@/assets/bg wallpaper.jpg";

interface HeroProps {
  onViewLeaderboard: () => void;
  onSuperuserLogin: () => void;
}

const Hero = ({ onViewLeaderboard, onSuperuserLogin }: HeroProps) => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0" />

      <div className="relative z-10 px-6 mt-20 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white uppercase tracking-widest drop-shadow-[0_6px_6px_rgba(0,0,0,0.6)]">
          Lead Your Clan to Glory
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 font-medium mb-10">
          Compete. Code. Conquer.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={onViewLeaderboard}
            className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-black font-extrabold px-10 py-4 rounded-xl border-2 border-yellow-700 shadow-[0_6px_0_#b45309] hover:translate-y-[3px] transition-all flex items-center gap-3 text-lg uppercase"
          >
            <Trophy className="w-6 h-6" /> View Leaderboard
          </button>
          {/* <button
            onClick={onSuperuserLogin}
            className="bg-gradient-to-b from-green-400 to-green-600 text-black font-extrabold px-10 py-4 rounded-xl border-2 border-green-700 shadow-[0_6px_0_#15803d] hover:translate-y-[3px] transition-all flex items-center gap-3 text-lg uppercase"
          >
            <Shield className="w-6 h-6" /> Superuser Login
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
