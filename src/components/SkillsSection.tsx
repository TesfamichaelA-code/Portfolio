import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools';

interface Skill {
  name: string;
  category: SkillCategory;
  logo: React.ReactNode;
  color: string;
}

// SVG Logo Components
const HTMLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
  </svg>
);

const CSSLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
  </svg>
);

const JavaScriptLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#3178C6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
  </svg>
);

const ReactLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#61DAFB" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.471 0-.92.015-1.36.034a14.88 14.88 0 0 1 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.015 1.36-.034a14.716 14.716 0 0 1-1.36 1.544c-.455-.467-.91-.991-1.36-1.544z"/>
  </svg>
);

const NodeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#339933" d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
  </svg>
);

const MongoDBLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
  </svg>
);

const MySQLLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#4479A1" d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.002c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 1.966.378 3.85.421 5.53zM8.364 13.423h-1.12c-.147.906-.295 1.848-.442 2.826-.087.467-.18.94-.295 1.372h-.01c-.114-.432-.214-.905-.32-1.372a77.66 77.66 0 01-.375-2.826H5.15c-.147.906-.295 1.848-.43 2.826-.087.467-.18.94-.295 1.372h-.008c-.114-.432-.214-.905-.32-1.372a80.625 80.625 0 01-.38-2.826H3.085c.133.982.298 2.054.49 3.200.18 1.064.154 2.227.207 3.85.026.52.072 1.04.118 1.55h.928c.07-.577.118-1.184.118-1.55.147-.906.295-1.848.442-2.826.087-.467.18-.94.295-1.372h.008c.114.432.214.905.32 1.372.147.978.295 1.92.442 2.826 0 .366.048.973.118 1.55h.928c.046-.51.092-1.03.118-1.55.053-1.623.027-2.786.207-3.85.192-1.146.357-2.218.49-3.2zM13.5 18.77c-.214.04-.528.06-.82.06-.291 0-.582-.02-.874-.06-.588-.08-.874-.279-.874-.498 0-.12.13-.24.39-.32.26-.08.6-.12 1.024-.12.424 0 .764.04 1.024.12.26.08.39.2.39.32 0 .219-.286.418-.874.498zM14.107 14.389c-.03-.24-.296-.42-.79-.54-.494-.12-1.14-.18-1.916-.18-.776 0-1.422.06-1.916.18-.494.12-.76.3-.79.54-.014.12.010.24.07.35.177.33.918.51 2.636.51 1.718 0 2.459-.18 2.636-.51.06-.11.084-.23.07-.35z"/>
  </svg>
);

const GitLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#F05032" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path fill="#06B6D4" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
  </svg>
);

