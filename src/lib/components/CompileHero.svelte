<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight } from '@lucide/svelte';
	import { site } from '$lib/data/site';

	const command = 'epicc tesfamichael.epp --emit=portfolio -O3';

	const buildLines = [
		{ stage: '[1/4] lex', detail: '2,847 tokens', status: 'ok' },
		{ stage: '[2/4] parse', detail: 'ast · 214 nodes', status: 'ok' },
		{ stage: '[3/4] type', detail: '0 errors, ∞ curiosity', status: 'ok' },
		{ stage: '[4/4] emit', detail: 'target: web', status: 'ok' }
	];

	const stats = [
		{ value: '1', label: 'language built' },
		{ value: '300ms', label: 'payment paths' },
		{ value: '0.93', label: 'retrieval precision' },
		{ value: '5', label: 'teams shipped with' }
	];

	// SSR and no-JS render the finished state; the animation only
	// winds back and replays after hydration when motion is allowed.
	let animating = $state(false);
	let typedChars = $state(command.length);
	let linesShown = $state(buildLines.length);
	let finished = $state(true);
	let ran = $state(true);
	let booted = $state(true);

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const alreadyPlayed = sessionStorage.getItem('hero-played') === '1';
		if (reduceMotion || alreadyPlayed) return;

		sessionStorage.setItem('hero-played', '1');
		animating = true;
		typedChars = 0;
		linesShown = 0;
		finished = false;
		ran = false;
		booted = false;

		const timers: ReturnType<typeof setTimeout>[] = [];
		const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

		let t = 300;
		for (let i = 1; i <= command.length; i++) {
			at(t, () => (typedChars += 1));
			t += 22;
		}
		t += 240;
		for (let i = 0; i < buildLines.length; i++) {
			at(t, () => (linesShown += 1));
			t += 300;
		}
		t += 200;
		at(t, () => (finished = true));
		t += 420;
		at(t, () => (ran = true));
		t += 480;
		at(t, () => (booted = true));

		return () => timers.forEach(clearTimeout);
	});
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="shell hero-grid">
		<div class="hero-side">
			<figure class="hero-portrait">
				<img
					src="/tesfamichael.webp"
					alt="Tesfamichael Abebe"
					width="820"
					height="734"
					fetchpriority="high"
				/>
			</figure>

			<div class="terminal panel" aria-hidden="true">
			<div class="term-bar">
				<span class="dot"></span><span class="dot"></span><span class="dot"></span>
				<span class="term-title">tesfa@addis — ~/portfolio</span>
			</div>
			<div class="term-body">
				<p class="term-line">
					<span class="prompt">$</span>
					{command.slice(0, typedChars)}{#if animating && typedChars < command.length}<span class="caret"></span>{/if}
				</p>
				{#each buildLines.slice(0, linesShown) as line}
					<p class="term-line build">
						<span class="stage">{line.stage}</span>
						<span class="detail">{line.detail}</span>
						<span class="ok">{line.status}</span>
					</p>
				{/each}
				{#if finished}
					<p class="term-line done">build finished in 0.31s → ./tesfamichael</p>
				{/if}
				{#if ran}
					<p class="term-line">
						<span class="prompt">$</span> ./tesfamichael{#if !booted}<span class="caret"></span>{/if}
					</p>
				{/if}
			</div>
			</div>
		</div>

		<div class="output" class:booted>
			<p class="mono-label preface">; program output</p>
			<h1 id="hero-title" class="hero-name">
				<span class="n1">Tesfamichael</span>
				<span class="n2">Abebe</span>
			</h1>
			<p class="role">software engineer — backend systems · applied AI · compilers</p>
			<p class="lede">
				I build backend systems and AI pipelines — and once, to understand the whole machine,
				<a class="inline-link" href="/projects#epic-pp">my own programming language</a>. Studying software
				engineering at Addis Ababa University; researching human state recognition at Synheart AI.
			</p>
			<div class="actions">
				<a class="btn primary" href="/projects">study the work <ArrowRight size={16} aria-hidden="true" /></a>
				<a class="btn" href="/atlas">explore the atlas</a>
			</div>
			<dl class="stats" aria-label="Highlights">
				{#each stats as stat}
					<div>
						<dt>{stat.value}</dt>
						<dd>{stat.label}</dd>
					</div>
				{/each}
			</dl>
			<p class="location mono-label">{site.location} · {site.availability}</p>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		border-bottom: 1px solid var(--line);
		overflow: hidden;
	}

	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(var(--grid-line) 1px, transparent 1px),
			linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(900px 600px at 30% 20%, black, transparent 75%);
		pointer-events: none;
	}

	.hero-grid {
		position: relative;
		display: grid;
		gap: 2.4rem;
		padding-block: clamp(48px, 7vh, 84px) clamp(56px, 8vh, 96px);
	}

	/* portrait + terminal column */
	.hero-side {
		display: grid;
		gap: 1.4rem;
		align-content: center;
		justify-items: center;
	}

	.hero-portrait {
		position: relative;
		margin: 0;
		width: min(250px, 62%);
	}

	.hero-portrait::before {
		content: '';
		position: absolute;
		inset: -14% -22%;
		background: radial-gradient(50% 50% at 50% 45%, var(--accent-glow), transparent 70%);
		pointer-events: none;
	}

	.hero-portrait img {
		position: relative;
		display: block;
		width: 100%;
		height: auto;
		filter: saturate(0.94) contrast(1.03);
		-webkit-mask-image: linear-gradient(black 80%, transparent 99%);
		mask-image: linear-gradient(black 80%, transparent 99%);
	}

	/* terminal */
	.terminal {
		--ink: #ece5d8;
		--ink-dim: #b3aa99;
		--muted: #837b6d;
		--amber: #ffb454;
		--amber-hot: #ffcf87;
		--amber-dim: rgba(255, 180, 84, 0.55);
		--mint: #99ffe4;

		width: 100%;
		background: var(--terminal-bg);
		color-scheme: dark;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		align-self: start;
	}

	.term-bar {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		border-bottom: 1px solid var(--line);
		padding: 0.6rem 0.85rem;
	}

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: rgba(236, 229, 216, 0.14);
	}

	.term-title {
		margin-left: 0.5rem;
		color: var(--muted);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
	}

	.term-body {
		padding: 0.9rem 1rem 1.1rem;
		min-height: 176px;
	}

	.term-line {
		margin: 0 0 0.35rem;
		color: var(--ink-dim);
		line-height: 1.55;
		word-break: break-word;
	}

	.prompt {
		color: var(--amber);
		margin-right: 0.35rem;
	}

	.term-line.build {
		display: flex;
		gap: 0.8rem;
		align-items: baseline;
	}

	.stage {
		color: var(--amber);
		flex-shrink: 0;
		min-width: 6.2em;
	}

	.detail {
		flex: 1;
		color: var(--ink-dim);
	}

	.ok {
		color: var(--mint);
	}

	.term-line.done {
		color: var(--ink);
		margin-top: 0.55rem;
	}

	.caret {
		display: inline-block;
		width: 0.55em;
		height: 1.05em;
		margin-left: 2px;
		vertical-align: text-bottom;
		background: var(--amber);
		animation: caret-blink 0.9s steps(2) infinite;
	}

	@keyframes caret-blink {
		50% { opacity: 0; }
	}

	/* program output */
	.output {
		display: grid;
		gap: 1.15rem;
		justify-items: start;
	}

	.output > * {
		transition: opacity 0.5s ease, transform 0.5s ease;
	}

	.output:not(.booted) > * {
		opacity: 0;
		transform: translateY(10px);
	}

	.preface {
		color: var(--amber-dim);
		text-transform: lowercase;
		letter-spacing: 0.08em;
	}

	.hero-name {
		display: grid;
		font-size: clamp(2.9rem, 8.4vw, 6rem);
		line-height: 0.98;
	}

	.n2 {
		color: var(--amber);
		font-style: italic;
	}

	.role {
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		font-weight: 500;
		letter-spacing: 0.04em;
	}

	.inline-link {
		color: var(--amber);
		text-decoration: underline;
		text-decoration-color: var(--accent-underline);
		text-underline-offset: 3px;
	}

	.inline-link:hover {
		color: var(--amber-hot);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 0.3rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		width: min(560px, 100%);
		margin: 1rem 0 0;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
	}

	.stats div {
		padding: 0.85rem 1rem;
		border-right: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}

	.stats div:nth-child(2n) { border-right: 0; }
	.stats div:nth-child(n + 3) { border-bottom: 0; }

	.stats dt {
		font-family: var(--font-display);
		font-size: 1.7rem;
		line-height: 1.1;
		color: var(--ink);
	}

	.stats dd {
		margin: 0.15rem 0 0;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.location {
		margin-top: 0.4rem;
	}

	@media (min-width: 960px) {
		.hero-grid {
			grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.85fr);
			align-items: center;
		}

		.output { order: 1; }
		.hero-side { order: 2; }

		.stats div {
			border-bottom: 0;
		}

		.stats {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}

		.stats div:nth-child(2n) { border-right: 1px solid var(--line); }
		.stats div:last-child { border-right: 0; }
	}
</style>
