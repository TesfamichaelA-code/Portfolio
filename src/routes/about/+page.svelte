<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { experience } from '$lib/data/experience';
	import { education, skills, certifications, community, recognitions } from '$lib/data/profile';
	import { site } from '$lib/data/site';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';

	const skillGroups = [
		{ label: 'languages', items: skills.languages },
		{ label: 'frameworks', items: skills.frameworks },
		{ label: 'ai / ml', items: skills.ai },
		{ label: 'data science', items: skills.data },
		{ label: 'devops & cloud', items: skills.devops },
		{ label: 'databases', items: skills.databases },
		{ label: 'other', items: skills.other }
	];
</script>

<Seo
	title="Profile"
	description="Tesfamichael Abebe — software engineering student at Addis Ababa University, ML engineer and researcher at Synheart, builder of EPIC++."
/>

<div class="shell route">
	<!-- header -->
	<header class="section-head">
		<div>
			<span class="ir-comment">; ===== profile · who wrote this program ================</span>
			<h1 class="display">The <span class="accent">author</span> block.</h1>
		</div>
	</header>

	<div class="bio-grid">
		<div class="bio-copy">
			<p>
				I'm <strong>{site.name}</strong> — a software engineer from Addis Ababa with a strong
				foundation in full-stack development, backend AI engineering, and applied machine learning.
			</p>
			<p>
				I'm pursuing a BSc in Software Engineering at Addis Ababa University, and I recently
				completed a diploma in Applied Generative AI at EPIC Institute of Technology — which is where
				I built <a href="/projects#epic-pp">EPIC++</a>, my own statically-typed language and compiler,
				still my proudest work. Right now I work as an ML engineer and researcher at Synheart,
				modeling human states from kinematics, and write Rust for an open-source consensus protocol
				at iCog Labs.
			</p>
			<p>
				The pattern across everything I build: understand the machine one layer deeper than the job
				strictly requires. It's why a frontend internship at a payment gateway turned into Go
				microservice optimization, and why a course assignment turned into a compiler.
			</p>
		</div>
		<aside class="bio-side">
			<figure class="portrait" use:reveal>
				<img
					src="/tesfamichael.webp"
					alt="Portrait of Tesfamichael Abebe"
					width="820"
					height="734"
				/>
				<figcaption class="mono-label">; author — addis ababa</figcaption>
			</figure>
			<div class="bio-facts panel">
				<div><span class="fact-key">location</span><span>{site.location}</span></div>
				<div><span class="fact-key">degree</span><span>Software Engineering, AAU '27</span></div>
				<div><span class="fact-key">currently</span><span>ML Engineer & Researcher @ Synheart</span></div>
				<div><span class="fact-key">status</span><span class="status live">open to work</span></div>
			</div>
		</aside>
	</div>

	<!-- experience -->
	<section id="experience" class="block" aria-labelledby="xp-title">
		<span class="ir-comment">; ===== experience · reverse chronological ==============</span>
		<h2 id="xp-title" class="display">Where I've <span class="accent">shipped</span>.</h2>

		<ol class="timeline">
			{#each experience as job}
				<li class="tl-item" use:reveal>
					<div class="tl-rail" aria-hidden="true"><span class="tl-dot"></span></div>
					<div class="tl-body">
						<span class="tl-period mono-label">{job.period}</span>
						<h3>{job.company}</h3>
						<p class="tl-role">{job.role}</p>
						<p class="tl-summary">{job.summary}</p>
						{#if job.points.length}
							<ul class="tl-points">
								{#each job.points as point}
									<li>{point}</li>
								{/each}
							</ul>
						{/if}
						{#if job.note}
							<p class="tl-note">; {job.note}</p>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<!-- education -->
	<section class="block" aria-labelledby="edu-title">
		<span class="ir-comment">; ===== education · two tracks, in parallel =============</span>
		<h2 id="edu-title" class="display">Trained <span class="accent">on</span>.</h2>

		<div class="edu-grid">
			{#each education as school, i}
				<article class="edu-card panel" use:reveal={{ delay: i * 100 }}>
					<span class="mono-label">{school.period}</span>
					<h3>{school.institution}</h3>
					<p class="edu-cred">{school.credential}</p>
					<ul class="edu-details">
						{#each school.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
					{#if school.certificateUrl}
						<a class="cert-view edu-cert" href={school.certificateUrl} target="_blank" rel="noreferrer">
							view certificate <ArrowUpRight size={13} aria-hidden="true" />
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</section>

	<!-- skills -->
	<section class="block" aria-labelledby="skills-title">
		<span class="ir-comment">; ===== symbols · exported and linked ===================</span>
		<h2 id="skills-title" class="display">Symbol <span class="accent">table</span>.</h2>

		<div class="skills-table panel">
			{#each skillGroups as group}
				<div class="skill-row">
					<span class="skill-key">{group.label}</span>
					<div class="chip-row">
						{#each group.items as item}
							<span class="chip">{item}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- community + certs -->
	<section class="block two-col" aria-label="Community, recognition, and certifications">
		<div>
			<span class="ir-comment">; ===== practice · daily reps ===========================</span>
			<h2 class="display small">Competitive <span class="accent">programming</span>.</h2>
			<p class="lede">{community.intro}</p>
			<ul class="link-list">
				{#each community.items as item}
					<li>
						<a href={item.href} target="_blank" rel="noreferrer">
							{item.label} <ArrowUpRight size={14} aria-hidden="true" />
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<span class="ir-comment">; ===== recognition + certifications ===================</span>
			<h2 class="display small">Proof of <span class="accent">work</span>.</h2>
			<ul class="cert-list">
				{#each recognitions as recognition}
					<li class="recognition-cert">
						<a href={recognition.certificateUrl} target="_blank" rel="noreferrer">
							<span class="cert-name">
								{recognition.title} — <em>{recognition.result}</em>
							</span>
							<span class="cert-meta mono-label">
								{recognition.date} · {recognition.location}
							</span>
							<span class="cert-view">
								view certificate <ArrowUpRight size={13} aria-hidden="true" />
							</span>
						</a>
					</li>
				{/each}
				{#each certifications as cert}
					<li class="certificate-cert">
						<a href={cert.certificateUrl} target="_blank" rel="noreferrer">
							<span class="certificate-copy">
								<span class="cert-name">{cert.name}</span>
								<span class="cert-meta mono-label">{cert.issuer} · {cert.date}</span>
							</span>
							<span class="cert-open">
								view <ArrowUpRight size={13} aria-hidden="true" />
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>

<style>
	.section-head > div {
		min-width: 0;
	}

	.bio-grid {
		display: grid;
		gap: 1.6rem;
		margin-bottom: clamp(3rem, 7vw, 5rem);
	}

	.bio-copy {
		display: grid;
		gap: 1.1rem;
		max-width: 64ch;
		color: var(--ink-dim);
		font-size: 1.08rem;
		line-height: 1.8;
	}

	.bio-copy strong {
		color: var(--ink);
		font-weight: 620;
	}

	.bio-copy a {
		color: var(--amber);
		text-decoration: underline;
		text-decoration-color: var(--accent-underline);
		text-underline-offset: 3px;
	}

	.bio-side {
		align-self: start;
		display: grid;
		gap: 1rem;
	}

	.portrait {
		position: relative;
		margin: 0;
		border: 1px solid var(--line);
		border-radius: 12px;
		overflow: hidden;
		background:
			radial-gradient(
				130% 100% at 50% 12%,
				var(--accent-glow),
				var(--accent-soft) 55%,
				transparent
			),
			var(--bg-raised);
	}

	.portrait img {
		display: block;
		width: 100%;
		height: auto;
		padding-top: 1.4rem;
		filter: saturate(0.94) contrast(1.03);
	}

	.portrait::after {
		content: '';
		position: absolute;
		inset: auto 0 0 0;
		height: 90px;
		background: linear-gradient(transparent, var(--portrait-fade));
		pointer-events: none;
	}

	.portrait figcaption {
		position: absolute;
		left: 14px;
		bottom: 11px;
		z-index: 1;
		color: var(--amber-dim);
		text-transform: lowercase;
	}

	.bio-facts {
		display: grid;
		padding: 0.4rem 0;
	}

	.bio-facts > div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.8rem 1.15rem;
		border-bottom: 1px solid var(--line);
		font-size: 0.9rem;
	}

	.bio-facts > div:last-child {
		border-bottom: 0;
	}

	.fact-key {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.block {
		margin-top: clamp(3.2rem, 7vw, 5.2rem);
		scroll-margin-top: 92px;
	}

	.block .display {
		margin-bottom: clamp(1.6rem, 3vw, 2.4rem);
	}

	.display.small {
		font-size: clamp(1.9rem, 3.6vw, 2.6rem);
	}

	/* timeline */
	.timeline {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.tl-item {
		display: grid;
		grid-template-columns: 20px minmax(0, 1fr);
		gap: 1.1rem;
	}

	.tl-rail {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.tl-rail::before {
		content: '';
		position: absolute;
		top: 6px;
		bottom: -6px;
		width: 1px;
		background: var(--line-strong);
	}

	.tl-item:last-child .tl-rail::before {
		bottom: auto;
		height: 100%;
		background: linear-gradient(var(--line-strong), transparent);
	}

	.tl-dot {
		position: relative;
		z-index: 1;
		width: 11px;
		height: 11px;
		margin-top: 6px;
		border-radius: 50%;
		background: var(--bg);
		border: 2px solid var(--amber);
		box-shadow: 0 0 10px var(--accent-glow);
	}

	.tl-body {
		display: grid;
		gap: 0.45rem;
		padding-bottom: 2.6rem;
	}

	.tl-period {
		color: var(--amber-dim);
	}

	.tl-body h3 {
		font-size: clamp(1.55rem, 3vw, 2rem);
	}

	.tl-role {
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.05em;
	}

	.tl-summary {
		color: var(--ink-dim);
		line-height: 1.7;
		max-width: 64ch;
	}

	.tl-points {
		list-style: none;
		margin: 0.35rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.4rem;
	}

	.tl-points li {
		position: relative;
		padding-left: 1.35rem;
		color: var(--ink-dim);
		font-size: 0.93rem;
		line-height: 1.6;
	}

	.tl-points li::before {
		content: '->';
		position: absolute;
		left: 0;
		top: 0.18em;
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}

	.tl-note {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.76rem;
		font-style: italic;
	}

	/* education */
	.edu-grid {
		display: grid;
		gap: 1rem;
	}

	.edu-card {
		display: grid;
		gap: 0.55rem;
		padding: 1.4rem 1.5rem 1.5rem;
	}

	.edu-card h3 {
		font-size: 1.6rem;
	}

	.edu-cred {
		color: var(--amber);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.04em;
	}

	.edu-details {
		list-style: none;
		margin: 0.4rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.4rem;
	}

	.edu-details li {
		position: relative;
		padding-left: 1.2rem;
		color: var(--ink-dim);
		font-size: 0.92rem;
		line-height: 1.65;
	}

	.edu-cert:hover {
		color: var(--amber-hot);
	}

	.edu-details li::before {
		content: '·';
		position: absolute;
		left: 0.3rem;
		color: var(--amber-dim);
	}

	/* skills */
	.skills-table {
		display: grid;
	}

	.skill-row {
		display: grid;
		gap: 0.6rem;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--line);
	}

	.skill-row:last-child {
		border-bottom: 0;
	}

	.skill-key {
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	/* community + certs */
	.two-col {
		display: grid;
		gap: 3rem;
	}

	.two-col > div {
		min-width: 0;
	}

	.two-col .display {
		margin-bottom: 1.2rem;
	}

	.two-col .lede {
		margin-bottom: 1.2rem;
	}

	.link-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.6rem;
	}

	.link-list a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--amber);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		border-bottom: 1px solid var(--accent-line);
		padding-bottom: 2px;
		width: fit-content;
	}

	.link-list a:hover {
		color: var(--amber-hot);
		border-color: var(--amber-hot);
	}

	.cert-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
	}

	.cert-list li {
		display: grid;
		gap: 0.2rem;
		padding: 0.9rem 1.15rem;
		border-bottom: 1px solid var(--line);
	}

	.cert-list li:last-child {
		border-bottom: 0;
	}

	.cert-name {
		color: var(--ink);
		font-size: 0.98rem;
	}

	.cert-list .certificate-cert {
		padding: 0;
	}

	.certificate-cert a {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		gap: 1rem;
		padding: 0.9rem 1.15rem;
		transition: background 0.16s ease;
	}

	.certificate-cert a:hover {
		background: var(--hover-wash);
	}

	.certificate-copy {
		display: grid;
		gap: 0.2rem;
		min-width: 0;
	}

	.cert-open {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--amber);
		font-family: var(--font-mono);
		font-size: 0.66rem;
		font-weight: 550;
		letter-spacing: 0.05em;
		transition: color 0.16s ease;
	}

	.certificate-cert a:hover .cert-open {
		color: var(--amber-hot);
	}

	.recognition-cert {
		padding: 0 !important;
		background: var(--accent-soft);
	}

	.recognition-cert a {
		display: grid;
		gap: 0.25rem;
		padding: 1rem 1.15rem;
		transition: background 0.16s ease;
	}

	.recognition-cert a:hover {
		background: var(--hover-wash);
	}

	.recognition-cert .cert-name {
		font-family: var(--font-display);
		font-size: 1.08rem;
		line-height: 1.25;
	}

	.recognition-cert .cert-name em,
	.cert-view {
		color: var(--amber);
	}

	.cert-view {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		justify-self: start;
		margin-top: 0.35rem;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 550;
		letter-spacing: 0.05em;
	}

	@media (min-width: 860px) {
		.bio-grid {
			grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.8fr);
			gap: 3rem;
		}

		.edu-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.skill-row {
			grid-template-columns: 170px minmax(0, 1fr);
			align-items: baseline;
		}

		.tl-item {
			gap: 1.6rem;
		}

		.two-col {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
