/**
 * Scroll-reveal action: fades/slides an element in the first time it enters
 * the viewport. SSR-safe (server markup ships fully visible; the hidden state
 * is only applied client-side) and disabled for prefers-reduced-motion.
 *
 *   <div use:reveal>…</div>
 *   <div use:reveal={{ delay: 120 }}>…</div>
 */
export interface RevealOptions {
	/** transition-delay in ms, for staggering siblings */
	delay?: number;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduceMotion || typeof IntersectionObserver === 'undefined') {
		return {};
	}

	node.style.setProperty('--reveal-delay', `${options.delay ?? 0}ms`);
	node.classList.add('reveal');

	// failsafe: if the observer never reports anything (broken/blocked IO),
	// force the content visible rather than leaving it hidden forever
	let sawEntry = false;
	const failsafe = setTimeout(() => {
		if (!sawEntry) node.classList.add('revealed');
	}, 1500);

	const observer = new IntersectionObserver(
		(entries) => {
			sawEntry = true;
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('revealed');
					observer.disconnect();
				}
			}
		},
		{ threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			clearTimeout(failsafe);
			observer.disconnect();
		}
	};
}
