import { Instagram } from "lucide-react";

const Footer = () => {
  // Array for sponsor logos
  const sponsors = [
    { src: '/codecrafters.png', alt: 'CodeCrafters', url: 'https://codecrafters.io' },
    { src: '/essmey.png', alt: 'Essmey', url: 'https://www.essmey.in/' },
    { src: '/sipsmash.jpg', alt: 'SipSmash', url: 'https://www.instagram.com/sip.and.smash/' },
    { src: '/intbuddy.png', alt: 'IntBuddy', url: 'https://interviewbuddy.net/' },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#111111] to-[#1a1a1a] opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.15)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Section */}
          <div className="flex flex-col items-start space-y-3">
            
            {/* Crest + Title + Mini Pekka */}
            <div className="flex items-center gap-4">
              {/* Crest */}
              <div className="p-2 rounded-xl bg-[#1a1a1a] border border-[#ffb300]/30 hover:shadow-[0_0_15px_#ffb300]/40 transition-shadow">
                <img
                  src="/crest-emblem.png"
                  alt="IEEE Crest Emblem"
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#ffb300] tracking-wider">
                  IEEE CODE SLAM
                </h2>
                <p className="text-gray-400 font-medium text-sm">The Grand Code Off</p>
              </div>

              {/* Mini Pekka */}
              <img
                src="/mini-pekka.png"
                alt="Mini Pekka Mascot"
                className="w-14 md:w-16 drop-shadow-[0_0_12px_rgba(255,179,0,0.5)] select-none"
              />
            </div>

            <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
              Where coders clash in logic, speed, and innovation. Push your limits. Rewrite the rules.
            </p>

            <a
              href="/rulebook"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-[#3b2209] font-extrabold px-10 py-4 rounded-2xl text-xl border-4 border-yellow-300 shadow-[0_6px_0_#5c2d00,0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,200,0,0.5)] transition-all"
            >
              View Rulebook
            </a>
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:items-end items-start space-y-3">
            <div className="text-gray-300 text-sm md:text-right leading-relaxed">
              <p className="font-bold text-white text-lg mb-1">Event Coordinators</p>
              <p>Khushleen Kaur<span className="text-[#ffb300]">+91 7087473219</span></p>
              <p>Karunya Gupta <span className="text-[#ffb300]">+91 9805946982</span></p>
              <p className="mt-1">
                Email: <span className="text-[#ffb300]">ieee@chitkara.edu.in</span>
              </p>
            </div>

            <div className="flex gap-3 mt-2">
              <a
                href="https://www.instagram.com/ieeeciet/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1a1a1a] border border-[#ffb300]/30 hover:bg-[#ffb300] hover:text-black transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section with Sponsors and Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          
          {/* Sponsor Section */}
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Our Sponsors
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 max-w-lg mx-auto items-center">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.alt}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.alt}`}
                  className="flex items-center justify-center"
                >
                  <img
                    src={sponsor.src}
                    alt={sponsor.alt}
                    className="max-h-10 w-auto object-contain mx-auto filter grayscale hover:grayscale-0 brightness-75 hover:brightness-100 transition-all duration-300"
                    onError={(e) => {
                      // Fallback for broken images
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
          <p>© 2025 IEEE Chapter — Built for warriors, by warriors.</p>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffb300] to-transparent animate-pulse"></div>
    </footer>
  );
};

export default Footer;