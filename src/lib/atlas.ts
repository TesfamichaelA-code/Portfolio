import { projects } from '$lib/data/projects';
import { experience } from '$lib/data/experience';
import { posts } from '$lib/posts';
import { site } from '$lib/data/site';

export type AtlasGroup = 'self' | 'domain' | 'project' | 'experience' | 'note' | 'skill';

export interface AtlasNode {
	id: string;
	label: string;
	group: AtlasGroup;
	val: number;
	sub?: string;
	desc?: string;
	href?: string;
}

export interface AtlasLink {
	source: string;
	target: string;
}

export const groupColors: Record<AtlasGroup, string> = {
	self: '#ffb454',
	domain: '#ece5d8',
	project: '#ffcf87',
	experience: '#99ffe4',
	note: '#ff9592',
	skill: '#8a8274'
};

export const groupLabels: Record<AtlasGroup, string> = {
	self: 'me',
	domain: 'domains',
	project: 'projects',
	experience: 'experience',
	note: 'notes',
	skill: 'skills'
};

const domainLabels: Record<string, string> = {
	compilers: 'Compilers',
	'ai / ml': 'AI / ML',
	backend: 'Backend',
	fintech: 'Fintech',
	mobile: 'Mobile',
	web: 'Web',
	education: 'Education'
};

/** skill → domain placement (a curated subset, not the full CV list) */
const skillMap: Record<string, string> = {
	'LLVM IR': 'compilers',
	ANTLR4: 'compilers',
	Python: 'ai / ml',
	PyTorch: 'ai / ml',
	LangChain: 'ai / ml',
	LangGraph: 'ai / ml',
	RAG: 'ai / ml',
	MCP: 'ai / ml',
	Go: 'backend',
	Rust: 'backend',
	FastAPI: 'backend',
	NestJS: 'backend',
	PostgreSQL: 'backend',
	Redis: 'backend',
	Docker: 'backend',
	TypeScript: 'web',
	React: 'web',
	'Next.js': 'web',
	SvelteKit: 'web',
	Flutter: 'mobile',
	'React Native': 'mobile'
};

/** extra meaningful edges: experience ↔ project / domain */
const experienceEdges: Record<string, string[]> = {
	synheart: ['domain:ai / ml'],
	chapa: ['project:chapa-events', 'domain:fintech'],
	gebeya: ['domain:backend', 'domain:web'],
	efuyegela: ['domain:web'],
	icog: ['domain:ai / ml']
};

export function buildAtlas(): { nodes: AtlasNode[]; links: AtlasLink[] } {
	const nodes: AtlasNode[] = [];
	const links: AtlasLink[] = [];

	nodes.push({
		id: 'self',
		label: 'Tesfamichael',
		group: 'self',
		val: 26,
		sub: site.role,
		desc: site.tagline,
		href: '/about'
	});

	const domains = [...new Set(projects.map((p) => p.domain))];
	for (const domain of domains) {
		nodes.push({
			id: `domain:${domain}`,
			label: domainLabels[domain] ?? domain,
			group: 'domain',
			val: 10,
			sub: 'domain'
		});
		links.push({ source: 'self', target: `domain:${domain}` });
	}

	for (const project of projects) {
		nodes.push({
			id: `project:${project.slug}`,
			label: project.title,
			group: 'project',
			val: 7,
			sub: `${project.status} · ${project.period}`,
			desc: project.tagline,
			href: `/projects#${project.slug}`
		});
		links.push({ source: `domain:${project.domain}`, target: `project:${project.slug}` });
	}

	for (const job of experience) {
		nodes.push({
			id: `xp:${job.slug}`,
			label: job.company,
			group: 'experience',
			val: 8,
			sub: `${job.role} · ${job.period}`,
			desc: job.summary,
			href: '/about#experience'
		});
		links.push({ source: 'self', target: `xp:${job.slug}` });
		for (const target of experienceEdges[job.slug] ?? []) {
			links.push({ source: `xp:${job.slug}`, target });
		}
	}

	for (const post of posts) {
		nodes.push({
			id: `post:${post.slug}`,
			label: post.title,
			group: 'note',
			val: 5,
			sub: post.series ? `${post.series} · ${post.readingTime}` : `field note · ${post.readingTime}`,
			desc: post.summary,
			href: `/blog/${post.slug}`
		});
		// `related` may point at a project or an experience slug
		let related = 'self';
		if (post.related) {
			if (projects.some((p) => p.slug === post.related)) related = `project:${post.related}`;
			else if (experience.some((x) => x.slug === post.related)) related = `xp:${post.related}`;
		}
		links.push({ source: related, target: `post:${post.slug}` });
	}

	for (const [skill, domain] of Object.entries(skillMap)) {
		nodes.push({
			id: `skill:${skill}`,
			label: skill,
			group: 'skill',
			val: 3,
			sub: 'skill'
		});
		links.push({ source: `domain:${domain}`, target: `skill:${skill}` });
	}

	return { nodes, links };
}
