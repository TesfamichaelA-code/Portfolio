<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, X } from '@lucide/svelte';
	import { buildAtlas, groupLabels, type AtlasGroup, type AtlasNode } from '$lib/atlas';

	type Filter = 'everything' | 'project' | 'experience' | 'note' | 'skill';

	let container: HTMLDivElement;
	let graph: any = null;
	let selected: AtlasNode | null = $state(null);
	let filter: Filter = $state('everything');
	let hoverId: string | null = null;

	const base = buildAtlas();

	const neighbors = new Map<string, Set<string>>();
	for (const link of base.links) {
		if (!neighbors.has(link.source)) neighbors.set(link.source, new Set());
		if (!neighbors.has(link.target)) neighbors.set(link.target, new Set());
		neighbors.get(link.source)!.add(link.target);
		neighbors.get(link.target)!.add(link.source);
	}

	const filters: { value: Filter; label: string; group?: AtlasGroup }[] = [
		{ value: 'everything', label: 'everything' },
		{ value: 'project', label: groupLabels.project, group: 'project' },
		{ value: 'experience', label: groupLabels.experience, group: 'experience' },
		{ value: 'note', label: groupLabels.note, group: 'note' },
		{ value: 'skill', label: groupLabels.skill, group: 'skill' }
	];

	type AtlasPalette = {
		groups: Record<AtlasGroup, string>;
		link: string;
		linkHover: string;
		ring: string;
		label: string;
		labelStrong: string;
		labelHot: string;
	};

	let palette: AtlasPalette = {
		groups: {
			self: '#ffb454',
			domain: '#ece5d8',
			project: '#ffcf87',
			experience: '#99ffe4',
			note: '#ff9592',
			skill: '#8a8274'
		},
		link: 'rgba(236, 229, 216, 0.1)',
		linkHover: 'rgba(255, 180, 84, 0.65)',
		ring: 'rgba(255, 180, 84, 0.8)',
		label: '#b3aa99',
		labelStrong: '#ece5d8',
		labelHot: '#ffcf87'
	};

	function syncPalette() {
		const styles = getComputedStyle(document.documentElement);
		const read = (name: string, fallback: string) =>
			styles.getPropertyValue(name).trim() || fallback;

		palette = {
			groups: {
				self: read('--atlas-self', palette.groups.self),
				domain: read('--atlas-domain', palette.groups.domain),
				project: read('--atlas-project', palette.groups.project),
				experience: read('--atlas-experience', palette.groups.experience),
				note: read('--atlas-note', palette.groups.note),
				skill: read('--atlas-skill', palette.groups.skill)
			},
			link: read('--atlas-link', palette.link),
			linkHover: read('--atlas-link-hover', palette.linkHover),
			ring: read('--atlas-ring', palette.ring),
			label: read('--atlas-label', palette.label),
			labelStrong: read('--atlas-label-strong', palette.labelStrong),
			labelHot: read('--atlas-label-hot', palette.labelHot)
		};
	}

	function dataFor(f: Filter) {
		// force-graph mutates nodes/links in place, so always hand it fresh copies
		let nodes = base.nodes;
		if (f !== 'everything') {
			const keepGroups = new Set<AtlasGroup>(['self', 'domain', f]);
			nodes = base.nodes.filter((n) => keepGroups.has(n.group));
		}
		const ids = new Set(nodes.map((n) => n.id));
		const links = base.links.filter((l) => ids.has(l.source) && ids.has(l.target));
		return {
			nodes: nodes.map((n) => ({ ...n })),
			links: links.map((l) => ({ ...l }))
		};
	}

	function linkEndId(end: unknown): string {
		return typeof end === 'object' && end !== null ? (end as { id: string }).id : (end as string);
	}

	function touchesHover(link: { source: unknown; target: unknown }): boolean {
		if (!hoverId) return false;
		return linkEndId(link.source) === hoverId || linkEndId(link.target) === hoverId;
	}

	let settled = false;

	function applyFilter(f: Filter) {
		filter = f;
		selected = null;
		if (!graph) return;
		settled = false;
		graph.graphData(dataFor(f));
		fitSoon();
	}

	let fitTimer: ReturnType<typeof setTimeout> | undefined;
	function fitSoon() {
		clearTimeout(fitTimer);
		fitTimer = setTimeout(() => graph?.zoomToFit(500, 70), 900);
	}

	onMount(() => {
		syncPalette();
		const themeObserver = new MutationObserver(() => {
			hoverId = null;
			syncPalette();
			graph?.resumeAnimation();
		});
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		let cleanup = () => themeObserver.disconnect();
		let destroyed = false;

		(async () => {
			const ForceGraph = (await import('force-graph')).default as unknown as (
				...args: unknown[]
			) => any;
			if (destroyed) return;

			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			graph = ForceGraph()(container)
				.graphData(dataFor(filter))
				.backgroundColor('rgba(0,0,0,0)')
				.nodeId('id')
				.nodeVal('val')
				.nodeLabel(() => '')
				.linkColor((link: any) => (touchesHover(link) ? palette.linkHover : palette.link))
				.linkWidth((link: any) => (touchesHover(link) ? 1.6 : 0.6))
				.nodeCanvasObject((node: any, ctx: CanvasRenderingContext2D, scale: number) => {
					const group = node.group as AtlasGroup;
					const color = palette.groups[group];
					const r = Math.sqrt(node.val) * 1.25;
					const isHover = node.id === hoverId;
					const isSelected = node.id === selected?.id;
					const isNeighbor = hoverId ? (neighbors.get(hoverId)?.has(node.id) ?? false) : false;
					const dimmed = hoverId !== null && !isHover && !isNeighbor;

					ctx.globalAlpha = dimmed ? 0.16 : 1;

					if (node.group === 'self' || isHover || isSelected) {
						ctx.shadowColor = color;
						ctx.shadowBlur = 16;
					}
					ctx.beginPath();
					ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
					ctx.fillStyle = color;
					ctx.fill();
					ctx.shadowBlur = 0;

					if (isSelected) {
						ctx.beginPath();
						ctx.arc(node.x, node.y, r + 3.5 / scale, 0, 2 * Math.PI);
						ctx.strokeStyle = palette.ring;
						ctx.lineWidth = 1.2 / scale;
						ctx.stroke();
					}

					const skillHidden = node.group === 'skill' && scale < 1.15 && !isHover && !isNeighbor;
					if (!skillHidden) {
						const fs =
							(node.group === 'self' ? 13 : node.group === 'domain' ? 11 : 9.5) / scale;
						ctx.font = `500 ${fs}px "JetBrains Mono Variable", monospace`;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'top';
						ctx.fillStyle =
							isHover || isSelected
								? palette.labelHot
								: group === 'self'
									? palette.groups.self
									: group === 'domain'
										? palette.labelStrong
										: palette.label;
						const label =
							node.label.length > 26 && node.group === 'note'
								? node.label.slice(0, 24) + '…'
								: node.label;
						ctx.fillText(label, node.x, node.y + r + 3 / scale);
					}

					ctx.globalAlpha = 1;
					node.__r = r;
				})
				.nodePointerAreaPaint((node: any, color: string, ctx: CanvasRenderingContext2D) => {
					ctx.fillStyle = color;
					ctx.beginPath();
					ctx.arc(node.x, node.y, (node.__r ?? 6) + 6, 0, 2 * Math.PI);
					ctx.fill();
				})
				.onNodeHover((node: any) => {
					hoverId = node?.id ?? null;
					container.style.cursor = node ? 'pointer' : 'grab';
				})
				.onNodeClick((node: any) => {
					selected = node as AtlasNode;
					graph.centerAt(node.x, node.y, 500);
				})
				.onBackgroundClick(() => (selected = null))
				.onEngineStop(() => {
					// final fit once the simulation settles, so no node ends up off-canvas
					if (!settled) {
						settled = true;
						graph.zoomToFit(500, 70);
					}
				});

			graph.d3Force('charge')?.strength(-170);
			graph.d3Force('link')?.distance((link: any) => {
				const t = linkEndId(link.target);
				if (t.startsWith('skill:')) return 30;
				if (t.startsWith('post:')) return 42;
				if (t.startsWith('project:')) return 52;
				if (t.startsWith('domain:')) return 78;
				return 70;
			});

			if (reduceMotion) {
				graph.warmupTicks(150).cooldownTicks(0);
			}

			const resize = () => {
				graph.width(container.clientWidth).height(container.clientHeight);
			};
			const ro = new ResizeObserver(resize);
			ro.observe(container);
			resize();
			fitSoon();

			cleanup = () => {
				themeObserver.disconnect();
				ro.disconnect();
				clearTimeout(fitTimer);
				graph?._destructor?.();
			};
		})();

		return () => {
			destroyed = true;
			cleanup();
		};
	});
