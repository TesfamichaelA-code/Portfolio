import { useRef, useEffect, useState, useCallback } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { trackEvent } from '../utils/analytics';
import { projects } from '../data/content';

const SCROLL_SPEED = 0.5; // px per frame

const ProjectsSection: React.FC = () => {
  const [sectionRef, isVisible] = useInView({ threshold: 0.1 });
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = useRef(false);

  // Detect touch device once
  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track || isPausedRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    track.scrollLeft += SCROLL_SPEED;

    // When we've scrolled past the first set of cards, jump back seamlessly
    const halfScroll = track.scrollWidth / 2;
    if (track.scrollLeft >= halfScroll) {
      track.scrollLeft -= halfScroll;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isVisible, animate]);

  const handleMouseEnter = () => {
    if (!isTouchDevice.current) {
      isPausedRef.current = true;
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    setIsHovered(false);
  };

  // Allow horizontal scroll with mouse wheel when paused
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isPausedRef.current) return;
    e.preventDefault();
    const track = trackRef.current;
    if (track) {
      track.scrollLeft += e.deltaY + e.deltaX;
    }
  }, []);

  // Duplicate cards for seamless loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface/90 via-surface to-surface/90 z-0"></div>
      
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-20'
        }`}
      >
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Marquee track */}
        <div
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          className={`flex gap-6 overflow-x-auto px-6 pb-4 marquee-track ${
            isHovered ? 'show-scrollbar' : ''
          }`}
          style={{
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch',
            cursor: isHovered ? 'grab' : 'default',
          }}
        >
          {duplicatedProjects.map((project, index) => (
            <div 
              key={`${project.title}-${index}`}
              className="group relative h-96 rounded-lg overflow-hidden flex-shrink-0 w-[340px] sm:w-[380px] lg:w-[420px]"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transition: `opacity 800ms ${(index % projects.length) * 100}ms`
              }}
            >
              {/* Glass border */}
              <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-tr from-cyan-500/40 to-purple-500/40 z-10">
                <div className="absolute inset-0 rounded-lg bg-surface/80 backdrop-blur-sm"></div>
              </div>
              
              {/* Project image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-cyan-300 transition-colors duration-300">{project.title}</h3>
                <p className="text-foreground-sub mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-full bg-surface/40 backdrop-blur-sm border border-cyan-500/30 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackEvent('project_link_clicked', {
                          project_title: project.title,
                          link_type: 'live_demo',
                          url: project.liveLink || ''
                        });
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium transform hover:scale-105 transition-all duration-300"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackEvent('project_link_clicked', {
                          project_title: project.title,
                          link_type: 'github_code',
                          url: project.githubLink || ''
                        });
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface/60 border border-line-alt text-foreground text-sm font-medium hover:border-line-alt transition-all duration-300"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Hover effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;