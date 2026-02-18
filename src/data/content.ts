export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Community', href: '#community' },
  { name: 'Contact', href: '#contact' },
];

export interface Education {
  title: string;
  institution: string;
  year: string;
  type: 'education' | 'certificate';
}

export const educationItems: Education[] = [
  {
    title: 'Software Engineering',
    institution: 'Addis Ababa University',
    year: 'Current (4th year)',
    type: 'education',
  },
  {
    title: 'Applied GenAI (Diploma)',
    institution: 'Epic Institute of Technology',
    year: '2025',
    type: 'education',
  },
  {
    title: 'Programming Fundamentals',
    institution: 'Udacity',
    year: '2024',
    type: 'certificate',
  },
  {
    title: 'Microsoft Azure Fundamentals',
    institution: 'Percipio/Demera',
    year: '2024',
    type: 'certificate',
  },
  {
    title: 'Hedera Hashgraph Developer',
    institution: 'Hedera',
    year: '2025',
    type: 'certificate',
  },
];

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

export const projects: Project[] = [
  {
    title: 'Knowledge Playlist',
    description:
      'A distraction-free learning web app for organizing and tracking tutorial resources. Built with a component-driven architecture using React and Shadcn UI, featuring playlist management, progress tracking, and a clean responsive interface.',
    image:
      'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Tailwind', 'Shadcn'],
    liveLink: 'https://knowledge-playlist-ten.vercel.app',
    githubLink: 'https://github.com/TesfamichaelA-code',
  },
  {
    title: 'Education App Backend',
    description:
      'A RESTful API for an online learning platform built with NestJS. Implements JWT authentication, role-based access control, course/lesson CRUD operations, and MongoDB integration with Mongoose schemas.',
    image:
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['NestJS', 'TypeScript', 'MongoDB'],
    liveLink: 'https://educationapp-backend.onrender.com',
    githubLink: 'https://github.com/TesfamichaelA-code',
  },
  {
    title: 'Java Note App',
    description:
      'A desktop note-taking application with full CRUD functionality. Uses Java Swing for the GUI and MySQL for persistent storage, with features like search, categorization, and date-stamped entries.',
    image:
      'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Java', 'MySQL', 'Swing'],
    githubLink: 'https://github.com/TesfamichaelA-code/Java-App',
  },
  {
    title: 'Pilot Preparation App',
    description:
      'A cross-platform mobile app for pilot exam preparation built with Flutter and Dart. Features practice tests, study materials, and progress tracking with a TypeScript backend and MongoDB for data persistence.',
    image:
      'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Dart', 'Flutter', 'TypeScript', 'MongoDB'],
    githubLink: 'https://github.com/TesfamichaelA-code/Pilot-Preparation-App-Flutter',
  },
  {
    title: 'Cloud Computing Simulation',
    description:
      'A cloud computing simulation project using CloudSim and GreenCloud frameworks. Models and evaluates cloud infrastructure performance, resource allocation strategies, and energy efficiency metrics.',
    image:
      'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['CloudSim', 'GreenCloud', 'Java'],
    githubLink: 'https://github.com/TesfamichaelA-code/CloudSimProject',
  },
  {
    title: 'EPIC++ Compiler',
    description:
      'A compiler for a custom programming language built with Python, ANTLR4, and llvmlite. Compiles to LLVM IR with support for integer/float/boolean types, control flow, functions, arrays, and string operations.',
    image:
      'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Python', 'ANTLR4', 'llvmlite', 'LLVM'],
    githubLink: 'https://github.com/TesfamichaelA-code/epicpp-compiler',
  },
];
