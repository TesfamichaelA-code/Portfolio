<script lang="ts">
	import { ArrowUpRight, Trophy } from '@lucide/svelte';

	type Recognition = {
		title: string;
		result: string;
		date: string;
		location: string;
		certificateUrl: string;
	};

	let { recognition }: { recognition: Recognition } = $props();
</script>

<a
	class="recognition"
	href={recognition.certificateUrl}
	target="_blank"
	rel="noreferrer"
	aria-label={`${recognition.title} — ${recognition.result}. View certificate`}
>
	<span class="award-mark" aria-hidden="true">
		<Trophy size={19} strokeWidth={1.7} />
	</span>

	<span class="recognition-copy">
		<span class="eyebrow">latest recognition · {recognition.date}</span>
		<span class="title">{recognition.title} <em>— {recognition.result}</em></span>
	</span>

	<span class="certificate">
		view certificate <ArrowUpRight size={15} aria-hidden="true" />
	</span>
</a>

<style>
	.recognition {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.8rem 1rem;
		min-height: 72px;
		padding-block: 0.75rem;
	}

	.award-mark {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border: 1px solid var(--accent-line-strong);
		border-radius: 10px;
		background: var(--accent-soft);
		color: var(--amber);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.recognition:hover .award-mark {
		transform: translateY(-1px) rotate(-3deg);
		box-shadow: 0 0 20px var(--accent-glow);
	}

	.recognition-copy {
		display: grid;
		gap: 0.16rem;
		min-width: 0;
	}

	.eyebrow {
		color: var(--amber-dim);
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 550;
		letter-spacing: 0.09em;
		line-height: 1.35;
		text-transform: uppercase;
	}

	.title {
		color: var(--ink);
		font-family: var(--font-display);
		font-size: clamp(1.05rem, 2.4vw, 1.28rem);
		line-height: 1.15;
		transition: color 0.16s ease;
	}

	.title em {
		color: var(--amber);
	}

	.recognition:hover .title {
		color: var(--amber-hot);
	}

	.certificate {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 550;
		letter-spacing: 0.05em;
		white-space: nowrap;
		transition: color 0.16s ease;
	}

	.recognition:hover .certificate {
		color: var(--amber);
	}

	@media (max-width: 560px) {
		.recognition {
			grid-template-columns: auto minmax(0, 1fr);
		}

		.certificate {
			grid-column: 2;
		}
	}
</style>
