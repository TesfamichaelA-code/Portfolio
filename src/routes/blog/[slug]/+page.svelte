<script lang="ts">
	import type { Component } from 'svelte';
	import { ArrowLeft, ArrowRight, Layers } from '@lucide/svelte';
	import { posts, formatDate, seriesContext } from '$lib/posts';
	import Seo from '$lib/components/Seo.svelte';

	let { data } = $props();

	const Content = $derived(data.content as Component);
	const series = $derived(seriesContext(data.slug));
	const index = $derived(posts.findIndex((p) => p.slug === data.slug));
	// inside a series, navigate within it; otherwise across all posts
	const prev = $derived(
		series ? series.prev : index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
	);
	const next = $derived(series ? series.next : index > 0 ? posts[index - 1] : null);
	const prevLabel = $derived(series ? 'previous in series' : 'older');
	const nextLabel = $derived(series ? 'next in series' : 'newer');
</script>

<Seo
	title={String(data.meta.title)}
	description={String(data.meta.summary ?? '')}
	type="article"
	published={String(data.meta.date ?? '')}
	tags={(data.meta.tags as string[]) ?? []}
/>

<article class="shell route post">
	<header class="post-head">
		<a class="back" href="/blog"><ArrowLeft size={14} aria-hidden="true" /> all notes</a>
		{#if series}
			<p class="series-banner">
				<Layers size={13} aria-hidden="true" />
				{series.name} — part {series.part} of {series.total}
			</p>
		{/if}
		<h1 class="display">{data.meta.title}</h1>
		<div class="frontmatter" aria-label="Post metadata">
			<span class="fm-fence">---</span>
			<p><span class="fm-key">date:</span> {formatDate(String(data.meta.date))}</p>
			<p><span class="fm-key">tags:</span> [{(data.meta.tags as string[]).join(', ')}]</p>
			<p><span class="fm-key">reading:</span> {data.meta.readingTime}</p>
			<span class="fm-fence">---</span>
		</div>
	</header>

	<div class="post-body">
		<Content />
	</div>

	<footer class="post-foot">
		<hr aria-hidden="true" />
		<nav class="post-nav" aria-label="More notes">
			{#if prev}
				<a class="post-nav-link" href={`/blog/${prev.slug}`}>
					<span class="mono-label"><ArrowLeft size={12} aria-hidden="true" /> {prevLabel}</span>
					<strong>{prev.title}</strong>
				</a>
			{:else}
				<span></span>
			{/if}
			{#if next}
				<a class="post-nav-link next" href={`/blog/${next.slug}`}>
					<span class="mono-label">{nextLabel} <ArrowRight size={12} aria-hidden="true" /></span>
					<strong>{next.title}</strong>
				</a>
			{/if}
		</nav>
	</footer>
</article>

<style>
	.post {
		max-width: 760px;
	}

	.post-head {
		display: grid;
		gap: 1.3rem;
		margin-bottom: 2.4rem;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.06em;
		width: fit-content;
	}

	.back:hover {
		color: var(--amber);
	}

	.series-banner {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		width: fit-content;
		border: 1px solid var(--accent-line);
		border-radius: 999px;
		padding: 0.4rem 0.8rem;
		color: var(--amber);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.06em;
	}

	.post-head .display {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
	}

	.frontmatter {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--ink-dim);
		border-left: 2px solid var(--accent-line);
		padding-left: 1rem;
		line-height: 1.7;
	}

	.frontmatter p {
		margin: 0;
	}

	.fm-fence {
		display: block;
		color: var(--muted);
		opacity: 0.6;
	}

	.fm-key {
		color: var(--amber-dim);
	}

	.post-foot {
		margin-top: 3rem;
	}

	.post-foot hr {
		border: 0;
		height: 1px;
		width: 120px;
		margin: 0 auto 2rem;
		background: var(--line-strong);
	}

	.post-nav {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
	}

	.post-nav-link {
		display: grid;
		gap: 0.3rem;
		justify-items: start;
	}

	.post-nav-link .mono-label {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--amber-dim);
	}

	.post-nav-link strong {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 400;
		color: var(--ink);
		line-height: 1.2;
	}

	.post-nav-link:hover strong {
		color: var(--amber-hot);
	}

	@media (min-width: 640px) {
		.post-nav {
			grid-template-columns: 1fr 1fr;
		}

		.post-nav-link.next {
			justify-items: end;
			text-align: right;
		}
	}
</style>
