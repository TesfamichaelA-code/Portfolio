import { posts } from '$lib/posts';
import { site } from '$lib/data/site';

export const prerender = true;

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'monthly' },
	{ path: '/projects', priority: '0.9', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/atlas', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.7', changefreq: 'weekly' },
	{ path: '/contact', priority: '0.6', changefreq: 'yearly' }
];

export async function GET() {
	const urls = [
		...pages.map((p) => ({ loc: p.path, priority: p.priority, changefreq: p.changefreq })),
		...posts.map((p) => ({
			loc: `/blog/${p.slug}`,
			priority: '0.6',
			changefreq: 'yearly',
			lastmod: p.date
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `\t<url>
\t\t<loc>${new URL(u.loc, site.url).href}</loc>
${'lastmod' in u && u.lastmod ? `\t\t<lastmod>${u.lastmod}</lastmod>\n` : ''}\t\t<changefreq>${u.changefreq}</changefreq>
\t\t<priority>${u.priority}</priority>
\t</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
