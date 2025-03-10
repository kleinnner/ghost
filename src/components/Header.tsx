
import { Ghost } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 animate-fade-in">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <Ghost size={32} className="text-primary animate-float" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
            Ghostjob
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-md">
          Have I Been Ghostjobbed?
        </p>
      </div>
    </header>
  );
};

export default Header;
