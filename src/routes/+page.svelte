<script lang="ts">
	import { ArrowRight, ArrowUpRight } from '@lucide/svelte';
	import CompileHero from '$lib/components/CompileHero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import RecognitionStrip from '$lib/components/RecognitionStrip.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { featuredProjects } from '$lib/data/projects';
	import { experience } from '$lib/data/experience';
	import { recognitions } from '$lib/data/profile';
	import { posts, formatDate } from '$lib/posts';
	import { site } from '$lib/data/site';

	const capabilities = [
		{
			num: 'a',
			label: 'Backend systems',
			copy: 'FastAPI, NestJS, Gin. Queues, caching, auth, and service boundaries that survive concurrent load — proven on real payment paths.'
		},
		{
			num: 'b',
			label: 'Applied AI / ML',
			copy: 'RAG pipelines, agent orchestration with LangChain and LangGraph, PyTorch models, and human-state research at Synheart AI.'
		},
		{
			num: 'c',
			label: 'Compilers & languages',
			copy: 'Lexing, parsing, type systems, LLVM IR. I designed and built EPIC++ — a statically-typed language with its own compiler.'
		},
		{
			num: 'd',
			label: 'Product engineering',
			copy: 'React, Next.js, Svelte, Flutter, React Native. Interfaces shipped to production for fintech, education, and families.'
		}
	];

	const latestPosts = posts.slice(0, 3);
</script>

<Seo
	title="Tesfamichael Abebe — software engineer · backend, AI & compilers"
	description="Tesfamichael Abebe builds backend systems, AI pipelines, and built his own programming language. Software engineering @ AAU, ML engineering and research @ Synheart."
/>

<section class="recognition-band" aria-label="Latest recognition">
	<div class="shell">
		<RecognitionStrip recognition={recognitions[0]} />
	</div>
</section>

<CompileHero />

