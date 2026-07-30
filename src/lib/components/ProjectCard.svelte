<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';

	let {
		project,
		index,
		wide = false,
		revealDelay = 0
	}: { project: Project; index: number; wide?: boolean; revealDelay?: number } = $props();

	const statusClass = $derived(project.status.replace(' ', '-'));
</script>

<a
	class="card panel hoverable"
	class:wide
	href={`/projects#${project.slug}`}
	use:reveal={{ delay: revealDelay }}
>
	<div class="card-head">
		<span class="idx">{String(index + 1).padStart(2, '0')}</span>
		<span class={`status ${statusClass}`}>{project.status}</span>
	</div>
	<h3>{project.title}</h3>
	<p class="tagline">{project.tagline}</p>
	<code class="artifact" aria-hidden="true">{project.artifact}</code>
	{#if project.metrics}
		<div class="metrics">
			{#each project.metrics as metric}
				<span><strong>{metric.value}</strong> {metric.label}</span>
			{/each}
		</div>
	{/if}
	<div class="chip-row">
		{#each project.stack.slice(0, wide ? 6 : 4) as tech}
			<span class="chip">{tech}</span>
		{/each}
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.35rem 1.4rem 1.45rem;
	}

	.card-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}

	.idx {
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.1em;
	}

	h3 {
		font-size: clamp(1.5rem, 2.4vw, 1.9rem);
	}

	.card:hover h3 {
		color: var(--amber-hot);
	}

	.tagline {
		color: var(--ink-dim);
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.artifact {
		display: block;
		border-left: 2px solid var(--accent-line);
		padding: 0.5rem 0.8rem;
		background: var(--code-bg);
		border-radius: 0 6px 6px 0;
		color: var(--amber);
		font-family: var(--font-mono);
		font-size: 0.76rem;
		overflow-x: auto;
		white-space: nowrap;
	}

	.metrics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.3rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--muted);
		letter-spacing: 0.04em;
	}

	.metrics strong {
		color: var(--mint);
		font-weight: 600;
	}

	.chip-row {
		margin-top: auto;
	}

	@media (min-width: 780px) {
		.card.wide {
			grid-column: span 2;
		}
	}
</style>
