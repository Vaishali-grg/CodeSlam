import EventTimer from "@/components/EventTimer";
import heroCocBright from "@/assets/hero-coc-bright.jpg"; // Assuming you have this image

const TimerPage = () => {
  return (
    <main
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroCocBright})` }}
    >
      <div className="w-full min-h-screen bg-black/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl md:text-6xl text-yellow-400 font-extrabold mb-6 drop-shadow-lg">
            The Hourglass
          </h2>
          <p className="text-gray-300 max-w-2xl mb-8">
            Behold the official clock of the CodeSlam. Till the Event begins, Gather your clan and prepare your strategies.
            Time waits for no coder.
          </p>

          {/* Big centered timer with updated thematic border */}
          {/* --- PADDING IS FIXED HERE --- */}
          <div className="bg-gradient-to-b from-[#1a110a]/70 to-black/70 border border-yellow-600/30 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md">
            <EventTimer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TimerPage;