<!-- 01 · selected work -->
<section class="shell route" aria-labelledby="work-title">
	<div class="section-head split">
		<div>
			<span class="ir-comment">; ===== 01 · selected work ==============================</span>
			<h2 id="work-title" class="display">Systems with a <span class="accent">visible spine</span>.</h2>
		</div>
		<p class="lede">
			Not thumbnails — working surfaces. What each system does, where the complexity lives, and the
			numbers it answers to.
		</p>
	</div>

	<div class="work-grid">
		{#each featuredProjects as project, i}
			<ProjectCard
				{project}
				index={i}
				wide={i === 0 || i === featuredProjects.length - 1}
				revealDelay={(i % 2) * 90}
			/>
		{/each}
	</div>

	<div class="section-foot">
		<a class="btn" href="/projects">all projects <ArrowRight size={16} aria-hidden="true" /></a>
	</div>
</section>

<!-- 02 · operating range -->
<section class="band" aria-labelledby="range-title">
	<div class="shell route">
		<div class="section-head">
			<div>
				<span class="ir-comment">; ===== 02 · operating range ============================</span>
				<h2 id="range-title" class="display">Define constraints. <span class="accent">Build the machinery.</span></h2>
			</div>
		</div>
		<div class="range-grid">
			{#each capabilities as cap, i}
				<article class="range-item" use:reveal={{ delay: (i % 4) * 80 }}>
					<span class="range-num">fn {cap.num}()</span>
					<h3>{cap.label}</h3>
					<p>{cap.copy}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- 03 · runtime history -->
<section class="shell route" aria-labelledby="history-title">
	<div class="section-head split">
		<div>
			<span class="ir-comment">; ===== 03 · runtime history ============================</span>
			<h2 id="history-title" class="display">Call <span class="accent">stack</span>.</h2>
		</div>
		<p class="lede">
			{experience.length} organizations in two years — payments, AI research, open source, HR
			platforms. Most recent frame on top.
		</p>
	</div>

	<ol class="xp-list" aria-label="Work experience">
		{#each experience as job, i}
			<li use:reveal={{ delay: i * 60 }}>
				<a class="xp-row" href="/about#experience">
					<span class="xp-period">{job.period}</span>
					<span class="xp-company">{job.company}</span>
					<span class="xp-role">{job.role}</span>
					<ArrowUpRight class="xp-arrow" size={16} aria-hidden="true" />
				</a>
			</li>
		{/each}
	</ol>
</section>

<!-- 04 · atlas teaser -->
<section class="shell teaser-wrap" aria-labelledby="atlas-title">
	<a class="atlas-teaser panel hoverable" href="/atlas" use:reveal>
		<svg class="constellation" viewBox="0 0 640 240" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
			<g class="links" stroke="var(--accent-line)" stroke-width="1">
				<line x1="320" y1="120" x2="180" y2="60" />
				<line x1="320" y1="120" x2="470" y2="52" />
				<line x1="320" y1="120" x2="120" y2="170" />
				<line x1="320" y1="120" x2="520" y2="160" />
				<line x1="320" y1="120" x2="420" y2="210" />
				<line x1="180" y1="60" x2="80" y2="90" stroke-dasharray="3 4" />
				<line x1="470" y1="52" x2="560" y2="90" stroke-dasharray="3 4" />
				<line x1="120" y1="170" x2="200" y2="215" stroke-dasharray="3 4" />
			</g>
			<g class="nodes" fill="var(--amber)">
				<circle cx="320" cy="120" r="6" class="pulse" />
				<circle cx="180" cy="60" r="4" />
				<circle cx="470" cy="52" r="4" />
				<circle cx="120" cy="170" r="4" />
				<circle cx="520" cy="160" r="4" />
				<circle cx="420" cy="210" r="4" />
				<circle cx="80" cy="90" r="2.5" fill="var(--mint)" />
				<circle cx="560" cy="90" r="2.5" fill="var(--mint)" />
				<circle cx="200" cy="215" r="2.5" fill="var(--mint)" />
			</g>
		</svg>
		<div class="teaser-copy">
			<span class="ir-comment">; ===== 04 · the atlas ==================================</span>
			<h2 id="atlas-title" class="display">One mind, <span class="accent">mapped</span>.</h2>
			<p class="lede">
				Every project, role, skill, and note in this portfolio is a node in a single connected
				graph. Pull it, drag it, follow an edge.
			</p>
			<span class="btn primary">open the atlas <ArrowRight size={16} aria-hidden="true" /></span>
		</div>
	</a>
</section>

<!-- 05 · field notes -->
<section class="shell route" aria-labelledby="notes-title">
	<div class="section-head split">
		<div>
			<span class="ir-comment">; ===== 05 · field notes ================================</span>
			<h2 id="notes-title" class="display">Written while the <span class="accent">solder cooled</span>.</h2>
		</div>
		<p class="lede">Engineering notes from real builds — compilers, payments, retrieval pipelines.</p>
	</div>

	<div class="notes-grid">
		{#each latestPosts as post, i}
			<a class="note-card panel hoverable" href={`/blog/${post.slug}`} use:reveal={{ delay: i * 90 }}>
				<span class="note-date mono-label">{formatDate(post.date)} · {post.readingTime}</span>
				<h3>{post.title}</h3>
				<p>{post.summary}</p>
				<span class="note-more">read note <ArrowRight size={14} aria-hidden="true" /></span>
			</a>
		{/each}
	</div>
</section>

<!-- contact band -->
<section class="band contact-band" aria-labelledby="contact-title">
	<div class="shell route contact-inner">
		<span class="ir-comment">; ===== eof · linkage ===================================</span>
		<h2 id="contact-title" class="display">
			Have a system worth <span class="accent">building?</span>
		</h2>
		<p class="lede">
			{site.availability}. The fastest channel is email — I read everything.
		</p>
		<div class="contact-actions">
			<a class="btn primary" href={`mailto:${site.email}`}>{site.email}</a>
			<a class="btn" href="/contact">all channels <ArrowUpRight size={16} aria-hidden="true" /></a>
		</div>
	</div>
</section>

<style>
	.recognition-band {
		border-bottom: 1px solid var(--line);
		background: var(--bg-raised);
	}

	.work-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.section-foot {
		display: flex;
		justify-content: flex-end;
		margin-top: 1.4rem;
	}

	.band {
		border-block: 1px solid var(--line);
		background: var(--bg-raised);
	}

	.range-grid {
		display: grid;
		grid-template-columns: 1fr;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
	}

	.range-item {
		display: grid;
		gap: 0.7rem;
		padding: 1.5rem 1.4rem 1.7rem;
		border-bottom: 1px solid var(--line);
	}

	.range-item:last-child {
		border-bottom: 0;
	}

	.range-num {
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.06em;
	}

	.range-item h3 {
		font-size: 1.45rem;
	}

	.range-item p {
		color: var(--ink-dim);
		font-size: 0.95rem;
		line-height: 1.7;
	}

	/* experience rows */
	.xp-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
	}

	.xp-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.2rem 1rem;
		padding: 1.05rem 1.2rem;
		border-bottom: 1px solid var(--line);
		transition: background 0.16s ease;
	}

	li:last-child .xp-row {
		border-bottom: 0;
	}

	.xp-row:hover {
		background: var(--hover-wash);
	}

	.xp-period {
		grid-column: 1 / -1;
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.xp-company {
		color: var(--ink);
		font-family: var(--font-display);
		font-size: 1.35rem;
		line-height: 1.15;
	}

	.xp-role {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.76rem;
		align-self: center;
	}

	.xp-row :global(.xp-arrow) {
		display: none;
		color: var(--muted);
	}

	.xp-row:hover :global(.xp-arrow) {
		color: var(--amber);
	}

	/* atlas teaser */
	.teaser-wrap {
		padding-block: 0 clamp(56px, 8vh, 96px);
	}

	.atlas-teaser {
		position: relative;
		display: grid;
		overflow: hidden;
		min-height: 320px;
	}

	.constellation {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.pulse {
		animation: pulse 2.6s ease-in-out infinite;
		transform-origin: center;
		transform-box: fill-box;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.45; }
	}

	.teaser-copy {
		position: relative;
		display: grid;
		gap: 1rem;
		justify-items: start;
		padding: clamp(1.6rem, 4vw, 3rem);
		background: linear-gradient(
			90deg,
			rgba(var(--bg-rgb), 0.94) 30%,
			rgba(var(--bg-rgb), 0.58)
		);
	}

	/* notes */
	.notes-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.note-card {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		padding: 1.3rem 1.35rem 1.4rem;
	}

	.note-card h3 {
		font-size: 1.45rem;
		line-height: 1.12;
	}

	.note-card:hover h3 {
		color: var(--amber-hot);
	}

	.note-card p {
		color: var(--ink-dim);
		font-size: 0.93rem;
		line-height: 1.65;
		flex: 1;
	}

	.note-date {
		color: var(--amber-dim);
	}

	.note-more {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.06em;
	}

	.note-card:hover .note-more {
		color: var(--amber);
	}

	/* contact band */
	.contact-band {
		border-bottom: 0;
	}

	.contact-inner {
		display: grid;
		gap: 1.1rem;
		justify-items: start;
	}

	.contact-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 0.4rem;
	}

	@media (min-width: 780px) {
		.work-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.range-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.range-item {
			border-right: 1px solid var(--line);
		}

		.range-item:nth-child(2n) {
			border-right: 0;
		}

		.range-item:nth-child(n + 3) {
			border-bottom: 0;
		}

		.xp-row {
			grid-template-columns: 150px 1fr auto auto;
			align-items: center;
			gap: 1.4rem;
		}

		.xp-period {
			grid-column: auto;
		}

		.xp-row :global(.xp-arrow) {
			display: block;
		}

		.notes-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
