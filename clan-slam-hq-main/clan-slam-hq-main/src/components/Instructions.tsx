import { Card } from "@/components/ui/card";
import { Shield, BookOpen, Code, Trophy } from "lucide-react";

const Instructions = () => {
  const steps = [
    {
      icon: Shield,
      title: "Login as Superuser",
      description: "Access the fortress command center with your superuser credentials",
    },
    {
      icon: BookOpen,
      title: "Review the Codex",
      description: "Study the rules, scoring system, and battle protocols carefully",
    },
    {
      icon: Code,
      title: "Submit Solutions",
      description: "Deploy your algorithms and watch them conquer the challenges",
    },
    {
      icon: Trophy,
      title: "Earn Glory",
      description: "Climb the leaderboard and claim your place among champions",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-6xl md:text-7xl font-black mb-4 text-coc-yellow text-coc-stroke uppercase">
            Battle Instructions
          </h2>
          <p className="text-2xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Your path to algorithmic victory
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="card-coc bg-gradient-to-b from-card to-secondary p-6 hover:scale-105 transition-transform relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute top-0 right-0 text-9xl font-black text-coc-yellow/10 -mr-4 -mt-4" style={{ textShadow: '4px 4px 0 rgba(255,255,255,0.05)' }}>
                {index + 1}
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coc-green to-coc-green-light flex items-center justify-center mb-4 border-4 border-white/20 group-hover:scale-110 transition-transform" style={{ boxShadow: '0 6px 0 hsl(135 70% 25%), 0 8px 20px rgba(0,0,0,0.5)' }}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-black text-coc-yellow mb-3 uppercase" style={{ textShadow: '2px 2px 0 #fff, -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333' }}>{step.title}</h3>
                <p className="text-white font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructions;
