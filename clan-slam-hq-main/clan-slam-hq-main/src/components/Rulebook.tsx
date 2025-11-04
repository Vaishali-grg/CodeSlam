import { Card } from "@/components/ui/card";
import { BookOpen, Scroll, Swords } from "lucide-react";

const Rulebook = () => {
  const rules = [
    {
      title: "Rules of Engagement",
      icon: Swords,
      items: [
        "All submissions must be original code",
        "Algorithmic efficiency is paramount",
        "Time and space complexity will be evaluated",
        "Plagiarism results in immediate disqualification",
      ],
    },
    {
      title: "Battle Protocol",
      icon: Scroll,
      items: [
        "Each problem has specific time limits",
        "Partial solutions earn partial points",
        "Edge cases must be handled correctly",
        "Code readability influences scoring",
      ],
    },
    {
      title: "Scoring System",
      icon: BookOpen,
      items: [
        "Correctness: 50 points maximum",
        "Efficiency: 30 points maximum",
        "Code quality: 20 points maximum",
        "Bonus points for exceptional solutions",
      ],
    },
  ];

  return (
    <section id="rulebook" className="py-24 relative bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-6xl md:text-7xl font-black mb-4 text-coc-yellow text-coc-stroke uppercase">
            The Codex
          </h2>
          <p className="text-2xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Sacred laws of the algorithmic battlefield
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {rules.map((section, index) => (
            <div 
              key={index}
              className="card-coc bg-gradient-to-b from-card to-secondary p-8 hover:scale-105 transition-transform"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-coc-orange to-coc-orange-dark flex items-center justify-center mb-4 border-4 border-coc-yellow shine" style={{ boxShadow: '0 6px 0 hsl(20 100% 35%), 0 8px 20px rgba(0,0,0,0.5)' }}>
                  <section.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-coc-yellow uppercase" style={{ textShadow: '2px 2px 0 #fff, -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333' }}>{section.title}</h3>
              </div>
              
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="flex items-start gap-3 text-white font-medium"
                  >
                    <span className="text-coc-orange font-black text-xl mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rulebook;
