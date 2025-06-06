import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { trackEvent } from '../utils/analytics';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    title: 'Knowledge Playlist',
    description: 'Distraction-free learning web app for organizing and tracking tutorial resources.',
    image: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Tailwind', 'Shadcn'],
    liveLink: 'https://knowledge-playlist-l8mestrj3-tesfamichaela-codes-projects.vercel.app/'
  },
  {
    title: 'Education App Backend',
    description: 'NestJS backend API for online learning platform.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['NestJS', 'TypeScript', 'MongoDB'],
    liveLink: 'https://educationapp-backend.onrender.com'
  },
  {
    title: 'Java Note App',
    description: 'Desktop note-taking app with MySQL.',
    image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Java', 'MySQL', 'Swing'],
    githubLink: 'https://github.com/TesfamichaelA-code/Java-App'
  }
];

const ProjectsSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black to-black/90 z-0"></div>
      
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-20'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative h-96 rounded-lg overflow-hidden"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ 
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transition: `transform 800ms ${index * 100}ms, opacity 800ms ${index * 100}ms`
              }}
            >
              {/* Glass border */}
              <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-tr from-cyan-500/40 to-purple-500/40 z-10">
                <div className="absolute inset-0 rounded-lg bg-black/80 backdrop-blur-sm"></div>
              </div>
              
              {/* Project image */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-full bg-black/40 backdrop-blur-sm border border-cyan-500/30 text-cyan-300"
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
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 border border-gray-700 text-white text-sm font-medium hover:border-gray-500 transition-all duration-300"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Hover effect */}
              <div 
                className={`absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${
                  hoveredProject === index ? 'opacity-100' : 'opacity-0'
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;