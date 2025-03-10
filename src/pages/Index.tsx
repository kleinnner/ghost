
import Header from '@/components/Header';
import JobAnalyzer from '@/components/JobAnalyzer';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ghost-900/50 via-background to-background pointer-events-none" />
      
      <div className="flex-1 container mx-auto py-8 px-4 sm:px-6 flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-4xl mx-auto mt-8 md:mt-12">
          <div className="space-y-2 text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gradient">
              Detect Ghost Job Listings
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter a LinkedIn job URL to analyze whether the posting might be a "ghost job" - 
              a listing that companies have no real intention of hiring for.
            </p>
          </div>
          
          <JobAnalyzer />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
