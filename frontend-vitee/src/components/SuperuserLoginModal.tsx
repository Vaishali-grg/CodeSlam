import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SuperuserLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuperuserLoginModal = ({ open, onOpenChange }: SuperuserLoginModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Authentication Failed",
        description: "Please provide both username and password",
        variant: "destructive",
      });
      return;
    }

    // Demo authentication
    toast({
      title: "Access Granted",
      description: "Welcome, Superuser. The fortress is yours to command.",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md card-coc bg-gradient-to-b from-card to-secondary backdrop-blur-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-coc-green to-coc-green-light flex items-center justify-center border-4 border-coc-yellow shine bounce-float" style={{ boxShadow: '0 8px 0 hsl(135 70% 25%), 0 12px 30px rgba(0,0,0,0.6)' }}>
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <DialogTitle className="text-3xl text-center text-coc-yellow font-black uppercase" style={{ textShadow: '2px 2px 0 #fff, -1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333' }}>
            Superuser Access
          </DialogTitle>
          <DialogDescription className="text-center text-white font-bold text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
            Enter your credentials to command the fortress
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter superuser name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background border-wood focus:border-gold"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-wood focus:border-gold"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-foreground text-sm">
              One-Time Pass (Optional)
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP if required"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-background border-wood focus:border-gold"
            />
          </div>

          <button 
            type="submit"
            className="w-full btn-3d btn-3d-orange text-white font-black text-lg py-6 rounded-2xl uppercase tracking-wide shine flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Grant Access
          </button>
          
          <p className="text-sm text-center text-white/80 font-bold mt-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
            Need access? Contact the fortress administrator
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SuperuserLoginModal;
