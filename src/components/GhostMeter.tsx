
import { useState, useEffect } from 'react';
import { Ghost } from 'lucide-react';

type GhostMeterProps = {
  score: number;
  isLoading?: boolean;
};

const GhostMeter = ({ score, isLoading = false }: GhostMeterProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    if (isLoading) {
      setDisplayScore(0);
      return;
    }
    
    // Animate the score
    const duration = 1000;
    const startTime = Date.now();
    const startValue = displayScore;
    
    const updateScore = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newScore = startValue + (score - startValue) * progress;
      
      setDisplayScore(newScore);
      
      if (progress < 1) {
        requestAnimationFrame(updateScore);
      }
    };
    
    requestAnimationFrame(updateScore);
  }, [score, isLoading]);

  // Determine the rating based on score
  const getRating = () => {
    if (isLoading) return { text: '', color: 'bg-muted' };
    
    if (displayScore <= 20) return { text: 'Looks Legit', color: 'bg-green-500' };
    if (displayScore <= 40) return { text: 'Give It Some Thought', color: 'bg-yellow-500' };
    if (displayScore <= 60) return { text: 'Ehhhh...', color: 'bg-orange-500' };
    if (displayScore <= 80) return { text: 'Spooky!', color: 'bg-red-500' };
    return { text: "That's No Ordinary Ghost!", color: 'bg-purple-600' };
  };

  const rating = getRating();
  const ghostPosition = `${Math.min(Math.max(displayScore, 0), 100)}%`;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 glass-card rounded-xl animate-fade-in">
      <div className="mb-4">
        <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full ${rating.color} transition-all duration-1000 ease-out`}
            style={{ width: ghostPosition }}
          />
          
          <div 
            className="absolute top-0 h-16 w-16 -mt-6 flex items-center justify-center transition-all duration-1000 ease-out"
            style={{ left: `calc(${ghostPosition} - 2rem)` }}
          >
            <Ghost 
              size={32} 
              className={`text-white transition-all ${isLoading ? 'animate-pulse opacity-50' : 'opacity-100'}`} 
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground mb-6">
        <span>Looks Legit</span>
        <span>Give It Some Thought</span>
        <span>Ehhhh...</span>
        <span>Spooky!</span>
        <span>That's No Ordinary Ghost!</span>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2 text-gradient">
          {isLoading ? 'Analyzing...' : rating.text}
        </h3>
        <p className="text-lg">
          {isLoading ? 'Please wait while we analyze this job listing' : `Ghost Score: ${Math.round(displayScore)}/100`}
        </p>
      </div>
    </div>
  );
};

export default GhostMeter;
