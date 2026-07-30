<script lang="ts">
	import { site } from '$lib/data/site';
	import BrandIcon, { type BrandName } from '$lib/components/BrandIcon.svelte';

	const year = new Date().getFullYear();

	const links: { icon: BrandName; label: string; href: string }[] = [
		{ icon: 'github', label: 'GitHub', href: site.links.github },
		{ icon: 'linkedin', label: 'LinkedIn', href: site.links.linkedin },
		{ icon: 'leetcode', label: 'LeetCode', href: site.links.leetcode },
		{ icon: 'codeforces', label: 'Codeforces', href: site.links.codeforces },
		{ icon: 'email', label: 'Email', href: `mailto:${site.email}` }
	];
</script>

<footer class="statusbar" aria-label="Site footer">
	<div class="shell footer-grid">
		<div class="identity">
			<span class="mark" aria-hidden="true">{site.mark}</span>
			<div>
				<p class="name">{site.name}</p>
				<p class="dim">{site.location} · UTC+3</p>
			</div>
		</div>

		<nav class="channels" aria-label="Elsewhere">
			{#each links as link}
				<a
					href={link.href}
					target={link.href.startsWith('mailto') ? undefined : '_blank'}
					rel="noreferrer"
					aria-label={link.label}
					title={link.label}
				>
					<BrandIcon name={link.icon} size={17} />
				</a>
			{/each}
		</nav>
	</div>

	<div class="shell baseline">
		<p>© {year} {site.name} — built with SvelteKit</p>
	</div>
</footer>

<style>
	.statusbar {
		border-top: 1px solid var(--line);
		background: var(--bg-raised);
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}

	.footer-grid {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.2rem;
		padding-block: 1.6rem 1.2rem;
	}

	.identity {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.identity p {
		margin: 0;
		line-height: 1.55;
	}

	.mark {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		flex-shrink: 0;
		border: 1px solid var(--accent-line-strong);
		border-radius: 8px;
		color: var(--amber);
		font-size: 1.05rem;
	}

	.name {
		color: var(--ink);
		font-weight: 600;
	}

	.dim {
		color: var(--muted);
	}

	.channels {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.channels a {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border: 1px solid var(--line);
		border-radius: 8px;
		color: var(--muted);
		transition: color 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
	}

	.channels a:hover {
		color: var(--amber);
		border-color: var(--accent-line-strong);
		transform: translateY(-2px);
	}

	.baseline {
		border-top: 1px solid var(--line);
		padding-block: 0.85rem;
	}

	.baseline p {
		margin: 0;
		color: var(--muted);
	}
</style>
