<script lang="ts">
	import { ArrowRight, Layers } from '@lucide/svelte';
	import { posts, standalonePosts, seriesList, formatDate } from '$lib/posts';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>Notes — Tesfamichael Abebe</title>
	<meta
		name="description"
		content="Field notes and running logs on compilers, payment systems, retrieval pipelines, and AI research — written from real builds."
	/>
</svelte:head>

<div class="shell route">
	<header class="section-head split">
		<div>
			<span class="ir-comment">; ===== notes · {posts.length} entries, append-only ===================</span>
			<h1 class="display">Field <span class="accent">notes</span>.</h1>
		</div>
		<p class="lede">
			Written while the solder cooled — decisions, dead ends, and the numbers that settled
			arguments. Every note traces back to a real system in the <a class="atlas-link" href="/atlas">atlas</a>.
		</p>
	</header>

	{#if seriesList.length}
		<section class="series-block" aria-labelledby="series-title">
			<h2 id="series-title" class="sub-head">
				<Layers size={16} aria-hidden="true" /> running logs
			</h2>
			<div class="series-grid">
				{#each seriesList as series}
					<article class="series panel" use:reveal>
						<header class="series-head">
							<h3>{series.name}</h3>
						<p class="series-meta mono-label">
								{series.entries.length}
								{series.entries.length === 1 ? 'entry' : 'entries'} · updated {formatDate(
									series.latest.date
								)} · ongoing
							</p>
						</header>
						<ol class="series-entries">
							{#each series.entries as entry, i}
								<li>
									<a class="series-entry" href={`/blog/${entry.slug}`}>
										<span class="part mono-label">{String(i + 1).padStart(2, '0')}</span>
										<span class="entry-title">{entry.title}</span>
										<time class="entry-date mono-label" datetime={entry.date}
											>{formatDate(entry.date)}</time
										>
									</a>
								</li>
							{/each}
						</ol>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<section aria-labelledby="oneoffs-title">
		<h2 id="oneoffs-title" class="sub-head">one-off notes</h2>
		<ol class="note-list">
			{#each standalonePosts as post, i}
				<li use:reveal={{ delay: (i % 3) * 70 }}>
					<a class="note-row" href={`/blog/${post.slug}`}>
						<div class="note-meta">
							<time datetime={post.date}>{formatDate(post.date)}</time>
							<span class="reading">{post.readingTime}</span>
						</div>
						<div class="note-main">
							<h3>{post.title}</h3>
							<p>{post.summary}</p>
							<div class="tags">
								{#each post.tags as tag}
									<span class="chip">#{tag}</span>
								{/each}
							</div>
						</div>
						<ArrowRight class="note-arrow" size={18} aria-hidden="true" />
					</a>
				</li>
			{/each}
		</ol>
	</section>
</div>

<style>
	.atlas-link {
		color: var(--amber);
		text-decoration: underline;
		text-decoration-color: var(--accent-underline);
		text-underline-offset: 3px;
	}

	.sub-head {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.76rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	/* series collections */
	.series-block {
		margin-bottom: 2.6rem;
	}

	.series-grid {
		display: grid;
		gap: 1rem;
	}

	.series {
		overflow: hidden;
	}

	.series-head {
		display: grid;
		gap: 0.3rem;
		padding: 1.3rem 1.4rem 1.1rem;
		border-bottom: 1px solid var(--line);
		background: linear-gradient(180deg, var(--accent-soft), transparent);
	}

	.series-head h3 {
		font-size: clamp(1.5rem, 3vw, 2rem);
	}

	.series-meta {
		color: var(--amber-dim);
	}

	.series-entries {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.series-entry {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.2rem 0.9rem;
		align-items: baseline;
		padding: 0.85rem 1.4rem;
		border-bottom: 1px solid var(--line);
		transition: background 0.15s ease;
	}

	.series-entries li:last-child .series-entry {
		border-bottom: 0;
	}

	.series-entry:hover {
		background: var(--hover-wash);
	}

	.part {
		color: var(--amber-dim);
	}

	.entry-title {
		color: var(--ink);
		font-family: var(--font-display);
		font-size: 1.15rem;
		line-height: 1.25;
	}

	.series-entry:hover .entry-title {
		color: var(--amber-hot);
	}

	.entry-date {
		grid-column: 2;
	}

	@media (min-width: 700px) {
		.series-entry {
			grid-template-columns: auto minmax(0, 1fr) auto;
		}

		.entry-date {
			grid-column: auto;
		}
	}

	/* one-off notes */
	.note-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
	}

	.note-row {
		display: grid;
		gap: 0.8rem;
		padding: 1.5rem clamp(1.1rem, 3vw, 1.8rem);
		border-bottom: 1px solid var(--line);
		transition: background 0.16s ease;
	}

	.note-list li:last-child .note-row {
		border-bottom: 0;
	}

	.note-row:hover {
		background: var(--hover-wash);
	}

	.note-meta {
		display: flex;
		gap: 1rem;
		align-items: baseline;
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.reading {
		color: var(--muted);
	}

	.note-main {
		display: grid;
		gap: 0.55rem;
	}

	.note-main h3 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.1;
	}

	.note-row:hover h3 {
		color: var(--amber-hot);
	}

	.note-main p {
		color: var(--ink-dim);
		line-height: 1.65;
		max-width: 62ch;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.note-row :global(.note-arrow) {
		display: none;
		color: var(--muted);
		align-self: center;
	}

	.note-row:hover :global(.note-arrow) {
		color: var(--amber);
	}

	@media (min-width: 860px) {
		.note-row {
			grid-template-columns: 190px minmax(0, 1fr) auto;
			align-items: start;
		}

		.note-meta {
			flex-direction: column;
			gap: 0.3rem;
		}

		.note-row :global(.note-arrow) {
			display: block;
		}
	}
</style>
