
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 animate-fade-in">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          Developed by LK and made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in Lovable
        </p>
        <p className="text-xs text-muted-foreground/70 mt-2">
          This tool is for educational purposes. Always use your own judgment when applying for jobs.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
