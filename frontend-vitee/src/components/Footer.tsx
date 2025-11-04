import { Shield } from "lucide-react";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-24 pb-10 overflow-hidden">
      {/* Floating characters above footer */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 flex gap-10 z-10">
        <img
          src="/assets/dragon.png"
          alt="dragon"
          className="w-40 animate-float"
        />
        <img
          src="/assets/barbarian.png"
          alt="barbarian"
          className="w-36 animate-float delay-200"
        />
        <img
          src="/assets/archer.png"
          alt="archer"
          className="w-32 animate-float delay-300"
        />
        <img
          src="/assets/wizard.png"
          alt="wizard"
          className="w-32 animate-float delay-100"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Newsletter */}
          <div className="bg-[#161616] p-6 rounded-2xl flex flex-col items-start justify-between max-w-sm">
            <img src="/assets/giant.png" alt="giant" className="w-24 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
            <div className="flex w-full bg-white rounded-full overflow-hidden mt-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-black outline-none"
              />
              <button className="bg-[#ffb300] text-black px-4 font-bold">
                <Mail className="w-4 h-4 inline-block mr-1" /> Go
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="space-x-6 text-lg font-semibold">
              <a href="#" className="hover:text-[#ffb300]">How to Play</a>
              <a href="#" className="hover:text-[#ffb300]">Events</a>
              <a href="#" className="hover:text-[#ffb300]">Supercell ID</a>
            </div>
            <div className="text-sm text-gray-400 space-y-1 mt-2">
              <p>Parent’s Guide</p>
              <p>Terms of Services</p>
              <p>Fair Play Policy</p>
            </div>
          </div>

          {/* Logo + Contact */}
          <div className="flex flex-col items-center md:items-end justify-center space-y-2">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-[#ffb300]" />
              <div>
                <p className="font-black text-[#ffb300] text-lg">IEEE CODE SLAM</p>
                <p className="text-sm text-gray-300 font-bold">Battle of Algorithms</p>
              </div>
            </div>
            <div className="text-right text-gray-400 text-sm">
              <p>hello@designmonks.co</p>
              <p>+1 980 971-24-19</p>
            </div>
            <div className="flex gap-4 text-white mt-2">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
          © 2025 IEEE Chapter. Built for warriors, by warriors.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
