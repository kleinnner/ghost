
import { useState, useEffect } from 'react';
import { RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CaptchaVerifierProps = {
  onVerify: () => void;
};

const CaptchaVerifier = ({ onVerify }: CaptchaVerifierProps) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // Generate a random captcha text
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setError('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setIsVerified(true);
      onVerify();
    } else {
      setError('Incorrect captcha. Please try again.');
      generateCaptcha();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-card rounded-xl animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-center">Verify You're Human</h3>
      
      {isVerified ? (
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full bg-primary/20 p-3 mb-3">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <p className="text-center text-muted-foreground">Verification successful!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <div className="py-3 px-4 bg-secondary/50 rounded-lg text-center select-none mb-4 font-mono text-xl tracking-widest">
                {captchaText.split('').map((char, index) => (
                  <span 
                    key={index} 
                    className="inline-block transform" 
                    style={{ 
                      transform: `rotate(${Math.random() * 20 - 10}deg)`,
                      marginLeft: '2px',
                      marginRight: '2px'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter the text above"
              className="py-2 px-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
          
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      )}
    </div>
  );
};

export default CaptchaVerifier;
