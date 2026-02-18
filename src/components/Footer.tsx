import { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 relative overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/70 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 z-10" style={{ backgroundSize: '200% 100%' }}></div>
      <div className="absolute -top-32 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-32 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2">
            Tesfamichael Abebe
          </h2>
          <p className="text-foreground-muted">Full-Stack Developer</p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="mailto:tesfamichaelad@gmail.com"
            className="text-foreground-muted hover:text-cyan-400 transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a 
            href="https://github.com/TesfamichaelA-code" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground-muted hover:text-cyan-400 transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/tesfamichael-abebe-damtew/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground-muted hover:text-cyan-400 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
        
        <div className="border-t border-line pt-8 text-center">
          <p className="text-foreground-muted text-sm">
            &copy; {new Date().getFullYear()} Tesfamichael Abebe. All rights reserved.
          </p>
        </div>
        
        {/* Scroll to top button */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-surface/70 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 hover:text-foreground hover:bg-cyan-500/20 transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;