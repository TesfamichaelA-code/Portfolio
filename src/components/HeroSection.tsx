import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
// Keep the import for TypeScript validation but use the public path for href
import resumePdf from '../assets/Tesfamichael_Abebe_Resume.pdf';
import { trackEvent } from '../utils/analytics';

const HeroSection: React.FC = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!photoRef.current) return;
      
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;
      
      photoRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Track hero section view on component mount
    trackEvent('section_viewed', {
      section: 'hero_section',
      timestamp: new Date().toISOString()
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center justify-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="animate-fade-in-up">
              <h2 className="text-cyan-400 font-medium mb-2 tracking-wider">HELLO, I'M</h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-500 to-cyan-400">
                Tesfamichael Abebe
              </h1>
              <h3 className="text-xl md:text-2xl font-medium text-gray-300 mb-6">
                <span className="text-white">Full-Stack Developer</span> & GDG Mentor
              </h3>
              <p className="text-gray-400 mb-8 max-w-lg">
                Based in Addis Ababa, Ethiopia
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="/Tesfamichael_Abebe_Resume.pdf"
                  download="Tesfamichael_Abebe_Resume.pdf"
                  onClick={() => {
                    // Track the download event
                    trackEvent('resume_download', {
                      source: 'hero_section',
                      format: 'pdf',
                      timestamp: new Date().toISOString()
                    });
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 animate-pulse hover:animate-none"
                >
                  <FileDown size={18} />
                  <span>Download CV</span>
                </a>
                <a 
                  href="mailto:tesfamichaelad@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-cyan-500/30 text-white hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <Mail size={18} />
                  <span>Contact Me</span>
                </a>
                <a 
                  href="https://github.com/TesfamichaelA-code" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-purple-500/30 text-white hover:bg-purple-500/10 transition-all duration-300"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/tesfamichael-abebe-damtew/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-cyan-500/30 text-white hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div 
                ref={photoRef}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-500/20 shadow-lg shadow-cyan-500/20 transition-transform duration-500"
                style={{ willChange: 'transform' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-cyan-400/20 z-10 mix-blend-overlay"></div>
                <img 
                  src="/src/assets/profile.png" 
                  alt="Tesfamichael Abebe"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Glowing orbs */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-purple-500/20 blur-xl animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-cyan-400 flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;