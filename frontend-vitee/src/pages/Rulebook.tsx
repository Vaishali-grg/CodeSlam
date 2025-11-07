import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";


// Kept your component imports
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import SuperuserLoginModal from "@/components/SuperuserLoginModal";

// --- START: NEW HOOK FOR TIMER LOGIC ---
const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  if (countDown < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
};


const formatTimePart = (num: number) => num.toString().padStart(2, '0');


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
      'Deadline: Complete & submit by 3:00 PM, 11th November 2025.',
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
      'Deadline: Final submission by 3:00 PM, 11th November 2025.',
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
      'Khushleen Kaur Sekhon — IEEE-CIET Chairperson: +91 70874 73219',
      'Karunya Gupta— IEEE-WIE Chairperson: +91 98059 46982',
      'Email: ieee@chitkara.edu.in'
    ],
    tip: 'Need urgent help? Use the Support button in the HUD or call any organiser above.'
  }
];

const TARGET_DATE = '2025-11-10T15:00:00';

export default function RulebookPage() {
  const [active, setActive] = useState<string>('overview');
  const [mobileTOC, setMobileTOC] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ overview: true });

  const { days, hours, minutes, seconds, isExpired } = useCountdown(TARGET_DATE);

  useEffect(() => {
    const onScroll = () => {
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        return { id: s.id, top: Math.abs(elCenter - viewCenter) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets.length > 0) {
        setActive(offsets[0].id);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileTOC(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggle = (id: string) => {
    setExpanded(e => ({ ...e, [id]: !e[id] }));
  };

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const sectionUnfurl = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const juicyButton = {
    hover: { scale: 1.05, textShadow: "0 0 8px #fff" },
    tap: { scale: 0.95 }
  };

  const countdownDisplay = isExpired
    ? 'EVENT HAS BEGUN'
    : `${formatTimePart(days)}:${formatTimePart(hours)}:${formatTimePart(minutes)}:${formatTimePart(seconds)}`;


  return (
    <div className="rulebook-page">
      <div className="animated-bg">
        <div className="animated-bg-image" />
        <div className="animated-bg-overlay" />
        <div className="animated-bg-particles" />
      </div>
      
      {/* --- Main Header --- */}
      <motion.header 
        className="rulebook-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="header-logo">
          
          <Link to="/" className="back-button">
                <img src="crest-emblem.png" alt="CodeSlam Banner" />
          <div className="logo-text">
            <h1>Official Rulebook</h1>
            <p>Frontend PvP · Clan Wars · Gems & Spells</p>
          </div>
          </Link>
        </div>
        {/* <div className="header-actions">
          <div className="gems-counter">
            <motion.img 
              src="/assets/gems-icon.svg" 
              alt="gems"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
            <div className="gems-text">
              <span>Your Gems</span>
              <strong>18</strong>
            </div>
          </div>
          <motion.button 
            className="register-btn"
            variants={juicyButton}
            whileHover="hover"
            whileTap="tap"
          >
            Register
          </motion.button>
        </div> */}
      </motion.header>

      {/* --- Mobile TOC Toggle --- */}
      <button 
        className="mobile-toc-toggle"
        onClick={() => setMobileTOC(!mobileTOC)}
      >
        {mobileTOC ? 'Hide Rules' : 'Show Rules'}
      </button>

      {/* --- Main Content Grid --- */}
      <main className="rulebook-main">
        
        {/* --- Left TOC (Wood Panel) --- */}
        <motion.nav 
          className={`toc-nav ${mobileTOC ? 'mobile-visible' : ''}`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Rulebook Sections</h3>
          <ul>
            {sections.map(s => (
              <li key={s.id}>
                <motion.button
                  onClick={() => scrollTo(s.id)}
                  className={active === s.id ? 'active' : ''}
                  variants={juicyButton}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="toc-icon">⚔️</span>
                  {s.title}
                </motion.button>
              </li>
            ))}
          </ul>
          <div className="toc-footer">
            <motion.button 
              className="contact-btn"
              onClick={() => scrollTo('contact')}
              variants={juicyButton}
              whileHover="hover"
              whileTap="tap"
            >
              Contact Organisers
            </motion.button>
          </div>
        </motion.nav>

        {/* --- Center Content (Parchment Scroll) --- */}
        <motion.section 
          className="content-scroll"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {sections.map(sec => (
            <article className="rulebook-section" id={sec.id} key={sec.id}>
              <motion.div 
                className="section-header" 
                onClick={() => toggle(sec.id)}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              >
                <div className="section-header-text">
                  <h3>{sec.title}</h3>
                  <p>{sec.lead}</p>
                </div>
                <motion.div 
                  className="section-chevron"
                  animate={{ rotate: expanded[sec.id] ? 180 : 0 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {expanded[sec.id] && (
                  <motion.div 
                    className="section-content"
                    // variants={sectionUnfurl}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ul>
                      {sec.points.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                    {sec.tip && (
                      <div className="section-tip">
                        <strong>Pro Tip:</strong> {sec.tip}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          ))}
        </motion.section>

        {/* --- Right Sidebar (Stone Tablet) --- */}
        <motion.aside 
          className="sidebar"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* <div className="sidebar-widget">
            <h4>Event Status</h4>
            <p>Clan War begins in</p>
            <div className={`countdown ${isExpired ? 'expired' : ''}`}>{countdownDisplay}</div> 

          </div> */}
          
          {/* <div className="sidebar-widget">
            <h4>Quick Tips</h4>
            <ul>
              <li>Push commits early and often.</li>
              <li>Use Gems strategically in Clan War.</li>
              <li>Follow repo naming CORRECTLY.</li>
            </ul>
          </div> */}
          <div className="sidebar-widget">
            <h4>Contact</h4>
            <h5 className="font-bold text-white text-sm mb-1">Event Cordinators</h5>
            <ul>
              <p>Sparsh Mittal: <span className="text-[#ffb300]">+91 82640 96826</span></p>
              <p>Harsh Kumar Sahu: <span className="text-[#ffb300]">+91 79858 45884</span></p>
              <p className="mt-1">
                Email: <span className="text-[#ffb300]">ieee@chitkara.edu.in</span>
              </p>
            </ul>
          </div>

          
        </motion.aside>

      </main>

      <footer className="rulebook-footer">
        © 2025 CodeSlam · Powered by IEEE CIET
      </footer>

      {/* --- This is where all the new CSS lives --- */}
      <style>{`
        /* --- Font Imports --- */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Open+Sans:wght@400;600&display=swap');

        /* --- CoC Theme Variables --- */
        :root {
          --font-fantasy: 'Cinzel', serif;
          --font-body: 'Open Sans', sans-serif;
          --coc-gold: #FFD700;
          --coc-gold-dark: #DAA520;
          --coc-red: #FF4136;
          --coc-parchment: #FDF5E6;
          --coc-wood: #8B4513;
          --coc-stone: #4A4A4A;
          --text-dark: #3a2a1a;
          --text-light: #ffffff;
        }

        /* --- Base Page Style --- */
        .rulebook-page {
          min-height: 100vh;
          font-family: var(--font-body);
          color: var(--text-light);
          overflow-x: hidden; /* Prevent horizontal scroll */
        }

        /* --- Animated Background --- */
        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .animated-bg-image {
          position: absolute;
          inset: 0;
          background: url('/assets/coc-bg.jpg') no-repeat center center/cover;
          opacity: 0.6;
        }
        .animated-bg-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(2,5,10,0.4) 0%, rgba(4,19,39,0.9) 100%);
        }
        .animated-bg-particles {
          position: absolute;
          inset: 0;
          background-image: url('https://www.transparenttextures.com/patterns/black-felt.png');
          animation: moveUp 60s linear infinite;
          opacity: 0.1;
        }
        @keyframes moveUp {
          from { background-position-y: 0; }
          to { background-position-y: -1200px; }
        }

        /* --- Header --- */
        .rulebook-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2.5rem;
          background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
          position: relative;
          z-index: 50;
        }
        .header-logo {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .header-logo img {
          height: 4.5rem; /* 72px */
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
        }
        .logo-text h1 {
          font-family: var(--font-fantasy);
          font-size: 2rem; /* 32px */
          color: var(--coc-gold);
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          margin: 0;
        }
        .logo-text p {
          font-size: 0.8rem;
          color: var(--coc-gold-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .gems-counter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0,0,0,0.4);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          border: 2px solid rgba(255,215,0,0.3);
        }
        .gems-counter img {
          height: 2rem; /* 32px */
        }
        .gems-text {
          line-height: 1;
        }
        .gems-text span {
          font-size: 0.75rem;
          color: var(--coc-gold-dark);
        }
        .gems-text strong {
          font-size: 1.25rem;
          color: var(--text-light);
        }
        .register-btn {
          font-family: var(--font-fantasy);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-dark);
          background: linear-gradient(180deg, var(--coc-gold) 0%, var(--coc-gold-dark) 100%);
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: 2px solid #FAD65A;
          border-bottom: 4px solid #B8860B;
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
          cursor: pointer;
        }

        /* --- Main Layout --- */
        .rulebook-main {
          display: grid;
          grid-template-columns: 2fr 5fr 2fr; /* 3-column layout */
          gap: 2.5rem;
          padding: 1.5rem 2.5rem;
          position: relative;
          z-index: 10;
        }

        /* --- TOC (Wood Panel) --- */
        .toc-nav {
          position: sticky;
          top: 2rem;
          height: calc(100vh - 4rem);
          background: #6B4226 url('https://www.transparenttextures.com/patterns/wood-plank.png');
          border: 4px solid #4A2D1B;
          border-radius: 0.75rem;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.5);
          padding: 1.5rem;
          overflow-y: auto;
        }
        .toc-nav h3 {
          font-family: var(--font-fantasy);
          font-size: 1.25rem;
          color: var(--coc-gold);
          text-shadow: 0 2px 2px #000;
          text-align: center;
          border-bottom: 2px solid var(--coc-gold-dark);
          padding-bottom: 1rem;
        }
        .toc-nav ul {
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
        }
        .toc-nav button {
          font-family: var(--font-fantasy);
          font-size: 1rem;
          color: #FDECB3;
          background: transparent;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          width: 100%;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        .toc-nav button:hover {
          background: rgba(0,0,0,0.2);
        }
        .toc-nav button.active {
          background: var(--coc-gold-dark);
          color: var(--text-dark);
          font-weight: 700;
          box-shadow: inset 0 3px 5px rgba(0,0,0,0.3);
          transform: scale(1.02);
        }
        .toc-nav .toc-icon {
          opacity: 0.5;
        }
        .toc-nav button.active .toc-icon {
          opacity: 1;
          color: var(--coc-red);
        }
        .toc-footer {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 2px solid #4A2D1B;
        }
        .contact-btn {
          background: var(--coc-gold-dark);
          color: var(--text-dark) !important;
          font-weight: 700;
          text-align: center !important;
          display: block !important;
        }

        /* --- Content Scroll (Parchment) --- */
        .content-scroll {
          background: var(--coc-parchment) url('https://www.transparenttextures.com/patterns/old-parchment.png');
          border: 8px solid #D2B48C;
          border-radius: 0.5rem;
          box-shadow: 0 15px 50px rgba(0,0,0,0.7);
          color: var(--text-dark);
          padding: 1.5rem;
          height: fit-content;
        }
        .rulebook-section {
          border-bottom: 2px dashed var(--coc-gold-dark);
          margin-bottom: 1rem;
          padding-bottom: 1rem;
        }
        .rulebook-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 1rem;
          border-radius: 0.5rem;
          transition: background-color 0.2s ease;
        }
        .section-header h3 {
          font-family: var(--font-fantasy);
          font-size: 1.75rem;
          color: var(--coc-wood);
          margin: 0;
        }
        .section-header p {
          font-size: 0.9rem;
          color: #6B4F3B;
          margin: 0;
        }
        .section-chevron {
          color: var(--coc-wood);
          transition: transform 0.3s ease;
        }
        .section-content {
          overflow: hidden;
          padding: 0 1rem;
        }
        .section-content ul {
          list-style: '⚔️ ';
          padding-left: 2rem;
          margin: 1.5rem 0;
          color: #4A3A2A;
          line-height: 1.7;
        }
        .section-content ul li {
          margin-bottom: 0.5rem;
        }
        .section-tip {
          background: rgba(210, 180, 140, 0.3);
          border: 1px solid var(--coc-gold-dark);
          border-radius: 0.5rem;
          padding: 1rem;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .section-tip strong {
          color: var(--coc-wood);
        }

        /* --- Sidebar (Stone Tablet) --- */
        .sidebar {
          position: sticky;
          top: 2rem;
          height: calc(100vh - 4rem);
          overflow-y: auto;
        }
        .sidebar-widget {
          background: #4A4A4A url('https://www.transparenttextures.com/patterns/rocky-wall.png');
          border: 4px solid #303030;
          border-radius: 0.75rem;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.5);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .sidebar-widget h4 {
          font-family: var(--font-fantasy);
          font-size: 1.25rem;
          color: var(--coc-gold);
          text-shadow: 0 2px 2px #000;
          margin: 0 0 0.5rem 0;
        }
        .sidebar-widget p {
          font-size: 0.8rem;
          color: #C0C0C0;
          margin: 0;
        }
        .countdown {
          font-family: var(--font-fantasy);
          font-size: 2rem;
          color: var(--text-light);
          margin: 0.5rem 0 1rem 0;
          /* NEW: Added a flash effect for seconds */
          animation: ${isExpired ? 'none' : 'flash 1s step-end infinite'};
        }
        .countdown.expired {
            color: var(--coc-red);
            font-size: 1.5rem;
        }
        @keyframes flash {
            50% { opacity: 0.6; }
        }
        /* END NEW */
        .sidebar-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        .sidebar-buttons button {
          font-family: var(--font-fantasy);
          font-size: 0.9rem;
          background: rgba(0,0,0,0.4);
          border: 1px solid #606060;
          color: var(--text-light);
          padding: 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
        }
        .sidebar-buttons button.primary {
          background: var(--coc-red);
          border-color: var(--coc-red);
          color: var(--text-light);
        }
        .sidebar-widget ul {
          list-style: '💎 ';
          padding-left: 1.5rem;
          font-size: 0.9rem;
          color: #D0D0D0;
        }
        .sidebar-widget ul li {
          margin-bottom: 0.5rem;
        }
        .sponsor-logos {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          color: #A0A0A0;
          font-size: 0.8rem;
        }

        /* --- Footer --- */
        .rulebook-footer {
          text-align: center;
          padding: 2rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          position: relative;
          z-index: 10;
        }

        /* --- Mobile Responsive --- */
        .mobile-toc-toggle {
          display: none;
        }

        @media (max-width: 1200px) {
          .rulebook-main {
            grid-template-columns: 1fr 3fr; /* Hide sidebar */
            gap: 1.5rem;
          }
          .sidebar {
            display: none;
          }
          .header-logo img {
            height: 3.5rem;
          }
          .logo-text h1 {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .rulebook-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          .header-actions {
            width: 100%;
            justify-content: space-between;
          }
          .gems-counter {
            padding: 0.25rem 0.75rem;
          }
          .gems-counter img {
            height: 1.5rem;
          }
          .register-btn {
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
          }

          .rulebook-main {
            grid-template-columns: 1fr; /* Single column */
            padding: 1rem;
          }
          
          .mobile-toc-toggle {
            display: block;
            position: sticky;
            top: 0;
            z-index: 100;
            width: 100%;
            padding: 0.75rem;
            font-family: var(--font-fantasy);
            font-size: 1rem;
            background: var(--coc-gold);
            color: var(--text-dark);
            border: none;
            cursor: pointer;
            border-bottom: 3px solid var(--coc-gold-dark);
          }

          .toc-nav {
            position: static;
            height: auto;
            display: none;
            width: 100%;
            margin-top: 1rem;
          }
          .toc-nav.mobile-visible {
            display: block;
          }
          
          .content-scroll {
            padding: 0.5rem;
          }
          .section-header {
            padding: 0.5rem;
          }
          .section-header h3 {
            font-size: 1.25rem;
          }
          .section-header p {
            font-size: 0.75rem;
          }
          .section-content ul {
            padding-left: 1.5rem;
          }
        }

      `}</style>
    </div>
  );
}