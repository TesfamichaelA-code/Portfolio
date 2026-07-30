<script lang="ts">
	import { onMount } from 'svelte';
	import { Moon, Sun } from '@lucide/svelte';

	type Theme = 'light' | 'dark';

	const storageKey = 'tesfamichael-theme';
	let theme: Theme = $state('dark');

	function readStoredTheme(): Theme | null {
		try {
			const stored = localStorage.getItem(storageKey);
			return stored === 'light' || stored === 'dark' ? stored : null;
		} catch {
			return null;
		}
	}

	function applyTheme(next: Theme, persist = true) {
		const root = document.documentElement;
		root.dataset.theme = next;
		root.style.colorScheme = next;
		theme = next;

		const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
		themeColor?.setAttribute('content', next === 'light' ? '#f5f1e9' : '#0d0c0a');

		if (persist) {
			try {
				localStorage.setItem(storageKey, next);
			} catch {
				// The visual toggle still works when storage is unavailable.
			}
		}
	}

	onMount(() => {
		const rootTheme = document.documentElement.dataset.theme;
		theme = rootTheme === 'light' ? 'light' : 'dark';

		const preference = window.matchMedia('(prefers-color-scheme: light)');
		const followSystem = (event: MediaQueryListEvent) => {
			if (!readStoredTheme()) applyTheme(event.matches ? 'light' : 'dark', false);
		};

		preference.addEventListener('change', followSystem);
		return () => preference.removeEventListener('change', followSystem);
	});

	const nextThemeLabel = $derived(
		theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
	);
</script>

<button
	class="theme-toggle"
	type="button"
	aria-label={nextThemeLabel}
	title={nextThemeLabel}
	onclick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
>
	<span class="theme-icon sun" aria-hidden="true"><Sun size={17} strokeWidth={1.8} /></span>
	<span class="theme-icon moon" aria-hidden="true"><Moon size={17} strokeWidth={1.8} /></span>
</button>

<style>
	.theme-toggle {
		position: relative;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		flex: 0 0 auto;
		border: 1px solid var(--line-strong);
		border-radius: 8px;
		background: var(--control-bg);
		color: var(--ink);
		overflow: hidden;
		transition:
			color 0.16s ease,
			border-color 0.16s ease,
			background 0.16s ease,
			transform 0.16s ease;
	}

	.theme-toggle:hover {
		color: var(--amber);
		border-color: var(--accent-line-strong);
		background: var(--accent-soft);
		transform: translateY(-1px);
	}

	.theme-icon {
		position: absolute;
		display: grid;
		place-items: center;
		transition:
			opacity 0.2s ease,
			transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.sun {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}

	.moon {
		opacity: 0;
		transform: rotate(-35deg) scale(0.72);
	}

	:global(html[data-theme='light']) .sun {
		opacity: 0;
		transform: rotate(35deg) scale(0.72);
	}

	:global(html[data-theme='light']) .moon {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}
</style>
