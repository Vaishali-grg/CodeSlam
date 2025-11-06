import { useEffect, useState } from "react";
import { Hourglass, Swords, Trophy } from "lucide-react";

const pad = (n: number) => n.toString().padStart(2, "0");


//Update The Timer Here.
const EVENT_START = new Date("2025-11-10T12:00:00");
const EVENT_END = new Date("2025-11-11T15:00:00");

function getDelta(ms: number) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
}

const TimerBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center p-4 min-w-[90px] md:min-w-[110px] bg-black/30 border border-yellow-600/50 rounded-xl shadow-lg shadow-yellow-500/20 backdrop-blur-sm">
    <div className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
      {value}
    </div>
    <div className="text-xs md:text-sm font-semibold uppercase text-yellow-400/80">
      {label}
    </div>
  </div>
);

const EventTimer = () => {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const beforeStart = now < EVENT_START.getTime();
  const during = now >= EVENT_START.getTime() && now < EVENT_END.getTime();
  const after = now >= EVENT_END.getTime();

  const toStart = Math.max(0, EVENT_START.getTime() - now);
  const toEnd = Math.max(0, EVENT_END.getTime() - now);

  const startDelta = getDelta(toStart);
  const endDelta = getDelta(toEnd);

  return (
    <section
      // --- THIS IS THE FIX ---
      // Removed min-h-screen, background, and padding
      className="flex items-center justify-center text-white"
    >
      <div className="text-center">
        {/* --- STATE 1: BEFORE EVENT --- */}
        {beforeStart && (
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <Hourglass className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-semibold text-yellow-400 tracking-wide">
                CodeSlam Begins In
              </h3>
            </div>
            <div className="flex justify-center gap-3 md:gap-5 mb-6">
              {startDelta.days > 0 && (
                <TimerBlock value={pad(startDelta.days)} label="Days" />
              )}
              <TimerBlock value={pad(startDelta.hours)} label="Hours" />
              <TimerBlock value={pad(startDelta.minutes)} label="Minutes" />
              <TimerBlock value={pad(startDelta.seconds)} label="Seconds" />
            </div>
            <div className="text-sm text-gray-300">
              Prepare for battle! The event starts {EVENT_START.toLocaleString()}
            </div>
          </div>
        )}

        {/* --- STATE 2: DURING EVENT --- */}
        {during && (
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <Swords className="w-6 h-6 text-red-500 animate-pulse" />
              <h3 className="text-2xl font-semibold text-red-500 tracking-wide">
                The Slam is Live!
              </h3>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-300 mb-6 drop-shadow-[0_0_10px_theme('colors.yellow.400')]">
              Battle for Glory!
            </h2>
            <div className="text-lg text-gray-200 mb-4">
              The Arena Closes In:
            </div>
            <div className="flex justify-center gap-3 md:gap-5">
              <TimerBlock value={pad(endDelta.hours)} label="Hours" />
              <TimerBlock value={pad(endDelta.minutes)} label="Minutes" />
              <TimerBlock value={pad(endDelta.seconds)} label="Seconds" />
            </div>
          </div>
        )}

        {/* --- STATE 3: AFTER EVENT --- */}
        {after && (
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <Trophy className="w-7 h-7 text-yellow-400" />
              <h3 className="text-2xl font-semibold text-yellow-400 tracking-wide">
                The Battle is Over
              </h3>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-4 text-gray-200">
              The Legends are Forged
            </div>
            <div className="text-lg text-gray-300">
              Visit the Leaderboard to see the victors.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventTimer;