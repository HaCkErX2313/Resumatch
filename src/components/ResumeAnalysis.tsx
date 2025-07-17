import { useState, useEffect } from 'react';
import { Star, TrendingUp, AlertTriangle, CheckCircle, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ResumeAnalysisProps {
  fileName: string;
  onContinue: () => void;
}

interface AnalysisResult {
  overallScore: number;
  atsScore: number;
  sections: {
    grammar: { score: number; suggestions: string[] };
    keywords: { score: number; missing: string[]; present: string[] };
    formatting: { score: number; issues: string[] };
    experience: { score: number; feedback: string[] };
  };
  recommendations: string[];
}

const ResumeAnalysis = ({ fileName, onContinue }: ResumeAnalysisProps) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      setAnalysis({
        overallScore: 78,
        atsScore: 85,
        sections: {
          grammar: {
            score: 92,
            suggestions: [
              "Consider using active voice in experience descriptions",
              "Remove unnecessary words for conciseness"
            ]
          },
          keywords: {
            score: 65,
            missing: ["React", "TypeScript", "Cloud Computing", "Agile"],
            present: ["JavaScript", "Python", "Node.js", "Git", "SQL"]
          },
          formatting: {
            score: 88,
            issues: [
              "Inconsistent date formats",
              "Consider using bullet points for achievements"
            ]
          },
          experience: {
            score: 75,
            feedback: [
              "Add quantifiable achievements with metrics",
              "Include more recent relevant projects",
              "Highlight leadership and collaboration skills"
            ]
          }
        },
        recommendations: [
          "Add missing technical skills to match job requirements",
          "Include metrics and numbers in your achievements",
          "Optimize for ATS by using standard section headings",
          "Consider adding a professional summary section"
        ]
      });
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-yellow-500";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-accent" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <AlertTriangle className="w-5 h-5 text-destructive" />;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-card">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyzing your resume...</h3>
              <p className="text-muted-foreground mb-6">
                Our AI is reviewing your resume for grammar, keywords, formatting, and ATS compatibility.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Grammar & Language</span>
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Keyword Analysis</span>
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>ATS Compatibility</span>
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Formatting Review</span>
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Resume Analysis Complete</CardTitle>
              <p className="text-muted-foreground">Analysis for: {fileName}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{analysis.overallScore}/100</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Grammar</h3>
              {getScoreIcon(analysis.sections.grammar.score)}
            </div>
            <div className="text-2xl font-bold mb-2 text-primary">
              {analysis.sections.grammar.score}/100
            </div>
            <Progress value={analysis.sections.grammar.score} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              {analysis.sections.grammar.suggestions.length} suggestions
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Keywords</h3>
              {getScoreIcon(analysis.sections.keywords.score)}
            </div>
            <div className="text-2xl font-bold mb-2 text-primary">
              {analysis.sections.keywords.score}/100
            </div>
            <Progress value={analysis.sections.keywords.score} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              {analysis.sections.keywords.missing.length} missing skills
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">ATS Score</h3>
              {getScoreIcon(analysis.atsScore)}
            </div>
            <div className="text-2xl font-bold mb-2 text-primary">
              {analysis.atsScore}/100
            </div>
            <Progress value={analysis.atsScore} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              ATS Compatibility
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Experience</h3>
              {getScoreIcon(analysis.sections.experience.score)}
            </div>
            <div className="text-2xl font-bold mb-2 text-primary">
              {analysis.sections.experience.score}/100
            </div>
            <Progress value={analysis.sections.experience.score} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              {analysis.sections.experience.feedback.length} improvements
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing Keywords */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Missing Keywords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add these skills to improve job matching:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {analysis.sections.keywords.missing.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-destructive border-destructive">
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Present Keywords:</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.sections.keywords.present.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-accent border-accent">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm text-foreground">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Button 
          onClick={onContinue} 
          size="lg" 
          variant="gradient"
          className="min-w-48"
        >
          Find Matching Jobs
          <TrendingUp className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ResumeAnalysis;