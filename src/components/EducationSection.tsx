import { GraduationCap, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { educationItems } from '../data/content';

const EducationSection: React.FC = () => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="education"
      ref={ref}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface/90 via-surface to-surface/90 z-0"></div>
      
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-20'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Education & Certificates
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationItems.map((item, index) => (
            <div 
              key={index}
              className="bg-surface/40 backdrop-blur-md border border-line rounded-lg p-6 relative overflow-hidden group transition-all duration-300 hover:border-line-alt hover:shadow-lg hover:shadow-purple-900/10"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: `transform 800ms ${index * 100}ms, opacity 800ms ${index * 100}ms`
              }}
            >
              {/* Background glow */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-purple-500/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  item.type === 'education' 
                    ? 'bg-purple-500/10 text-purple-400' 
                    : 'bg-cyan-500/10 text-cyan-400'
                }`}>
                  {item.type === 'education' ? <GraduationCap size={24} /> : <Award size={24} />}
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-foreground-muted mb-2">{item.institution}</p>
                  <p className="text-sm text-foreground-muted">{item.year}</p>
                </div>
              </div>
              
              {/* Animated border gradient */}
              <div className="absolute inset-0 border border-transparent rounded-lg bg-gradient-to-r from-purple-500/0 via-cyan-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundSize: '200% 100%' }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;