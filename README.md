# tesfamichael.epp — portfolio

Personal site of **Tesfamichael Abebe Damtew**, art-directed as a program compiled by his own
toolchain (a nod to [EPIC++](src/lib/data/projects.ts), the language + compiler he built).

- **`/`** — compile-sequence hero, selected work, experience, latest notes
- **`/projects`** — all build artifacts with metrics and live links
- **`/atlas`** — interactive mind map: every project, role, skill, and note as one force-directed graph
- **`/blog`** — mdsvex field notes with Shiki (vesper) code highlighting
- **`/about`**, **`/contact`** — profile, timeline, channels

**Stack:** SvelteKit 2 (Svelte 5 runes) · Tailwind 4 · mdsvex + Shiki · force-graph ·
Instrument Serif / Inter / JetBrains Mono (self-hosted via Fontsource)

## Editing content

All content lives in data files — no page surgery needed:

| What | Where |
| --- | --- |
| identity, links, email | `src/lib/data/site.ts` |
| projects | `src/lib/data/projects.ts` |
| work experience | `src/lib/data/experience.ts` |
| education, skills, certs | `src/lib/data/profile.ts` |
| blog posts | `src/lib/posts/*.md` (frontmatter: title, date, tags, summary, readingTime, related) |

The atlas graph (`src/lib/atlas.ts`) builds itself from those files; new posts and projects
appear in the mind map automatically.

## Publishing a note (write → commit → live)

Notes are plain markdown. To publish one:

1. Create `src/lib/posts/<slug>.md` with this frontmatter:

   ```md
   ---
   title: Synheart log — week two
   date: '2026-07-20'
   tags:
     - synheart
     - research
   summary: One or two sentences shown on the index and in search results.
   readingTime: 4 min
   series: Synheart Research Log   # optional — groups entries into a running log
   related: synheart               # optional — project or experience slug, links it in the atlas
   ---

   Your markdown here. Code fences get syntax highlighting automatically.
   ```

2. `git add . && git commit -m "note: week two" && git push`

That's it — the blog index, the home page "field notes", and the atlas all pick the file up
automatically. Entries sharing a `series` name are collected into a numbered running log
(part 1 = oldest) with prev/next navigation inside the series.

> Notes appear on the live site once the repo is connected to a host that deploys on push
> (Vercel/Netlify). Until then they show up in local `pnpm dev` / `pnpm preview`.

Gotcha: don't use `{` or `}` in inline code or prose (mdsvex parses them as Svelte
expressions) — fenced code blocks are safe.

## Development

```sh
pnpm install
pnpm dev        # dev server
pnpm check      # svelte-check
pnpm build      # production build
pnpm preview    # serve the build
```
