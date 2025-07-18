import { FileText, Target, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onHelpClick?: () => void;
}

const Header = ({ onHelpClick }: HeaderProps) => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">ResuMatch</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <button 
              onClick={onHelpClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Help & Support
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;