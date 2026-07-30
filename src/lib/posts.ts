export interface PostMeta {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	summary: string;
	readingTime: string;
	/** slug of a related project or experience, used by the atlas graph */
	related?: string;
	/** series name — entries with the same value are grouped as a collection */
	series?: string;
}

interface PostModule {
	metadata: Omit<PostMeta, 'slug'>;
	default: unknown;
}

const modules = import.meta.glob('/src/lib/posts/*.md', { eager: true }) as Record<
	string,
	PostModule
>;

/** all posts, newest first */
export const posts: PostMeta[] = Object.entries(modules)
	.map(([path, mod]) => ({
		slug: path.split('/').pop()!.replace('.md', ''),
		...mod.metadata
	}))
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/** posts that don't belong to a series, newest first */
export const standalonePosts: PostMeta[] = posts.filter((p) => !p.series);

export interface Series {
	name: string;
	/** entries oldest → newest, so index + 1 is the part number */
	entries: PostMeta[];
	latest: PostMeta;
}

/** series (collections), ordered by most recently updated */
export const seriesList: Series[] = [...new Set(posts.filter((p) => p.series).map((p) => p.series!))]
	.map((name) => {
		const entries = posts.filter((p) => p.series === name).reverse();
		return { name, entries, latest: entries[entries.length - 1] };
	})
	.sort((a, b) => new Date(b.latest.date).getTime() - new Date(a.latest.date).getTime());

/** for a post in a series: its 1-based part number, and the prev/next entries */
export function seriesContext(slug: string) {
	const post = posts.find((p) => p.slug === slug);
	if (!post?.series) return null;
	const series = seriesList.find((s) => s.name === post.series);
	if (!series) return null;
	const index = series.entries.findIndex((p) => p.slug === slug);
	return {
		name: series.name,
		part: index + 1,
		total: series.entries.length,
		prev: index > 0 ? series.entries[index - 1] : null,
		next: index < series.entries.length - 1 ? series.entries[index + 1] : null
	};
}

export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}
