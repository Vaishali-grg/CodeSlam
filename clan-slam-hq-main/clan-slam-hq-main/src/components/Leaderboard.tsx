import { Trophy, Medal, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const Leaderboard = () => {
  const mockLeaderboard = [
    { rank: 1, name: "CodeWarrior", score: 2850, badge: "gold" },
    { rank: 2, name: "AlgoMaster", score: 2720, badge: "silver" },
    { rank: 3, name: "ByteKnight", score: 2650, badge: "bronze" },
    { rank: 4, name: "SyntaxSlayer", score: 2480, badge: "default" },
    { rank: 5, name: "LogicLord", score: 2350, badge: "default" },
    { rank: 6, name: "StackStorm", score: 2200, badge: "default" },
    { rank: 7, name: "CodeCrusader", score: 2100, badge: "default" },
    { rank: 8, name: "BugBane", score: 1980, badge: "default" },
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "gold": return <Trophy className="w-6 h-6 text-gold animate-glow-pulse" />;
      case "silver": return <Medal className="w-6 h-6 text-gray-400" />;
      case "bronze": return <Award className="w-6 h-6 text-amber-600" />;
      default: return null;
    }
  };

  return (
    <section id="leaderboard" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-6xl md:text-7xl font-black mb-4 text-coc-yellow text-coc-stroke uppercase">
            Hall of Champions
          </h2>
          <p className="text-2xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            The mightiest coders in the realm
          </p>
        </div>

        <div className="max-w-4xl mx-auto card-coc bg-gradient-to-b from-card to-secondary/80 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-coc-orange to-coc-orange-dark border-b-4 border-coc-yellow">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-black uppercase text-sm">Rank</th>
                  <th className="px-6 py-4 text-left text-white font-black uppercase text-sm">Warrior</th>
                  <th className="px-6 py-4 text-right text-white font-black uppercase text-sm">Score</th>
                  <th className="px-6 py-4 text-center text-white font-black uppercase text-sm">Honor</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboard.map((entry, index) => (
                  <tr 
                    key={entry.rank}
                    className="border-b-2 border-border hover:bg-coc-blue/10 transition-all"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`text-3xl font-black ${
                          entry.rank === 1 ? "text-coc-yellow" :
                          entry.rank === 2 ? "text-gray-300" :
                          entry.rank === 3 ? "text-amber-500" :
                          "text-white"
                        }`} style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
                          {entry.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-white text-lg">{entry.name}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-xl font-black text-coc-yellow">{entry.score.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {getBadgeIcon(entry.badge)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gradient-to-r from-coc-purple/30 to-coc-blue/30 px-6 py-5 text-center font-bold text-white border-t-4 border-coc-yellow" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Login to view complete rankings and your personal stats
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
