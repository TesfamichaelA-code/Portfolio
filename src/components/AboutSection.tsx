import React from 'react';
import { Code, Server, Database, Wrench } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const AboutSection: React.FC = () => {
  const [ref, isVisible] = useInView({ threshold: 0.1, sectionName: 'about_section' });

  return (
    <section
      id="about"
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
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="p-1 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600">
              <div className="bg-black p-6 md:p-8 rounded-lg backdrop-blur-sm h-full">
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm a full-stack developer with a passion for building powerful apps with clean code and future-focused design. Whether I'm using NestJS to craft scalable backends or React with Tailwind to make responsive frontends, I love creating projects that solve real problems.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  Currently a GDG Mentor and always learning.
                </p>
              </div>
            </div>
            
            {/* Glass effect elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-cyan-500/10 backdrop-blur-sm z-0"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-purple-500/10 backdrop-blur-sm z-0"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-black/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
              <Code className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-2">Frontend</h3>
              <p className="text-gray-400">
                Creating beautiful, responsive interfaces with modern frameworks
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-md border border-purple-500/20 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10">
              <Server className="text-purple-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-2">Backend</h3>
              <p className="text-gray-400">
                Building robust APIs and server-side applications
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-md border border-pink-500/20 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/10">
              <Database className="text-pink-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-2">Database</h3>
              <p className="text-gray-400">
                Designing efficient database schemas and queries
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
              <Wrench className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-2">DevTools</h3>
              <p className="text-gray-400">
                Leveraging modern tools to optimize development workflow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;