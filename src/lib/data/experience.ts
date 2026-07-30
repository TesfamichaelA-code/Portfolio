export interface Experience {
	slug: string;
	company: string;
	role: string;
	period: string;
	summary: string;
	points: string[];
	note?: string;
}

export const experience: Experience[] = [
	{
		slug: 'synheart',
		company: 'Synheart AI',
		role: 'ML Engineer & Researcher',
		period: 'Jun 2026 — present',
		summary:
			'Engineering and researching machine-learning systems for kinematics and human state recognition — modeling activity states, postural states, locomotion, and movement regularities.',
		points: [
			'Experiment with and train models for human state recognition',
			'Collect datasets; read and summarize research papers',
			'Propose system architectures',
			'Exploring integration into a Human State Inference (HSI) model'
		]
	},
	{
		slug: 'icog',
		company: 'iCog Labs',
		role: 'AI Engineer Intern',
		period: 'Jan — May 2026',
		summary:
			'Contributed across two teams at Ethiopia’s pioneering AI lab.',
		points: [
			'Consistent open-source contributions to the Cordial Miners repository',
			'Contributed to the OpenPsi codebase in the MeTTa programming language'
		]
	},
	{
		slug: 'chapa',
		company: 'Chapa Financial Technologies S.C',
		role: 'Frontend Engineer',
		period: 'Aug — Nov 2025',
		summary:
			'Built and shipped production payment products for Ethiopia’s leading payment gateway.',
		points: [
			'Built the events platform (live at chapa.events) and donations platform (chapa.link/donations)',
			'Rebuilt 70% of all gateway screens in two weeks with my senior during the redesign — Next.js, TypeScript, Tailwind CSS',
			'Helped the backend team optimize Go payment microservices: 300ms responses under concurrent load, race conditions eliminated',
			'Wrote API contracts on Confluence; met every sprint deadline on Jira'
		]
	},
	{
		slug: 'gebeya',
		company: 'Gebeya Inc',
		role: 'Full Stack Developer',
		period: 'Jul — Sep 2025',
		summary:
			'Built a Jira-like HR management application and wired single sign-on across three internal platforms.',
		points: [
			'React frontend, NestJS backend, Jest test suite',
			'Integrated Keycloak SSO across three interconnected platforms: HR management, recruitment, and KPI rewards',
			'Built the integration logic so data flowed between apps and each responded to the others’ state'
		]
	},
	{
		slug: 'efuyegela',
		company: 'Efuyegela',
		role: 'Full Stack Developer Intern',
		period: 'Jun — Jul 2025',
		summary: 'A brief, focused full-stack development internship.',
		points: []
	}
];
