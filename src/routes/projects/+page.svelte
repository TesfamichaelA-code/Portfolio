<script lang="ts">
	import { ArrowUpRight, Lock } from '@lucide/svelte';
	import { projects } from '$lib/data/projects';
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<Seo
	title="Work"
	description="Build artifacts: a compiler for a custom language, RAG pipelines, production payment platforms, uptime monitoring, and mobile products."
/>

<div class="shell route">
	<header class="section-head split">
		<div>
			<span class="ir-comment">; ===== work · {projects.length} artifacts linked ========================</span>
			<h1 class="display">Build <span class="accent">artifacts</span>.</h1>
		</div>
		<p class="lede">
			Each entry is a system that exists — compiled, deployed, or in active development. Sorted
			roughly by how much of the machine I had to understand to build it.
		</p>
	</header>

	<ol class="artifact-list">
		{#each projects as project, i}
			<li
				id={project.slug}
				class="artifact panel hoverable"
				class:has-preview={project.preview}
				use:reveal={{ delay: (i % 2) * 90 }}
			>
				<aside class="meta">
					<span class="idx">{String(i + 1).padStart(2, '0')}</span>
					<span class={`status ${project.status.replace(' ', '-')}`}>{project.status}</span>
					<span class="meta-line">{project.period}</span>
					<span class="meta-line domain">{project.domain}</span>
				</aside>

				<div class="body">
					<h2>{project.title}</h2>
					<p class="tagline">{project.tagline}</p>
					<code class="artifact-snippet" aria-hidden="true">{project.artifact}</code>
					<p class="description">{project.description}</p>

					<ul class="highlights" aria-label="Highlights">
						{#each project.highlights as h}
							<li>{h}</li>
						{/each}
					</ul>

					{#if project.metrics}
						<div class="metrics" aria-label="Metrics">
							{#each project.metrics as metric}
								<div>
									<strong>{metric.value}</strong>
									<span>{metric.label}</span>
								</div>
							{/each}
						</div>
					{/if}

					<div class="foot">
						<div class="chip-row">
							{#each project.stack as tech}
								<span class="chip">{tech}</span>
							{/each}
						</div>
						{#if project.links || project.repoPrivate}
							<div class="links">
								{#each project.links ?? [] as link}
									<a class="live-link" href={link.href} target="_blank" rel="noreferrer">
										{link.label} <ArrowUpRight size={14} aria-hidden="true" />
									</a>
								{/each}
								{#if project.repoPrivate}
									<span class="private-tag">
										<Lock size={12} aria-hidden="true" /> repo: private, for now
									</span>
								{/if}
							</div>
						{/if}
					</div>
				</div>

				{#if project.preview}
					<figure class="preview-frame">
						<div class="pf-bar" aria-hidden="true">
							<span class="pf-dot"></span><span class="pf-dot"></span><span class="pf-dot"></span>
							<span class="pf-url">{project.links?.[0]?.label ?? 'preview'}</span>
						</div>
						{#if project.links?.[0]}
							<a
								class="pf-shot"
								href={project.links[0].href}
								target="_blank"
								rel="noreferrer"
								aria-label={`Open ${project.title} live`}
							>
								<img
									src={project.preview.src}
									alt={project.preview.alt}
									width={project.preview.width}
									height={project.preview.height}
									loading="lazy"
								/>
							</a>
						{:else}
							<div class="pf-shot">
								<img
									src={project.preview.src}
									alt={project.preview.alt}
									width={project.preview.width}
									height={project.preview.height}
									loading="lazy"
								/>
							</div>
						{/if}
					</figure>
				{/if}
			</li>
		{/each}
	</ol>
</div>

<style>
	.artifact-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.1rem;
	}

	.artifact {
		display: grid;
		gap: 1.2rem;
		padding: clamp(1.3rem, 3vw, 2rem);
		scroll-margin-top: 92px;
	}

	.artifact:target {
		border-color: var(--accent-line-strong);
		box-shadow:
			0 0 0 1px var(--accent-line),
			0 0 42px var(--accent-soft);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 1.2rem;
	}

	.idx {
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		letter-spacing: 0.1em;
	}

	.meta-line {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.domain {
		color: var(--ink-dim);
	}

	.body {
		display: grid;
		gap: 0.95rem;
	}

	h2 {
		font-size: clamp(1.8rem, 3.6vw, 2.6rem);
	}

	.tagline {
		color: var(--ink);
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.artifact-snippet {
		display: block;
		width: fit-content;
		max-width: 100%;
		border-left: 2px solid var(--accent-line);
		border-radius: 0 6px 6px 0;
		padding: 0.5rem 0.9rem;
		background: var(--code-bg);
		color: var(--amber);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		overflow-x: auto;
		white-space: nowrap;
	}

	.description {
		color: var(--ink-dim);
		line-height: 1.75;
		max-width: 68ch;
	}

	.highlights {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.45rem 1.6rem;
	}

	.highlights li {
		position: relative;
		padding-left: 1.35rem;
		color: var(--ink-dim);
		font-size: 0.92rem;
		line-height: 1.55;
	}

	.highlights li::before {
		content: '->';
		position: absolute;
		left: 0;
		top: 0.18em;
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}

	.metrics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.metrics div {
		display: grid;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 0.65rem 1rem;
		min-width: 130px;
	}

	.metrics strong {
		color: var(--mint);
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 1.1;
	}

	.metrics span {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}

	.foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		margin-top: 0.3rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
	}

	.live-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--amber);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		border-bottom: 1px solid var(--accent-line);
		padding-bottom: 1px;
		transition: color 0.16s ease, border-color 0.16s ease;
	}

	.live-link:hover {
		color: var(--amber-hot);
		border-color: var(--amber-hot);
	}

	.private-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.04em;
	}

	/* live-site preview in a little browser frame */
	.preview-frame {
		margin: 0;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
		background: var(--preview-bg);
		align-self: start;
		transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.3s ease;
	}

	.preview-frame:hover {
		border-color: var(--accent-line-strong);
		box-shadow: 0 14px 44px var(--shadow-elevated), 0 0 28px var(--accent-glow);
		transform: translateY(-3px);
	}

	.pf-bar {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		border-bottom: 1px solid var(--line);
		padding: 0.5rem 0.75rem;
	}

	.pf-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(var(--ink-rgb), 0.14);
	}

	.pf-url {
		margin-left: 0.45rem;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.05em;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.pf-shot {
		display: block;
		overflow: hidden;
	}

	.pf-shot img {
		display: block;
		width: 100%;
		height: auto;
		transform: scale(1.005);
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.preview-frame:hover .pf-shot img {
		transform: scale(1.035);
	}

	@media (min-width: 900px) {
		.artifact {
			grid-template-columns: 170px minmax(0, 1fr);
		}

		.artifact.has-preview .preview-frame {
			grid-column: 2;
		}

		.meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.7rem;
		}

		.highlights {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1150px) {
		.artifact.has-preview {
			grid-template-columns: 170px minmax(0, 1fr) 340px;
		}

		.artifact.has-preview .preview-frame {
			grid-column: 3;
			position: sticky;
			top: 96px;
		}
	}
</style>
