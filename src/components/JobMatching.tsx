import { useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, Users, ExternalLink, Briefcase, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  matchScore: number;
  description: string;
  requiredSkills: string[];
  matchingSkills: string[];
  missingSkills: string[];
}

interface JobMatchingProps {
  onBack: () => void;
}

const JobMatching = ({ onBack }: JobMatchingProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate job matching API call
    const timer = setTimeout(() => {
      setJobs([
        {
          id: '1',
          title: 'Frontend Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salary: '$90k - $120k',
          posted: '2 days ago',
          matchScore: 92,
          description: 'Join our dynamic team building cutting-edge web applications...',
          requiredSkills: ['React', 'TypeScript', 'Node.js', 'CSS', 'Git'],
          matchingSkills: ['JavaScript', 'Git', 'CSS'],
          missingSkills: ['React', 'TypeScript']
        },
        {
          id: '2',
          title: 'Full Stack Engineer',
          company: 'StartupXYZ',
          location: 'Remote',
          type: 'Full-time',
          salary: '$100k - $140k',
          posted: '1 week ago',
          matchScore: 85,
          description: 'We are looking for a passionate full-stack developer...',
          requiredSkills: ['Python', 'Django', 'React', 'PostgreSQL', 'AWS'],
          matchingSkills: ['Python', 'PostgreSQL'],
          missingSkills: ['Django', 'AWS']
        },
        {
          id: '3',
          title: 'Software Engineer',
          company: 'MegaCorp',
          location: 'New York, NY',
          type: 'Full-time',
          salary: '$110k - $150k',
          posted: '3 days ago',
          matchScore: 78,
          description: 'Seeking an experienced software engineer to join our platform team...',
          requiredSkills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'],
          matchingSkills: ['Java'],
          missingSkills: ['Spring Boot', 'Microservices', 'Docker', 'Kubernetes']
        },
        {
          id: '4',
          title: 'Backend Developer',
          company: 'CloudTech Solutions',
          location: 'Austin, TX',
          type: 'Contract',
          salary: '$80 - $100/hr',
          posted: '5 days ago',
          matchScore: 71,
          description: 'Contract position for backend development of cloud-native applications...',
          requiredSkills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'GraphQL'],
          matchingSkills: ['Node.js', 'MongoDB'],
          missingSkills: ['Express', 'Redis', 'GraphQL']
        }
      ]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getMatchColor = (score: number) => {
    if (score >= 85) return "text-accent";
    if (score >= 70) return "text-yellow-500";
    return "text-orange-500";
  };

  const getMatchBadgeVariant = (score: number) => {
    if (score >= 85) return "default";
    if (score >= 70) return "secondary";
    return "outline";
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="shadow-card">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Finding matching jobs...</h3>
              <p className="text-muted-foreground mb-6">
                We're analyzing thousands of job postings to find the best matches for your profile.
              </p>
              
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing job requirements</span>
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Matching skills & experience</span>
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Calculating compatibility scores</span>
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Job Matches</h2>
          <p className="text-muted-foreground">Found {jobs.length} jobs that match your profile</p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back to Analysis
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{jobs.length}</div>
                <p className="text-sm text-muted-foreground">Total Matches</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {jobs.filter(job => job.matchScore >= 85).length}
                </div>
                <p className="text-sm text-muted-foreground">High Matches (85%+)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {jobs.filter(job => job.location.includes('Remote')).length}
                </div>
                <p className="text-sm text-muted-foreground">Remote Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                  <p className="text-muted-foreground font-medium">{job.company}</p>
                </div>
                <Badge 
                  variant={getMatchBadgeVariant(job.matchScore)}
                  className="ml-4"
                >
                  {job.matchScore}% match
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {job.posted}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Match Score Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Match Score</span>
                  <span className={`text-sm font-bold ${getMatchColor(job.matchScore)}`}>
                    {job.matchScore}%
                  </span>
                </div>
                <Progress value={job.matchScore} className="h-2" />
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.map((skill, index) => {
                    const isMatching = job.matchingSkills.includes(skill);
                    return (
                      <Badge 
                        key={index} 
                        variant={isMatching ? "default" : "outline"}
                        className={isMatching ? "bg-accent text-accent-foreground" : "text-muted-foreground"}
                      >
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {job.missingSkills.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-orange-600">Skills to Learn</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.missingSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-orange-600 border-orange-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  View Job Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline" size="lg">
          Load More Jobs
        </Button>
      </div>
    </div>
  );
};

export default JobMatching;