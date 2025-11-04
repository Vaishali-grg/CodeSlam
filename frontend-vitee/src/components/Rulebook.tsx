import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Zap, Trophy, Code } from "lucide-react";

export default function Rulebook() {
  const highlights = [
    {
      title: "Study the Codex",
      icon: BookOpen,
      desc: "Learn the sacred laws of CodeSlam — only those who know the rules can master the battlefield.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Master Your Spells",
      icon: Zap,
      desc: "Use your powers — Hint, Freeze, Swap, Skip — at the perfect moment to outsmart your rivals.",
      color: "from-purple-500 to-fuchsia-600",
    },
    {
      title: "Battle for Glory",
      icon: Code,
      desc: "Solve algorithmic challenges, defend your clan, and rise in the leaderboard of legends.",
      color: "from-green-400 to-emerald-600",
    },
    {
      title: "Earn Eternal Fame",
      icon: Trophy,
      desc: "The greatest coders will be etched forever in the Codex Hall of Fame. Read the Rulebook to prepare!",
      color: "from-amber-500 to-red-500",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#140b05] via-[#2a190c] to-[#000] py-24 overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.15),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10 text-center mb-16">
        <h2 className="text-6xl md:text-7xl font-black text-yellow-400 drop-shadow-[4px_4px_0_#000] uppercase tracking-wider">
          The Codex
        </h2>
        <p className="text-2xl text-white opacity-90 font-semibold">
          Glimpse the ancient rules of CodeSlam — then read the full Rulebook to uncover them all.
        </p>
        <div className="w-48 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-4 rounded-full" />
      </div>

      {/* Highlight Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {highlights.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -6 }}
              className={`relative rounded-3xl bg-gradient-to-b ${item.color} p-1 shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all`}
            >
              <div className="rounded-3xl bg-[linear-gradient(180deg,#3a240c,#1b0f06)] h-full p-8 flex flex-col justify-between text-center border-2 border-yellow-400/40">
                <div className="flex flex-col items-center space-y-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center border-4 border-yellow-300 shadow-[0_6px_0_#5c2d00,0_8px_20px_rgba(0,0,0,0.5)]">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-yellow-300 uppercase drop-shadow-[2px_2px_0_#000]">
                    {item.title}
                  </h3>
                  <p className="text-white/90 font-medium text-sm leading-snug px-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <RulebookCTA />
        <p className="text-yellow-200 mt-4 text-sm opacity-70">
          Know the details, understand the laws, and lead your clan to victory.
        </p>
      </div>

      <style jsx>{`
        .animate-glow {
          animation: glow 1.5s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(255, 200, 0, 0.3),
              0 0 30px rgba(255, 170, 0, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 220, 100, 0.8),
              0 0 60px rgba(255, 200, 0, 0.5);
          }
        }
      `}</style>
    </section>
  );
}

function RulebookCTA(){
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate('/rulebook')}
      className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-[#3b2209] font-extrabold px-10 py-4 rounded-2xl text-xl border-4 border-yellow-300 shadow-[0_6px_0_#5c2d00,0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,200,0,0.5)] transition-all"
    >
      📜 Read Full Rulebook
    </motion.button>
  );
}
