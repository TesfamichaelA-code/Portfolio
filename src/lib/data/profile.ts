import { site } from '$lib/data/site';

export const education = [
	{
		institution: 'Addis Ababa University',
		credential: 'BSc, Software Engineering',
		period: '2023 — 2027',
		details: [
			'Operating Systems',
			'Databases',
			'Computer Architecture',
			'Data Structures & Algorithms',
			'Cryptography',
			'Enterprise Network Security'
		]
	},
	{
		institution: 'EPIC Institute of Technology',
		credential: 'Diploma, Applied Generative AI',
		period: 'Sep 2025 — Jun 2026',
		/** certificate of completion, No. EIOT260005, issued 1 Sep 2026 */
		certificateUrl: 'https://drive.google.com/file/d/1FXvW-fdYn-UmDj4LiCfDC7tpNn865f6P/view',
		details: [
			'Semester 1: algorithms & data structures, data science (Kaggle competitions), advanced programming languages — built the EPIC++ compiler, mathematics & statistics',
			'Semester 2: systems architecture & distributed protocols in Rust, networks & cloud engineering (AWS, Docker), applied generative AI — prompt engineering, agent orchestration, LangChain, LangGraph'
		]
	}
];

export const skills = {
	languages: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'Java', 'Dart'],
	frameworks: ['React', 'Next.js', 'React Native', 'Flutter', 'FastAPI', 'NestJS', 'Gin'],
	ai: ['PyTorch', 'LangChain', 'LangGraph', 'ChromaDB', 'Sentence Transformers', 'RAG', 'MCP'],
	data: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
	devops: ['Docker', 'Nginx', 'AWS', 'Azure'],
	databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
	other: ['Keycloak', 'JWT', 'WebSockets', 'REST APIs', 'LLVM IR']
};

type Certification = {
	name: string;
	issuer: string;
	date: string;
	certificateUrl: string;
};

export const certifications: Certification[] = [
	{
		name: 'Microsoft Azure Fundamentals Journey',
		issuer: 'Microsoft',
		date: 'Nov 18, 2024',
		certificateUrl: 'https://drive.google.com/file/d/1hNt1kMA1Z3dVXjS7qkBsffYYLv3_5Pgf/view'
	},
	{
		name: 'Foundations of Git',
		issuer: 'GitKraken',
		date: 'Jul 13, 2025',
		certificateUrl:
			'https://drive.google.com/file/d/1K-1R4bqxhEeuTpUIqsBdPgSnCWk5ZioH/view?usp=sharing'
	},
	{
		name: 'Hashgraph Developer',
		issuer: 'The Hashgraph Association',
		date: 'Jul 12, 2025',
		certificateUrl:
			'https://drive.google.com/file/d/18c6u0fyWsCW2eQTIgAtW8ObLS7UF2tX2/view?usp=sharing'
	},
	{
		name: 'Complete Intro to Computer Science',
		issuer: 'Frontend Masters / Master.dev',
		date: 'Jul 6, 2025',
		certificateUrl:
			'https://static.frontendmasters.com/ud/c/fe0c1c7b1c/qHdtZgDFSD/computer-science-v2.pdf'
	}
];

export const recognitions = [
	{
		title: 'Cursor AI Hackathon Ethiopia',
		result: 'Winner',
		date: 'Jul 25–26, 2026',
		location: 'Addis Ababa, Ethiopia',
		certificateUrl:
			'https://drive.google.com/file/d/1drj-tXGgOAswyWJd-TT9aYveZhA3zeY9/view?usp=sharing'
	}
];

export const community = {
	intro:
		'I joined A2SV (Africa to Silicon Valley) this year and solve problems on LeetCode and Codeforces consistently.',
	items: [
		{ label: 'A2SV solutions repo', href: site.links.a2svRepo },
		{ label: 'LeetCode', href: site.links.leetcode },
		{ label: 'Codeforces', href: site.links.codeforces }
	]
};
