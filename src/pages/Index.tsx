import { useState } from 'react';
import { Target, CheckCircle, TrendingUp, Users, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import ResumeUpload from '@/components/ResumeUpload';
import ResumeAnalysis from '@/components/ResumeAnalysis';
import JobMatching from '@/components/JobMatching';

type Step = 'landing' | 'upload' | 'analysis' | 'jobs';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentStep('analysis');
  };

  const handleAnalysisComplete = () => {
    setCurrentStep('jobs');
  };

  const handleBackToAnalysis = () => {
    setCurrentStep('analysis');
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              AI-Powered Resume Review & 
              <span className="text-primary"> Job Matching</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload your resume and get instant feedback, ATS optimization, 
              and personalized job recommendations powered by advanced AI.
            </p>
            <Button 
              onClick={() => setCurrentStep('upload')} 
              size="xl" 
              variant="gradient"
              className="animate-scale-in"
            >
              Start Free Analysis
              <Target className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform analyzes, optimizes, and matches your resume 
              with the perfect opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Resume Review</h3>
                <p className="text-muted-foreground">
                  Get instant feedback on grammar, formatting, keywords, and ATS compatibility 
                  with our advanced AI analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Smart Job Matching</h3>
                <p className="text-muted-foreground">
                  Find jobs that perfectly match your skills, experience, and career goals 
                  with our intelligent matching algorithm.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Keyword Optimization</h3>
                <p className="text-muted-foreground">
                  Discover missing keywords and skills to boost your resume's visibility 
                  and increase your chances of getting hired.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How ResuMatch Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to optimize your job search
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload Resume</h3>
              <p className="text-muted-foreground">
                Simply drag and drop your resume (PDF, DOC, or DOCX) to get started.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI reviews your resume for grammar, keywords, formatting, and ATS optimization.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Matches</h3>
              <p className="text-muted-foreground">
                Receive personalized job recommendations and actionable improvement suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Supercharge Your Job Search?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have improved their resumes and landed their dream jobs.
          </p>
          <Button 
            onClick={() => setCurrentStep('upload')} 
            size="xl" 
            variant="secondary"
            className="hover:scale-105 transition-transform"
          >
            Get Started Now - It's Free
            <CheckCircle className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );

  if (currentStep === 'landing') {
    return renderLandingPage();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'upload' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">Upload Your Resume</h1>
              <p className="text-muted-foreground">
                Upload your resume to get started with AI-powered analysis and job matching
              </p>
            </div>
            <ResumeUpload onUploadComplete={handleFileUpload} />
          </div>
        )}

        {currentStep === 'analysis' && uploadedFile && (
          <ResumeAnalysis 
            fileName={uploadedFile.name} 
            onContinue={handleAnalysisComplete}
          />
        )}

        {currentStep === 'jobs' && (
          <JobMatching onBack={handleBackToAnalysis} />
        )}
      </div>
    </div>
  );
};

export default Index;
