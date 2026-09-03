<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import StatusBar from '$lib/components/StatusBar.svelte';
	import { site } from '$lib/data/site';
	import './layout.css';

	let { children } = $props();

	// Person schema, so search engines and AI crawlers read the identity
	// behind the site rather than inferring it from prose.
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		url: site.url,
		email: `mailto:${site.email}`,
		jobTitle: site.role,
		image: new URL('/tesfamichael.webp', site.url).href,
		address: { '@type': 'PostalAddress', addressLocality: 'Addis Ababa', addressCountry: 'ET' },
		alumniOf: [
			{ '@type': 'CollegeOrUniversity', name: 'Addis Ababa University' },
			{ '@type': 'EducationalOrganization', name: 'EPIC Institute of Technology' }
		],
		knowsAbout: ['Backend Engineering', 'Applied Machine Learning', 'Compilers', 'LLVM', 'RAG'],
		sameAs: [site.links.github, site.links.linkedin, site.links.leetcode, site.links.codeforces]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema).replace(/</g, '\\u003c')}<\/script>`}
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>
<div class="grain" aria-hidden="true"></div>

<div class="site-shell">
	<Navbar />

	<main id="main" class="site-main">
		{@render children()}
	</main>

	<StatusBar />
</div>

<style>
	.site-shell {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.site-main {
		flex: 1;
	}
</style>
