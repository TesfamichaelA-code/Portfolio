<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft } from '@lucide/svelte';
</script>

<svelte:head>
	<title>{page.status} — Tesfamichael Abebe</title>
</svelte:head>

<div class="shell route err">
	<span class="ir-comment">; ===== fault · unresolved symbol ========================</span>
	<h1 class="display"><span class="accent">{page.status}</span> — symbol not found.</h1>
	<pre class="trace">error: linker failed to resolve “{page.url.pathname}”
  --&gt; requested by: your browser
  note: {page.error?.message ?? 'the page does not exist'}
  help: the symbols below are exported and guaranteed to link</pre>
	<div class="actions">
		<a class="btn primary" href="/"><ArrowLeft size={15} aria-hidden="true" /> back to index</a>
		<a class="btn" href="/projects">work</a>
		<a class="btn" href="/atlas">atlas</a>
		<a class="btn" href="/blog">notes</a>
	</div>
</div>

<style>
	.err {
		display: grid;
		gap: 1.4rem;
		justify-items: start;
		min-height: 52vh;
		align-content: center;
	}

	.trace {
		margin: 0;
		max-width: 100%;
		overflow-x: auto;
		border: 1px solid var(--line);
		border-left: 2px solid var(--rose);
		border-radius: 0 8px 8px 0;
		background: var(--code-bg);
		padding: 1rem 1.2rem;
		color: var(--ink-dim);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.7;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}
</style>
