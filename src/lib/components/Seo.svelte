<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/data/site';

	/**
	 * Every page's head in one place: title, description, canonical, Open Graph,
	 * Twitter card. Canonical/og:url are built from `site.url` + the pathname
	 * rather than `page.url.origin`, because during prerendering the origin is a
	 * placeholder (http://sveltekit-prerender), not the real domain.
	 */
	let {
		title,
		description,
		/** 'website' for pages, 'article' for a note */
		type = 'website',
		image = '/og.png',
		/** ISO date — only meaningful for articles */
		published,
		tags = []
	}: {
		title: string;
		description: string;
		type?: 'website' | 'article';
		image?: string;
		published?: string;
		tags?: string[];
	} = $props();

	const canonical = $derived(
		new URL(page.url.pathname.replace(/\/$/, '') || '/', site.url).href
	);
	const imageUrl = $derived(new URL(image, site.url).href);
	// the home page owns the bare name; every other page gets the suffix
	const fullTitle = $derived(page.url.pathname === '/' ? title : `${title} — ${site.name}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={`${site.name} — ${site.role}`} />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	{#if type === 'article' && published}
		<meta property="article:published_time" content={published} />
		<meta property="article:author" content={site.name} />
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>
