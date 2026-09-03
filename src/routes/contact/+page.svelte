<script lang="ts">
	import { ArrowUpRight, Copy, Check } from '@lucide/svelte';
	import { site } from '$lib/data/site';
	import BrandIcon, { type BrandName } from '$lib/components/BrandIcon.svelte';
	import Seo from '$lib/components/Seo.svelte';

	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(site.email);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			// clipboard unavailable — the mailto link still works
		}
	}

	const channels: { icon: BrandName; label: string; value: string; href: string }[] = [
		{ icon: 'github', label: 'GitHub', value: 'TesfamichaelA-code', href: site.links.github },
		{
			icon: 'linkedin',
			label: 'LinkedIn',
			value: 'tesfamichael-abebe-damtew',
			href: site.links.linkedin
		},
		{ icon: 'leetcode', label: 'LeetCode', value: 'Tesfamichael_Abebe', href: site.links.leetcode },
		{
			icon: 'codeforces',
			label: 'Codeforces',
			value: 'tesfamichael.abebe',
			href: site.links.codeforces
		}
	];
</script>

<Seo
	title="Contact"
	description="Get in touch with Tesfamichael Abebe — email, GitHub, LinkedIn, LeetCode, Codeforces."
/>

<div class="shell route contact">
	<header class="section-head">
		<div>
			<span class="ir-comment">; ===== contact · extern symbols ========================</span>
			<h1 class="display">Link against <span class="accent">me</span>.</h1>
		</div>
	</header>

	<div class="contact-grid">
		<div class="main-channel panel">
			<span class="mono-label">primary channel · fastest response</span>
			<a class="email" href={`mailto:${site.email}`}>{site.email}</a>
			<p class="email-note">
				{site.availability}. Write about AI, backend, or ML roles — or something you're
				building — I read everything.
			</p>
			<div class="email-actions">
				<a class="btn primary" href={`mailto:${site.email}`}>
					compose <ArrowUpRight size={15} aria-hidden="true" />
				</a>
				<button class="btn" type="button" onclick={copyEmail}>
					{#if copied}
						<Check size={15} aria-hidden="true" /> copied
					{:else}
						<Copy size={15} aria-hidden="true" /> copy address
					{/if}
				</button>
			</div>
		</div>

		<ul class="channel-list" aria-label="Other channels">
			{#each channels as channel}
				<li>
					<a
						class="channel panel hoverable"
						href={channel.href}
						target="_blank"
						rel="noreferrer"
						aria-label={channel.label}
						title={channel.label}
					>
						<span class="channel-icon"><BrandIcon name={channel.icon} size={18} /></span>
						<span class="channel-value">{channel.value}</span>
						<ArrowUpRight class="channel-arrow" size={16} aria-hidden="true" />
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<p class="ps">; based in {site.location} (UTC+3) — async-friendly across every timezone.</p>
</div>

<style>
	.contact-grid {
		display: grid;
		gap: 1rem;
	}

	.main-channel {
		display: grid;
		gap: 0.9rem;
		justify-items: start;
		padding: clamp(1.5rem, 4vw, 2.4rem);
	}

	.email {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4.4vw, 2.6rem);
		line-height: 1.1;
		color: var(--ink);
		word-break: break-all;
	}

	.email:hover {
		color: var(--amber-hot);
	}

	.email-note {
		color: var(--ink-dim);
		line-height: 1.7;
		max-width: 52ch;
	}

	.email-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 0.3rem;
	}

	.channel-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1rem;
	}

	.channel {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.9rem;
		padding: 0.85rem 1.1rem;
	}

	.channel-icon {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border: 1px solid var(--line);
		border-radius: 8px;
		color: var(--amber);
	}

	.channel-value {
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: 0.88rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.channel :global(.channel-arrow) {
		align-self: center;
		color: var(--muted);
	}

	.channel:hover :global(.channel-arrow) {
		color: var(--amber);
	}

	.ps {
		margin-top: 2.2rem;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}

	@media (min-width: 860px) {
		.contact-grid {
			grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.8fr);
			align-items: start;
		}
	}
</style>
