import { Shield, Trophy, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import crestEmblem from "@/assets/crest-emblem.png";

interface NavbarProps {
  onSuperuserClick: () => void;
  onLeaderboardClick: () => void;
  onRulebookClick: () => void;
}

const Navbar = ({ onSuperuserClick, onLeaderboardClick, onRulebookClick }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b-4 border-yellow-500 shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all duration-300">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src={crestEmblem}
            alt="IEEE Code Slam Crest"
            className="w-12 h-12 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          />
          <h1 className="text-2xl font-extrabold text-white uppercase tracking-widest">
            CODE SLAM
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavButton label="Leaderboard" icon={<Trophy className="w-4 h-4" />} onClick={onLeaderboardClick} />
          <NavButton label="Rulebook" icon={<BookOpen className="w-4 h-4" />} onClick={onRulebookClick} />
          {/* <NavButton label="Login" icon={<Shield className="w-4 h-4" />} onClick={onSuperuserClick} primary /> */}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md bg-yellow-500/20 hover:bg-yellow-500/40 transition-all"
        >
          {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-6 py-4 bg-black/95 border-t border-yellow-500 animate-fadeIn">
          <NavButton label="Leaderboard" icon={<Trophy className="w-4 h-4" />} onClick={() => { onLeaderboardClick(); setMenuOpen(false); }} />
          <NavButton label="Rulebook" icon={<BookOpen className="w-4 h-4" />} onClick={() => { onRulebookClick(); setMenuOpen(false); }} />
          {/* <NavButton label="Login" icon={<Shield className="w-4 h-4" />} onClick={() => { onSuperuserClick(); setMenuOpen(false); }} primary /> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/* 🔹 Reusable Button Component */
const NavButton = ({
  label,
  icon,
  onClick,
  primary = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) => {
  const base = `flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-semibold uppercase text-sm tracking-wide transition-all`;
  const style = primary
    ? `bg-gradient-to-b from-yellow-400 to-yellow-600 text-black border-2 border-yellow-700 shadow-[0_4px_0_#b45309] hover:translate-y-[1px]`
    : `text-white hover:text-yellow-400`;
  return (
    <button onClick={onClick} className={`${base} ${style}`}>
      {icon}
      {label}
    </button>
  );
};
