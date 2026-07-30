export type ProjectStatus = 'live' | 'shipped' | 'in progress';

export type ProjectDomain =
	| 'compilers'
	| 'ai / ml'
	| 'backend'
	| 'fintech'
	| 'mobile'
	| 'web'
	| 'education';

export interface Project {
	slug: string;
	title: string;
	tagline: string;
	domain: ProjectDomain;
	status: ProjectStatus;
	period: string;
	description: string;
	highlights: string[];
	stack: string[];
	metrics?: { value: string; label: string }[];
	links?: { label: string; href: string }[];
	/** live screenshot shown on the work page */
	preview?: { src: string; alt: string };
	/** repo exists but isn't public yet */
	repoPrivate?: boolean;
	featured?: boolean;
	/** short mono snippet shown on cards */
	artifact: string;
}

export const projects: Project[] = [
	{
		slug: 'epic-pp',
		title: 'EPIC++ Compiler',
		tagline: 'A statically-typed language that compiles to LLVM IR — designed and built from zero.',
		domain: 'compilers',
		status: 'shipped',
		period: '2025 — 2026',
		description:
			'A complete compiler for EPIC++, my own statically-typed language: integers, floats, booleans, pointers, arrays, strings, and structs, all lowered to LLVM IR. Built with Python, ANTLR4, and llvmlite for a course at EPIC Institute of Technology — and my proudest build to date.',
		highlights: [
			'Two-pass compilation to resolve forward references',
			'Proper lvalue / rvalue distinction in codegen',
			'Stack-based scope management',
			'Type-safe LLVM IR generation via llvmlite'
		],
		stack: ['Python', 'ANTLR4', 'llvmlite', 'LLVM IR'],
		links: [{ label: 'github', href: 'https://github.com/TesfamichaelA-code/epicpp-compiler' }],
		featured: true,
		artifact: 'struct Node { next: *Node; val: i64; }'
	},
	{
		slug: 'ds-ai-assistant',
		title: 'DS AI Assistant',
		tagline: 'A domain-specific RAG assistant for data science, wired together with MCP.',
		domain: 'ai / ml',
		status: 'shipped',
		period: '2025 — 2026',
		description:
			'A retrieval-augmented assistant grounded in the Python Data Science Handbook. A hybrid pipeline fuses semantic vector search (ChromaDB) with BM25 keyword search; embeddings are generated locally with sentence-transformers. An MCP server exposes tools for ML model recommendation and Python code generation, with Google Gemini producing grounded answers.',
		highlights: [
			'Hybrid retrieval: ChromaDB vectors + BM25 keywords',
			'Local embeddings with sentence-transformers',
			'MCP server exposing model-recommendation and codegen tools',
			'Grounded generation with Gemini'
		],
		stack: ['Python', 'ChromaDB', 'BM25', 'Sentence Transformers', 'Gemini', 'MCP'],
		metrics: [
			{ value: '0.93', label: 'retrieval precision' },
			{ value: '4.8/5', label: 'answer relevance' }
		],
		links: [{ label: 'github', href: 'https://github.com/TesfamichaelA-code/ds-ai-assistant' }],
		featured: true,
		artifact: 'retrieve(query) → rerank → ground → answer'
	},
	{
		slug: 'uptime-monitor',
		title: 'Uptime Monitoring Service',
		tagline: 'A production uptime monitor: async health checks, alerts, and a real deployment.',
		domain: 'backend',
		status: 'live',
		period: '2025',
		description:
			'A production-ready uptime monitoring service. FastAPI with JWT auth, asynchronous background health checks via asyncio and aiohttp, PostgreSQL for history, Redis for live status, and automated email alerts on state changes — deployed on an Azure VM behind Nginx with Let’s Encrypt SSL.',
		highlights: [
			'Async health-check workers (asyncio + aiohttp)',
			'JWT authentication',
			'Redis-cached live status, Postgres history',
			'Email alerts on service state change',
			'Azure VM + Nginx reverse proxy + Let’s Encrypt'
		],
		stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Nginx', 'Azure'],
		links: [{ label: 'up-monitor.live', href: 'https://up-monitor.live' }],
		preview: { src: '/previews/uptime-monitor.webp', alt: 'Up Monitor status dashboard login' },
		featured: true,
		artifact: 'GET /status → 200 OK (cached, 12ms)'
	},
	{
		slug: 'chapa-events',
		title: 'Chapa Events & Donations',
		tagline: 'Live ticketing and donations platforms for Ethiopia’s payment gateway.',
		domain: 'fintech',
		status: 'live',
		period: 'Aug — Nov 2025',
		description:
			'At Chapa Financial Technologies I built an events platform where merchants publish events and attendees buy tickets through Chapa’s own gateway, plus a donations platform — both live in production. When the core gateway was redesigned, my senior and I rebuilt 70% of all screens in two weeks, and I helped the backend team optimize Go payment microservices.',
		highlights: [
			'Live at chapa.events and chapa.link/donations',
			'70% of gateway screens rebuilt in a two-week sprint',
			'Go microservice optimization for concurrent payments',
			'API contracts authored on Confluence'
		],
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Go', 'PostgreSQL'],
		metrics: [
			{ value: '300ms', label: 'concurrent payment response' },
			{ value: '2', label: 'products in production' }
		],
		links: [
			{ label: 'chapa.events', href: 'https://chapa.events' },
			{ label: 'chapa.link/donations', href: 'https://chapa.link/donations' }
		],
		preview: { src: '/previews/chapa-events.webp', alt: 'chapa.events — upcoming events and ticketing' },
		featured: true,
		artifact: 'checkout → gateway → 300ms ✓'
	},
	{
		slug: 'empire',
		title: 'Empire — Family Connection',
		tagline: 'A mobile app that keeps families connected across generations.',
		domain: 'mobile',
		status: 'in progress',
		period: '2026 — present',
		description:
			'A React Native app for families: a visual, interactive family tree, real-time 1-on-1 messaging over WebSockets, and shared event planning with RSVPs and notifications.',
		highlights: [
			'Interactive, visual family tree',
			'Real-time messaging via WebSockets',
			'Shared event planning with RSVP + notifications'
		],
		stack: ['React Native', 'WebSockets', 'NestJS'],
		repoPrivate: true,
		artifact: 'tree.render(generations: all)'
	},
	{
		slug: 'edu-wave',
		title: 'Edu Wave',
		tagline: 'A full-stack education platform — Google Classroom meets AnkiDroid.',
		domain: 'education',
		status: 'shipped',
		period: '2024 — 2025',
		description:
			'A full-stack learning platform: course management, student enrollment, teacher and admin dashboards, teacher-authored flashcards, PDF resources, personal notes with split-screen note-taking, and progress tracking.',
		highlights: [
			'Course management + enrollment',
			'Teacher & admin dashboards',
			'Flashcards, PDFs, split-screen notes',
			'Progress tracking'
		],
		stack: ['NestJS', 'React', 'MongoDB'],
		links: [{ label: 'github', href: 'https://github.com/TesfamichaelA-code/EducationApp-backend' }],
		artifact: 'enroll → learn → track'
	},
	{
		slug: 'knowledge-playlist',
		title: 'Knowledge Playlist',
		tagline: 'A cure for tutorial hell: organize resources, track progress, build learning paths.',
		domain: 'web',
		status: 'live',
		period: '2025',
		description:
			'A web app I built to solve my own problem — endless tutorials, no structure. Knowledge Playlist organizes learning resources into ordered paths with progress tracking, so learning has a spine instead of a pile of open tabs.',
		highlights: [
			'Personalized learning paths',
			'Progress tracking per resource',
			'Built to solve my own tutorial-hell problem'
		],
		stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
		links: [
			{ label: 'live site', href: 'https://knowledge-playlist-ten.vercel.app' }
		],
		preview: { src: '/previews/knowledge-playlist.webp', alt: 'Knowledge Playlist — structured learning paths' },
		artifact: 'playlist.next() → keep going'
	},
	{
		slug: 'pilot-prep',
		title: 'Pilot Preparation App',
		tagline: 'Mock exams and interview prep for Ethiopian Airlines pilot admissions.',
		domain: 'mobile',
		status: 'shipped',
		period: '2025',
		description:
			'A Flutter app that helps students prepare for Ethiopian Airlines’ Trainee Pilot and Flight Instructor admission process: mock exams built from real exam questions, a curated interview question database, and visual progress tracking.',
		highlights: [
			'Mock exams from real past questions',
			'Curated interview question database',
			'Visual progress tracking'
		],
		stack: ['Flutter', 'Dart', 'NestJS', 'MongoDB'],
		links: [
			{ label: 'github', href: 'https://github.com/TesfamichaelA-code/Pilot-Preparation-App-Flutter' }
		],
		artifact: 'altitude += practice'
	}
];

export const featuredProjects = projects.filter((p) => p.featured);
