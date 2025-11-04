import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuperuserLoginModal from "@/components/SuperuserLoginModal";

type Section = {
  id: string;
  title: string;
  lead: string;
  points: string[];
  tip?: string;
};

const sections: Section[] = [
  {
    id: 'overview',
    title: 'Overview',
    lead: 'The Grand Code Off — quick facts and TL;DR',
    points: [
      'What: Two-day frontend hackathon inspired by Clash of Clans — design + code challenge.',
      'Team size: 2–4 members (individuals may join as free agents & form teams before submission).',
      'Deliverable: Front-end project built from provided PSD template and assets.',
      'Deadline: Complete & submit by 3:00 PM, 16th September 2024.',
      'Submission: Public GitHub repo only. Repo name format: [TeamNumber]_[TeamName]_CodeSlam_IEEE_CIET.',
      'Google Form: Fill the form and paste your repo link to validate submission.',
      'Mini games: Earn extra points (Gems) via activities during Day-1.',
      'Authority: The Grand Warden (organisers) enforces rules — breaking rules may lead to penalties or disqualification.',
      'Shortlisting: Top 16 teams chosen based on Day-1 frontend quality.'
    ],
    tip: 'Quick tip: Keep commits frequent — judges may check commit history during shortlisting.'
  },
  {
    id: 'submission',
    title: 'Submission & Deadlines',
    lead: 'Repo rules & what to submit',
    points: [
      'Deadline: Final submission by 3:00 PM, 16th September 2024.',
      'Repo: Public GitHub only — no other submission channels accepted.',
      'Repo name: [TeamNumber]_[TeamName]_CodeSlam_IEEE_CIET. Follow this EXACT format.',
      'Structure: Include a top-level /submission folder with final build, README, and screenshots.',
      'README: Must include team member names, roles, brief project description, and build/run steps.',
      'Proof: Keep visible commit history — it is used as evidence of work and for tie-breakers.'
    ],
    tip: 'Note: Late submissions may be penalised or excluded — don’t risk it.'
  },
  {
    id: 'gems',
    title: 'Gems & Mini Games',
    lead: 'How to earn & spend Gems (in-game currency)',
    points: [
      'Earn Gems — perform social tasks and mini-challenges during Day-1: Instagram Story or LinkedIn post: +3 Gems, Instagram Reel: +6 Gems.',
      'Mini-game rewards: Clan War — Top 16 teams: +3 Gems each.',
      'Quiz rewards: 1st — 5 Gems, 2nd — 3 Gems, 3rd — 2 Gems.',
      'Guess-the-song: +2 Gems per correct guess.',
      'Spend Gems — use Gems during Clan War for advantages such as: buy hints, pause the timer (Time Freeze), swap or skip a question.',
      'Fair play: Gems awarded for genuine activity only. Attempts to game the system (bots, fake accounts) will lead to penalties.'
    ],
    tip: 'Use Gems strategically — they can change the tide in Clan War.'
  },
  {
    id: 'relay',
    title: 'Code Relay Knockout',
    lead: 'Format, spells & bidding (how the showdown works)',
    points: [
      'Overview: Top 16 teams enter Clan War — starts with a bidding round, then Code Relay Knockout (4 rounds).',
      'Relay mechanics: Each round is collaborative — team members take turns every 3 minutes to continue the solution.',
      'Switching mid-turn or unauthorised swaps are NOT allowed.',
      'First 2 rounds allow usage of Spells (bidding with Gems).',
      'Available Spells (examples): Clue Spell (hint), Time Freeze (pause 1m30s), Swap Quest (change question), Skip Turn (skip current turn).',
      'Warning: Misuse of spells (incorrect flow or cheating) will forfeit the spell or lead to penalties.',
      "Scoring: Correctness, efficiency, UI/UX, and time taken are considered. Judges' decisions are final."
    ],
    tip: 'Pro tip: Practice relay-style coding with your team to get the handoff timings right.'
  },
  {
    id: 'judging',
    title: 'Judging & Prizes',
    lead: 'Criteria and tie-break rules',
    points: [
      'Primary criteria: Functionality & correctness (50%), UI/UX (25%), code quality (15%), creativity (10%).',
      'Judges: Panel includes faculty and industry — their decisions are final.',
      'Tie-breaker: Judges evaluate commit history, code quality, and may run an on-the-spot challenge to decide.',
      'Prizes: Gems and other prizes awarded to winners and mini-game champions as listed earlier.'
    ],
    tip: 'Pro tip: Maintain a clean commit history and short, clear commit messages — it helps during tie-breaks.'
  },
  {
    id: 'contact',
    title: 'Contact Information',
    lead: 'Organisers & support',
    points: [
      'Sparsh Mittal — IEEE Chairperson: +91 82640 96826',
      'Harsh Kumar Sahu — IEEE Vice Chairperson: +91 79858 45884',
      'Sarthak Sadhotra — WIE Chairperson: +91 80828 03360',
      'Khushleen Kaur Sekhon — WIE Vice Chairperson: +91 70874 73219',
      'Email: ieee@chitkara.edu.in'
    ],
    tip: 'Need urgent help? Use the Support button in the HUD or call any organiser above.'
  }
];

