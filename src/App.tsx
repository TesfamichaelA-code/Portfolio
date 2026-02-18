import { useEffect } from 'react';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import CommunitySection from './components/CommunitySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';
import { useCursorEffect } from './hooks/useCursorEffect';
import { initPlausible } from './utils/analytics';
import './styles/animations.css';

function App() {
  const { theme } = useTheme();

  // Initialize custom cursor effect — use different blend mode per theme
  useCursorEffect({
    size: 24,
    color: theme === 'dark' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(8, 145, 178, 0.25)',
    blendMode: theme === 'dark' ? 'screen' : 'multiply'
  });
  
  // Scroll to hash on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  // Initialize analytics
  useEffect(() => {
    initPlausible();
  }, []);

  return (
    <div className="min-h-screen bg-surface text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Skip to content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-black focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <CommunitySection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;