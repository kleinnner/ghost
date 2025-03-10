
import { useState } from 'react';
import { Link, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import GhostMeter from './GhostMeter';
import CaptchaVerifier from './CaptchaVerifier';
import { analyzeJob, isValidLinkedInJobUrl } from '@/utils/analyzer';

interface AnalysisDetail {
  category: string;
  score: number;
  reason: string;
}

const JobAnalyzer = () => {
  const [jobUrl, setJobUrl] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);
  const [details, setDetails] = useState<AnalysisDetail[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobUrl(e.target.value);
    setError('');
  };

  const handleVerify = () => {
    setIsVerified(true);
  };

  const handleReset = () => {
    setIsVerified(false);
    setHasAnalyzed(false);
    setScore(0);
    setDetails([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified) {
      setError('Please complete the verification first');
      return;
    }
    
    if (!isValidLinkedInJobUrl(jobUrl)) {
      setError('Please enter a valid LinkedIn job URL');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await analyzeJob(jobUrl);
      setScore(result.score);
      setDetails(result.details);
      setHasAnalyzed(true);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      {!isVerified ? (
        <CaptchaVerifier onVerify={handleVerify} />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Link className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="url"
                  placeholder="Enter LinkedIn job URL"
                  className="pl-10"
                  value={jobUrl}
                  onChange={handleUrlChange}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading || !jobUrl}>
                {isLoading ? 'Analyzing...' : 'Analyze Job'}
              </Button>
            </div>
            
            {error && (
              <div className="bg-destructive/10 p-3 rounded-md flex gap-2 items-start animate-fade-in">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </form>
          
          {hasAnalyzed || isLoading ? (
            <div className="space-y-8">
              <GhostMeter score={score} isLoading={isLoading} />
              
              {hasAnalyzed && details.length > 0 && (
                <Card className="p-6 glass-card animate-slide-up">
                  <h3 className="text-xl font-semibold mb-4">Analysis Breakdown</h3>
                  <div className="space-y-4">
                    {details.map((detail, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{detail.category}</span>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              detail.score <= 20 ? 'bg-green-500/20 text-green-300' :
                              detail.score <= 40 ? 'bg-yellow-500/20 text-yellow-300' :
                              detail.score <= 60 ? 'bg-orange-500/20 text-orange-300' :
                              detail.score <= 80 ? 'bg-red-500/20 text-red-300' :
                              'bg-purple-600/20 text-purple-300'
                            }`}
                          >
                            {detail.score <= 20 ? 'Low Risk' :
                             detail.score <= 40 ? 'Slight Risk' :
                             detail.score <= 60 ? 'Moderate Risk' :
                             detail.score <= 80 ? 'High Risk' :
                             'Very High Risk'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{detail.reason}</p>
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              detail.score <= 20 ? 'bg-green-500' :
                              detail.score <= 40 ? 'bg-yellow-500' :
                              detail.score <= 60 ? 'bg-orange-500' :
                              detail.score <= 80 ? 'bg-red-500' :
                              'bg-purple-600'
                            }`}
                            style={{ width: `${detail.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> This analysis is based on automated checks and may not be 100% accurate.
                      Always use your own judgment when applying for jobs.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button variant="secondary" onClick={handleReset}>
                      Analyze Another Job
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center p-12 glass-card rounded-xl animate-slide-up">
              <div className="flex justify-center mb-4">
                <ExternalLink className="h-12 w-12 text-primary animate-pulse-subtle" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter a LinkedIn Job URL</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Paste the URL of a LinkedIn job listing to analyze whether it might be a "ghost job" posting.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobAnalyzer;