</script>

<div class="atlas-wrap">
	<div class="controls" role="group" aria-label="Filter the atlas">
		{#each filters as f}
			<button
				type="button"
				class="filter-btn"
				class:active={filter === f.value}
				onclick={() => applyFilter(f.value)}
			>
				{#if f.group}<span class="dot" style={`background:var(--atlas-${f.group})`} aria-hidden="true"></span>{/if}
				{f.label}
			</button>
		{/each}
	</div>

	<div class="canvas" bind:this={container} aria-label="Interactive mind map of projects, experience, notes, and skills"></div>

	{#if selected}
		<aside class="detail panel" aria-live="polite">
			<button class="close" type="button" aria-label="Close details" onclick={() => (selected = null)}>
				<X size={15} aria-hidden="true" />
			</button>
			<span class="detail-group" style={`color:var(--atlas-${selected.group})`}>
				● {groupLabels[selected.group]}
			</span>
			<h2>{selected.label}</h2>
			{#if selected.sub}<p class="detail-sub">{selected.sub}</p>{/if}
			{#if selected.desc}<p class="detail-desc">{selected.desc}</p>{/if}
			{#if selected.href}
				<a class="btn primary detail-open" href={selected.href}>
					open <ArrowRight size={15} aria-hidden="true" />
				</a>
			{/if}
		</aside>
	{/if}

	<p class="hint mono-label" aria-hidden="true">drag · scroll to zoom · click a node</p>
</div>

<style>
	.atlas-wrap {
		position: relative;
		border-block: 1px solid var(--line);
		background:
			radial-gradient(700px 420px at 50% 40%, var(--bg-glow), transparent 70%),
			var(--bg);
	}

	.canvas {
		height: clamp(520px, calc(100svh - 220px), 860px);
		overflow: hidden;
		cursor: grab;
	}

	.controls {
		position: absolute;
		top: 14px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 5;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.4rem;
		max-width: calc(100% - 24px);
	}

	.filter-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.42rem;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		background: var(--filter-bg);
		backdrop-filter: blur(8px);
		color: var(--ink-dim);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		padding: 0.45rem 0.85rem;
		transition: color 0.15s ease, border-color 0.15s ease;
	}

	.filter-btn:hover {
		color: var(--ink);
	}

	.filter-btn.active {
		border-color: var(--amber);
		color: var(--amber);
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.detail {
		position: absolute;
		left: 14px;
		bottom: 14px;
		z-index: 5;
		width: min(360px, calc(100% - 28px));
		padding: 1.15rem 1.2rem 1.25rem;
		background: var(--detail-bg);
		backdrop-filter: blur(10px);
		display: grid;
		gap: 0.5rem;
		justify-items: start;
	}

	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border: 1px solid var(--line);
		border-radius: 6px;
		background: transparent;
		color: var(--muted);
	}

	.close:hover {
		color: var(--ink);
		border-color: var(--line-strong);
	}

	.detail-group {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.detail h2 {
		font-size: 1.55rem;
		line-height: 1.1;
	}

	.detail-sub {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.04em;
	}

	.detail-desc {
		color: var(--ink-dim);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.detail-open {
		margin-top: 0.4rem;
		min-height: 38px;
		padding: 0.5rem 0.9rem;
	}

	.hint {
		position: absolute;
		right: 16px;
		bottom: 12px;
		z-index: 4;
		opacity: 0.65;
	}

	@media (max-width: 640px) {
		.hint {
			display: none;
		}
	}
</style>
