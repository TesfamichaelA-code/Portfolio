import { error } from '@sveltejs/kit';

const modules = import.meta.glob('/src/lib/posts/*.md');

export async function load({ params }) {
	const loader = modules[`/src/lib/posts/${params.slug}.md`];
	if (!loader) {
		error(404, `No note called “${params.slug}” here.`);
	}

	const post = (await loader()) as { default: unknown; metadata: Record<string, unknown> };

	return {
		content: post.default,
		meta: post.metadata,
		slug: params.slug
	};
}
