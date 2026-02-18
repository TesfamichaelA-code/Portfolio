import { useState } from 'react';
import { useInView } from '../hooks/useInView';

type SkillCategory = 'languages' | 'frontend' | 'backend' | 'database' | 'mobile';

interface Skill {
  name: string;
  category: SkillCategory;
  logo: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'languages', logo: '/logos/python.svg' },
  { name: 'Java', category: 'languages', logo: '/logos/java.svg' },
  { name: 'Go', category: 'languages', logo: '/logos/go.svg' },
  { name: 'JavaScript', category: 'languages', logo: '/logos/javascript.svg' },
  { name: 'TypeScript', category: 'languages', logo: '/logos/typescript.svg' },
  { name: 'Dart', category: 'languages', logo: '/logos/dart.svg' },
  // Frontend
  { name: 'HTML', category: 'frontend', logo: '/logos/html.svg' },
  { name: 'CSS', category: 'frontend', logo: '/logos/css.svg' },
  { name: 'React', category: 'frontend', logo: '/logos/react.svg' },
  { name: 'Tailwind CSS', category: 'frontend', logo: '/logos/tailwindcss.svg' },
  { name: 'Next.js', category: 'frontend', logo: '/logos/nextjs.svg' },
  // Backend
  { name: 'Node.js', category: 'backend', logo: '/logos/nodejs.svg' },
  { name: 'NestJS', category: 'backend', logo: '/logos/nestjs.svg' },
  { name: 'Go (Gin)', category: 'backend', logo: '/logos/Gin.svg' },
  // Database
  { name: 'MongoDB', category: 'database', logo: '/logos/mongodb.svg' },
  { name: 'MySQL', category: 'database', logo: '/logos/mysql.svg' },
  { name: 'PostgreSQL', category: 'database', logo: '/logos/postgresql.svg' },
  { name: 'Supabase', category: 'database', logo: '/logos/supabase.svg' },
  // Mobile
  { name: 'React Native', category: 'mobile', logo: '/logos/reactnative.svg' },
  { name: 'Flutter', category: 'mobile', logo: '/logos/flutter.svg' },
];

const categoryLabels: Record<SkillCategory, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  mobile: 'Mobile',
};

const categoryColors: Record<SkillCategory, string> = {
  languages: 'from-yellow-400 to-orange-500',
  frontend: 'from-cyan-400 to-blue-500',
  backend: 'from-purple-500 to-pink-500',
  database: 'from-pink-500 to-red-500',
  mobile: 'from-green-400 to-cyan-500',
};

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [ref, isVisible] = useInView({ threshold: 0.1, sectionName: 'skills_section' });

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const getSkillsByCategory = () => {
    const categories: Record<SkillCategory, Skill[]> = {
      languages: [],
      frontend: [],
      backend: [],
      database: [],
      mobile: [],
    };
    
    filteredSkills.forEach(skill => {
      categories[skill.category].push(skill);
    });
    
    return categories;
  };

  const skillsByCategory = getSkillsByCategory();

  return (
    <section
      id="skills"
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
            Skills & Expertise
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-foreground text-surface font-medium'
                : 'bg-surface/30 border border-line-alt text-foreground-sub hover:border-line-alt'
            }`}
          >
            All Skills
          </button>
          
          {(Object.keys(categoryLabels) as SkillCategory[]).map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? `bg-gradient-to-r ${categoryColors[category]} text-white font-medium`
                  : 'bg-surface/30 border border-line-alt text-foreground-sub hover:border-line-alt'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Skills Grid Layout */}
        <div className="space-y-12">
          {(Object.keys(categoryLabels) as SkillCategory[]).map(category => {
            const categorySkills = skillsByCategory[category];
            if (categorySkills.length === 0) return null;

            return (
              <div key={category}>
                <h3 className={`text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${categoryColors[category]}`}>
                  {categoryLabels[category]}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group bg-surface/40 backdrop-blur-sm border border-line rounded-xl p-4 flex flex-col items-center gap-3 hover:border-line-alt transition-all duration-300 hover:bg-surface/60"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                        transition: `opacity 600ms ${index * 60}ms, transform 600ms ${index * 60}ms`,
                      }}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        <img src={skill.logo} alt={skill.name} className="w-8 h-8" loading="lazy" />
                      </div>
                      <span className="text-sm text-foreground-sub group-hover:text-foreground transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block bg-surface/40 backdrop-blur-md border border-purple-500/30 rounded-lg px-6 py-4 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-foreground mb-2">Special Interest</h3>
            <span className="px-4 py-2 bg-surface/50 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
              AI/Machine Learning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;