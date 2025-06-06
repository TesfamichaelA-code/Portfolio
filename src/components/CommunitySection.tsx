import React from 'react';
import { Users } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const CommunitySection: React.FC = () => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="community"
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
            Community Involvement
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
            {/* Background glow effects */}
            <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -left-24 -top-24 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="p-4 rounded-full bg-purple-500/10 text-purple-400">
                <Users size={40} />
              </div>
              
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">GDG AAU Mentor</h3>
                <p className="text-gray-300 mb-4">1 year mentoring experience</p>
                <p className="text-gray-400">
                  Passionate about sharing knowledge and helping others grow in their development journey.
                  As a GDG mentor at Addis Ababa University, I guide students on web development
                  fundamentals and modern frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;