export default function RulebookPage(){
  const [active, setActive] = useState<string>('overview');
  const [mobileTOC, setMobileTOC] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(()=>{
    const onScroll = ()=>{
      const offsets = sections.map(s=>{
        const el = document.getElementById(s.id);
        if(!el) return {id:s.id, top: Infinity};
        return { id: s.id, top: Math.abs(el.getBoundingClientRect().top) };
      });
      offsets.sort((a,b)=>a.top-b.top);
      setActive(offsets[0].id);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);

  const scrollTo = (id:string)=>{
    setMobileTOC(false);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block: 'start'});
  };

  const toggle = (id:string)=>{
    setExpanded(e=> ({ ...e, [id]: !e[id] }));
    // ensure section is visible when expanded
    setTimeout(()=> scrollTo(id), 120);
  };

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white bg-gradient-to-b from-[#02050a] to-[#041327]">

      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0">
          <img src="/assets/coc-bg.jpg" alt="bg" className="w-full h-full object-cover opacity-60 transform-gpu will-change-transform" style={{transform: 'scale(1.08)'}} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(rgba(255,200,80,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px', animation: 'moveUp 60s linear infinite'}}> </div>
        </div>
        <style>{`@keyframes moveUp { from { transform: translateY(0);} to { transform: translateY(-1200px);} }`}</style>
      </div>

      <header className="max-w-7xl mx-auto px-6 pt-6 z-30 relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src="/assets/coc-banner.png" alt="CodeSlam" className="h-16 w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"/>
            <div className="absolute -right-2 -bottom-2 bg-gradient-to-r from-yellow-400 to-red-500 px-2 py-1 rounded-full text-black text-xs font-bold animate-pulse">LIVE</div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">CodeSlam — Official Rulebook</h1>
            <p className="text-xs text-yellow-300/90 mt-1 uppercase tracking-widest">Frontend PvP · Clan Wars · Gems & Spells</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-black/30 border border-yellow-900/20 rounded-2xl px-3 py-2 shadow-2xl backdrop-blur-sm">
            <img src="/assets/gems-icon.svg" alt="gems" className="h-8 w-8" />
            <div className="text-sm">
              <div className="text-xs text-gray-300">Your Gems</div>
              <div className="text-lg font-bold">18</div>
            </div>
          </div>
          <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold shadow-xl">Register</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-30">

        <nav className="hidden lg:block lg:col-span-3 sticky top-28 h-[calc(100vh-6rem)] overflow-auto">
          <div className="p-4 rounded-2xl bg-black/30 border border-yellow-900/10 shadow-lg backdrop-blur-sm">
            <h3 className="text-sm text-yellow-300 font-bold">Contents</h3>
            <ul className="mt-4 space-y-2">
              {sections.map(s=> (
                <li key={s.id}>
                  <button onClick={()=>scrollTo(s.id)} className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center gap-2 ${active===s.id ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-black font-semibold shadow-md' : 'hover:bg-white/5'}`}>
                    <span className="w-2 h-2 rounded-full" style={{background: active===s.id ? '#04060a' : 'linear-gradient(90deg,#ffd36b,#ff6b6b)'}}></span>
                    <span className="text-sm">{s.title}</span>
                    <span className="ml-auto text-xs text-gray-300">{expanded[s.id] ? 'Hide' : 'See'}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button onClick={()=>{const el=document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'});}} className="w-full py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold">Contact Organisers</button>
            </div>
          </div>
        </nav>

        <section className="lg:col-span-6 space-y-4">

          <div className="lg:hidden sticky top-20 z-40">
            <div className="flex items-center justify-between bg-black/30 border border-yellow-900/10 p-3 rounded-2xl">
              <div className="text-sm font-bold">Contents</div>
              <button onClick={()=>setMobileTOC(!mobileTOC)} className="px-3 py-1 rounded bg-white/5">{mobileTOC ? 'Hide' : 'Open'}</button>
            </div>
            {mobileTOC && (
              <div className="mt-2 p-3 rounded-2xl bg-black/20 border border-yellow-900/8 space-y-2">
                {sections.map(s=> <button key={s.id} className="w-full text-left py-2 px-2 rounded hover:bg-white/5 flex items-center justify-between" onClick={()=> toggle(s.id) }>{s.title} <span className="text-xs text-gray-300">{expanded[s.id] ? 'Hide' : 'See'}</span></button>)}
              </div>
            )}
          </div>

          {sections.map(sec=> (
            <motion.article key={sec.id} id={sec.id} layout initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="p-4 rounded-2xl bg-gradient-to-b from-black/40 to-black/20 border border-yellow-900/10 shadow-lg hover-glow">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-yellow-300">{sec.title}</h3>
                    <div className="text-xs text-gray-300">{sec.lead}</div>
                  </div>

                  <div className="mt-3">
                    <button onClick={()=>toggle(sec.id)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-yellow-900/10 text-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${expanded[sec.id] ? 'rotate-180' : ''}`}>
                        <path d="M6 9l6 6 6-6" stroke="#FFD36B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{expanded[sec.id] ? 'Hide details' : 'See details'}</span>
                    </button>
                  </div>

                  {expanded[sec.id] && (
                    <motion.div layout initial={{opacity:0}} animate={{opacity:1}} className="mt-4 text-sm text-gray-100">
                      <ul className="list-disc ml-5 space-y-2">
                        {sections.find(s=>s.id===sec.id)?.points.map((p, idx)=> (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>

                      <div className="mt-3 p-3 bg-black/20 rounded border border-yellow-900/10 text-sm">
                        <strong>Note:</strong> {sections.find(s=>s.id===sec.id)?.tip}
                      </div>
                    </motion.div>
                  )}

                </div>

                <div className="w-28 flex-shrink-0 flex flex-col items-end gap-2">
                  <div className="p-2 rounded bg-black/30 border border-yellow-900/10 text-xs">Section</div>
                  <div className="h-10 w-10 rounded-lg bg-black/30 border border-yellow-900/10 flex items-center justify-center">⚔</div>
                </div>
              </div>
            </motion.article>
          ))}

        </section>

        <aside className="lg:col-span-3 sticky top-28 space-y-6 h-[calc(100vh-7rem)] overflow-auto">
          <div className="p-4 rounded-2xl bg-black/40 border border-yellow-900/10 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-yellow-300 font-bold">Event Status</h4>
                <p className="text-xs text-gray-300 mt-1">Clan War begins in</p>
              </div>
              <div className="text-2xl font-extrabold">01:12:45</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="py-2 rounded-lg bg-black/30 border border-yellow-900/10">Spectate</button>
              <button className="py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white">Create Clan</button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-black/30 to-black/10 border border-yellow-900/10 shadow-inner">
            <h4 className="text-yellow-300 font-bold">Quick Tips</h4>
            <ul className="mt-3 text-sm text-gray-200 space-y-2">
              <li>Keep your GitHub public and push early — commits are evidence of work.</li>
              <li>Use Gems strategically during Clan War rounds.</li>
              <li>Follow repo naming exactly to avoid disqualification.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-yellow-900/10 text-center">
            <h4 className="font-bold text-yellow-300">Contact</h4>
            <p className="text-sm text-gray-200 mt-2">Sparsh Mittal: +91 82640 96826</p>
            <p className="text-sm text-gray-200">Harsh Kumar Sahu: +91 79858 45884</p>
            <p className="text-sm text-yellow-200 mt-2">Email: ieee@chitkara.edu.in</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold text-center">Join Now</div>
        </aside>

      </main>

      <footer className="text-center py-8 text-sm text-gray-400 relative z-30">© 2025 CodeSlam · Powered by IEEE CIET</footer>

      <style>{`
        .shadow-inner { box-shadow: inset 0 8px 30px rgba(0,0,0,0.6); }
        .backdrop-blur-sm { backdrop-filter: blur(6px); }
        .hover-glow:hover { box-shadow: 0 8px 40px rgba(255,180,60,0.12); transform: translateY(-3px); }
      `}</style>

    </div>
  );
}
