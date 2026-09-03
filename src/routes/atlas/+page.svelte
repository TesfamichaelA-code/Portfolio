<script lang="ts">
	import AtlasGraph from '$lib/components/AtlasGraph.svelte';
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Atlas"
	description="An interactive mind map of Tesfamichael's work: projects, experience, skills, and notes as one connected graph."
/>

<div class="shell atlas-head">
	<span class="ir-comment">; ===== atlas · symbol table, visualized =================</span>
	<h1 class="display">Everything here is <span class="accent">connected</span>.</h1>
	<p class="lede">
		A compiler builds a graph of your program before it emits a single instruction. This is mine:
		every project, role, skill, and note in this portfolio — one force-directed map. Drag it around.
		Click a node to inspect it; follow an edge to see why it exists.
	</p>
</div>

<AtlasGraph />

<style>
	.atlas-head {
		display: grid;
		gap: 1rem;
		padding-block: clamp(40px, 6vh, 64px) clamp(24px, 4vh, 40px);
	}
</style>
