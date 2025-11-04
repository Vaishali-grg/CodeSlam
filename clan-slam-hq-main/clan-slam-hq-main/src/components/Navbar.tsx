import { Shield, Trophy, BookOpen } from "lucide-react";
import crestEmblem from "@/assets/crest-emblem.png";

interface NavbarProps {
  onSuperuserClick: () => void;
  onLeaderboardClick: () => void;
  onRulebookClick: () => void;
}

const Navbar = ({ onSuperuserClick, onLeaderboardClick, onRulebookClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/98 to-background/95 backdrop-blur-md border-b-4 border-coc-orange shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={crestEmblem} alt="IEEE Code Slam Crest" className="w-14 h-14 bounce-float" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }} />
            <div>
              <h1 className="text-2xl font-black text-coc-yellow uppercase" style={{ textShadow: '2px 2px 0 #fff, -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333' }}>CODE SLAM</h1>
              <p className="text-xs text-coc-orange font-bold uppercase tracking-wider">IEEE Chapter</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onLeaderboardClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-coc-blue/20 border-2 border-coc-blue text-white font-bold hover:bg-coc-blue/40 transition-all"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </button>
            <button 
              onClick={onRulebookClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-coc-purple/20 border-2 border-coc-purple text-white font-bold hover:bg-coc-purple/40 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Rulebook
            </button>
            <button 
              onClick={onSuperuserClick}
              className="btn-3d btn-3d-green text-white font-black px-6 py-2 rounded-xl uppercase text-sm flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
