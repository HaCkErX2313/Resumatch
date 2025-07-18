import { HelpCircle, Mail, MessageCircle, Phone, FileText, Video, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface HelpSupportProps {
  onBack: () => void;
}

const HelpSupport = ({ onBack }: HelpSupportProps) => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "vinay22patel22@gmail.com",
      availability: "24/7"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Currently Not Available",
      availability: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+91 8303163671",
      availability: "Mon-Fri 9AM-5PM EST"
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "User Guide",
      description: "Comprehensive guide to using ResuMatch",
      action: "Read Guide"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video walkthroughs",
      action: "Watch Videos"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and share tips",
      action: "Join Forum"
    }
  ];

  const faqs = [
    {
      question: "How does the AI resume review work?",
      answer: "Our AI analyzes your resume for grammar, formatting, ATS compatibility, and keyword optimization. It provides detailed feedback and suggestions to improve your resume's effectiveness."
    },
    {
      question: "What file formats are supported?",
      answer: "We support PDF, DOC, and DOCX file formats. For best results, we recommend uploading a PDF version of your resume."
    },
    {
      question: "How accurate is the job matching?",
      answer: "Our job matching algorithm analyzes your skills, experience, and preferences against thousands of job listings to provide highly relevant matches with compatibility scores."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security seriously. Your resume and personal information are encrypted and stored securely. We never share your data with third parties without your consent."
    },
    {
      question: "Can I download my improved resume?",
      answer: "Yes, after the AI analysis, you can download an optimized version of your resume with suggested improvements and formatting enhancements."
    },
    {
      question: "How often is the job database updated?",
      answer: "Our job database is updated daily with new listings from major job boards and company websites to ensure you get the most current opportunities."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're here to help you get the most out of ResuMatch. Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      {/* Contact Methods */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{method.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-muted-foreground text-sm">{method.description}</p>
                <p className="font-medium text-foreground">{method.contact}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {method.availability}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <resource.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                <Button variant="outline" size="sm">
                  {resource.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Quick Tips */}
      <section className="bg-muted/30 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Tips for Better Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Resume Upload Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use PDF format for best compatibility</li>
              <li>• Ensure text is selectable (not scanned images)</li>
              <li>• Keep file size under 5MB</li>
              <li>• Use standard fonts and formatting</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Optimization Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Include relevant keywords for your target role</li>
              <li>• Use action verbs to describe achievements</li>
              <li>• Quantify your accomplishments with numbers</li>
              <li>• Tailor your resume for each application</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpSupport;
