
interface AnalysisResult {
  score: number;
  details: {
    category: string;
    score: number;
    reason: string;
  }[];
}

export const analyzeJob = async (url: string): Promise<AnalysisResult> => {
  // In a real implementation, this would call an API or backend service
  // For now, we'll simulate an analysis with random scoring
  
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
  
  // Create analysis factors with random scores for demo purposes
  const postingDateScore = Math.floor(Math.random() * 100);
  const repostingScore = Math.floor(Math.random() * 100);
  const descriptionScore = Math.floor(Math.random() * 100);
  const crossCheckScore = Math.floor(Math.random() * 100);
  const glassdoorScore = Math.floor(Math.random() * 100);
  const agencyScore = Math.floor(Math.random() * 100);
  
  // Get an overall score (weighted average)
  const overallScore = Math.floor(
    (postingDateScore * 0.15) +
    (repostingScore * 0.2) +
    (descriptionScore * 0.15) +
    (crossCheckScore * 0.2) +
    (glassdoorScore * 0.15) +
    (agencyScore * 0.15)
  );
  
  return {
    score: overallScore,
    details: [
      {
        category: 'Posting Date',
        score: postingDateScore,
        reason: postingDateScore > 50 
          ? 'This job has been listed for an unusually long time'
          : 'The job posting date appears to be recent and normal'
      },
      {
        category: 'Reposting Patterns',
        score: repostingScore,
        reason: repostingScore > 50 
          ? 'This job has been reposted multiple times without being filled'
          : 'No suspicious reposting patterns detected'
      },
      {
        category: 'Job Description',
        score: descriptionScore,
        reason: descriptionScore > 50 
          ? 'The job description contains vague or generic language'
          : 'The job description appears to be detailed and specific'
      },
      {
        category: 'Company Website',
        score: crossCheckScore,
        reason: crossCheckScore > 50 
          ? 'This job is not listed on the company\'s official website'
          : 'This job appears on the company\'s official website'
      },
      {
        category: 'Glassdoor Check',
        score: glassdoorScore,
        reason: glassdoorScore > 50 
          ? 'Glassdoor reviews suggest potential hiring issues with this company'
          : 'Glassdoor reviews for this company appear normal'
      },
      {
        category: 'Recruiter Check',
        score: agencyScore,
        reason: agencyScore > 50 
          ? 'This job is posted by a third-party recruiter or marked as confidential'
          : 'This job is posted directly by the hiring company'
      }
    ]
  };
};

// Validate LinkedIn job URL
export const isValidLinkedInJobUrl = (url: string): boolean => {
  // This is a basic validation - in reality, you would want more robust validation
  return url.trim() !== '' && 
    (url.includes('linkedin.com/jobs/') || 
     url.includes('linkedin.com/job/'));
};
