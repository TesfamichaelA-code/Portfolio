<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import StatusBar from '$lib/components/StatusBar.svelte';
	import './layout.css';

	let { children } = $props();
</script>

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
