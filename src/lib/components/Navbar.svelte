<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/data/site';
	import { Menu, X } from '@lucide/svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let menuOpen = $state(false);

	const links = [
		{ href: '/', label: 'index' },
		{ href: '/projects', label: 'work' },
		{ href: '/atlas', label: 'atlas' },
		{ href: '/blog', label: 'notes' },
		{ href: '/about', label: 'profile' },
		{ href: '/contact', label: 'contact' }
	];

	function isActive(href: string, pathname: string) {
		return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<nav class="nav" aria-label="Main navigation">
	<div class="nav-inner shell">
		<a href="/" class="brand" aria-label="Tesfamichael — home">
			<span class="mark" aria-hidden="true">{site.mark}</span>
			<span class="wordmark">tesfamichael<span class="cursor" aria-hidden="true">_</span></span>
		</a>

		<div class="nav-actions">
			<div class="links" aria-label="Primary pages">
				{#each links as link}
					<a
						href={link.href}
						class="nav-link"
						class:active={isActive(link.href, page.url.pathname)}
						aria-current={isActive(link.href, page.url.pathname) ? 'page' : undefined}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<ThemeToggle />

			<button
				class="menu-btn"
				type="button"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<X size={20} aria-hidden="true" />
				{:else}
					<Menu size={20} aria-hidden="true" />
				{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<div class="mobile-panel">
			{#each links as link, i}
				<a
					href={link.href}
					class="mobile-link"
					class:active={isActive(link.href, page.url.pathname)}
					onclick={() => (menuOpen = false)}
				>
					<span class="mobile-index">0{i + 1}</span>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 50;
		border-bottom: 1px solid var(--line);
		background: var(--nav-bg);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 64px;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		min-width: 0;
	}

	.mark {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border: 1px solid var(--accent-line-strong);
		border-radius: 8px;
		color: var(--amber);
		font-size: 1.15rem;
		font-weight: 600;
		line-height: 1;
		transition: background 0.16s ease, box-shadow 0.16s ease;
	}

	.brand:hover .mark {
		background: var(--accent-soft);
		box-shadow: 0 0 18px var(--accent-glow);
	}

	.wordmark {
		font-family: var(--font-mono);
		font-size: 0.88rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--ink);
	}

	.cursor {
		color: var(--amber);
		animation: blink 1.2s steps(2) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.links {
		display: none;
		align-items: center;
		gap: 1.35rem;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-link {
		position: relative;
		padding: 0.4rem 0.05rem;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		transition: color 0.16s ease;
	}

	.nav-link::before {
		content: '·';
		position: absolute;
		left: 50%;
		bottom: -0.35rem;
		transform: translateX(-50%);
		color: var(--amber);
		opacity: 0;
		transition: opacity 0.16s ease;
	}

	.nav-link:hover {
		color: var(--ink);
	}

	.nav-link.active {
		color: var(--amber);
	}

	.nav-link.active::before,
	.nav-link:hover::before {
		opacity: 1;
	}

	.menu-btn {
		display: inline-grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border: 1px solid var(--line-strong);
		border-radius: 8px;
		background: var(--control-bg);
		color: var(--ink);
	}

	.mobile-panel {
		display: grid;
		border-top: 1px solid var(--line);
		background: var(--bg-raised);
		padding: 0.6rem var(--gutter) 1rem;
	}

	.mobile-link {
		display: flex;
		align-items: baseline;
		gap: 0.8rem;
		padding: 0.85rem 0.4rem;
		border-bottom: 1px solid var(--line);
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: 0.95rem;
		font-weight: 500;
	}

	.mobile-link:last-child {
		border-bottom: 0;
	}

	.mobile-index {
		color: var(--amber-dim);
		font-size: 0.7rem;
	}

	.mobile-link.active {
		color: var(--amber);
	}

	@media (min-width: 880px) {
		.links {
			display: flex;
		}

		.menu-btn {
			display: none;
		}
	}
</style>
