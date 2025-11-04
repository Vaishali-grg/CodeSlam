import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-4 border-coc-orange bg-gradient-to-b from-background to-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-coc-yellow bounce-float" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
            <div>
              <p className="font-black text-coc-yellow uppercase text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>IEEE CODE SLAM</p>
              <p className="text-sm text-white font-bold">Battle of Algorithms</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-white/80 font-medium">
              © 2025 IEEE Chapter. All rights reserved.
            </p>
            <p className="text-xs text-white/60 font-medium mt-1">
              Built for warriors, by warriors
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