const skills: Skill[] = [
  { name: 'HTML', category: 'frontend', logo: <HTMLLogo />, color: 'text-orange-500' },
  { name: 'CSS', category: 'frontend', logo: <CSSLogo />, color: 'text-blue-500' },
  { name: 'Tailwind CSS', category: 'frontend', logo: <TailwindLogo />, color: 'text-cyan-400' },
  { name: 'JavaScript', category: 'frontend', logo: <JavaScriptLogo />, color: 'text-yellow-400' },
  { name: 'TypeScript', category: 'frontend', logo: <TypeScriptLogo />, color: 'text-blue-600' },
  { name: 'React', category: 'frontend', logo: <ReactLogo />, color: 'text-cyan-300' },
  { name: 'Shadcn', category: 'frontend', logo: <div className="w-8 h-8 bg-white rounded text-black flex items-center justify-center font-bold text-sm">UI</div>, color: 'text-purple-400' },
  { name: 'Node.js', category: 'backend', logo: <NodeLogo />, color: 'text-green-500' },
  { name: 'NestJS', category: 'backend', logo: <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm">N</div>, color: 'text-red-500' },
  { name: 'MongoDB', category: 'database', logo: <MongoDBLogo />, color: 'text-green-400' },
  { name: 'MySQL', category: 'database', logo: <MySQLLogo />, color: 'text-blue-400' },
  { name: 'Supabase', category: 'database', logo: <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-sm">S</div>, color: 'text-emerald-400' },
  { name: 'Git', category: 'tools', logo: <GitLogo />, color: 'text-orange-600' },
  { name: 'GitHub', category: 'tools', logo: <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">GH</div>, color: 'text-gray-300' },
  { name: 'Postman', category: 'tools', logo: <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-sm">P</div>, color: 'text-orange-500' },
];

const categoryLabels: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools',
};

const categoryColors: Record<SkillCategory, string> = {
  frontend: 'from-cyan-400 to-blue-500',
  backend: 'from-purple-500 to-pink-500',
  database: 'from-pink-500 to-red-500',
  tools: 'from-green-400 to-cyan-500',
};

const categoryRadii: Record<SkillCategory, number> = {
  frontend: 160,
  backend: 220,
  database: 280,
  tools: 340,
};

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [ref, isVisible] = useInView({ threshold: 0.1, sectionName: 'skills_section' });

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const getSkillsByCategory = () => {
    const categories: Record<SkillCategory, Skill[]> = {
      frontend: [],
      backend: [],
      database: [],
      tools: []
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
            Skills & Expertise
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-white text-black font-medium'
                : 'bg-black/30 border border-gray-700 text-gray-300 hover:border-gray-500'
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
                  : 'bg-black/30 border border-gray-700 text-gray-300 hover:border-gray-500'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Individual Orbital Skills Layout */}
        <div className="relative flex items-center justify-center min-h-[800px]">
          {/* Center Hub */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-1 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                    SKILLS
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {filteredSkills.length} Technologies
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orbital Rings for Each Category */}
          {(Object.keys(categoryLabels) as SkillCategory[]).map(category => {
            const categorySkills = skillsByCategory[category];
            if (categorySkills.length === 0) return null;

            const radius = categoryRadii[category];
            
            return (
              <div key={category} className="absolute inset-0 flex items-center justify-center">
                {/* Orbital Ring Indicator */}
                <div 
                  className={`absolute rounded-full border border-gray-800/30 opacity-30`}
                  style={{
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                  }}
                />
                
                {/* Category Label */}
                <div 
                  className={`absolute text-xs text-gray-500 font-medium`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translateY(-${radius + 20}px)`,
                  }}
                >
                  {categoryLabels[category]}
                </div>
                
                {/* Skills on this orbit */}
                {categorySkills.map((skill, index) => {
                  const totalInCategory = categorySkills.length;
                  const angle = (index * 360) / totalInCategory;
                  const orbitDuration = 20 + (category === 'frontend' ? 0 : category === 'backend' ? 5 : category === 'database' ? 10 : 15);
                  
                  return (
                    <div
                      key={skill.name}
                      className="absolute group"
                      style={{
                        animation: `orbit-${category} ${orbitDuration}s linear infinite`,
                        animationDelay: `${-index * (orbitDuration / totalInCategory)}s`,
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 800ms ${index * 100}ms`,
                        '--orbit-radius': `${radius}px`,
                        '--start-angle': `${angle}deg`,
                      } as React.CSSProperties}
                    >
                      {/* Skill Container */}
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        {/* Rotating Border */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${categoryColors[skill.category]} p-[2px] animate-spin group-hover:animate-pulse`}>
                          <div className="w-full h-full rounded-full bg-black/90 backdrop-blur-sm"></div>
                        </div>
                        
                        {/* Inner rotating ring */}
                        <div className="absolute inset-1 rounded-full bg-gradient-to-l from-cyan-500/20 to-purple-500/20 p-[1px] animate-spin-reverse">
                          <div className="w-full h-full rounded-full bg-black/80"></div>
                        </div>
                        
                        {/* Skill Logo */}
                        <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                          {skill.logo}
                        </div>
                        
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${categoryColors[skill.category]} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
                        
                        {/* Skill Name - Always Visible */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-none">
                          <div className="bg-black/90 backdrop-blur-sm border border-gray-700 rounded px-3 py-1 text-xs text-white whitespace-nowrap group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-all duration-300">
                            {skill.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg px-6 py-4 group hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-lg font-medium text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">Special Interest</h3>
            <div className="flex items-center justify-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <span className="relative px-4 py-2 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-400 text-sm group-hover:text-cyan-300 group-hover:border-cyan-500/50 transition-all duration-300">
                  🤖 AI/Machine Learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;