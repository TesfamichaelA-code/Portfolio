import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { createHighlighter, bundledLanguages } from 'shiki';

const shikiTheme = 'vesper';

const highlighter = await createHighlighter({
	themes: [shikiTheme],
	langs: ['typescript', 'javascript', 'python', 'go', 'rust', 'bash', 'sql', 'json', 'yaml', 'llvm', 'antlr4', 'text'].filter(
		(lang) => lang in bundledLanguages || lang === 'text'
	)
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.svx', '.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const loaded = highlighter.getLoadedLanguages();
			const language = lang && loaded.includes(lang) ? lang : 'text';
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang: language, theme: shikiTheme }));
			return `{@html \`${html}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
		// mdsvex still emits <script context="module"> until upstream supports Svelte 5 syntax
		warningFilter: (warning) => warning.code !== 'script_context_deprecated'
	},
	kit: {
		adapter: adapter()
	},
	preprocess: [mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
