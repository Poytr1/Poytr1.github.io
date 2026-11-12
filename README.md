# Pengcheng Xu — personal website

A four-page, dependency-free personal site: plain HTML, one stylesheet, one small script.

## Design principles

The site was rebuilt from scratch in November 2026 around a few rules:

1. **Answer "who, what, now" on the first screen.** Name, one sentence about current work, and a map of the areas I work on.
2. **Show results, not adjectives.** The home page leads with one finding and its numbers, then open questions, then the work that answers them. There is no skills list; the work is the evidence.
3. **The centrepiece is about the work, and it is the navigation.** The hero is a hand-drawn pipeline diagram. Each node is a link to the project or result it stands for.
4. **Every claim is linked or dated.** Numbers come from public sources (see below).
5. **One idea, one place.** No section repeats another, and no page exists for a single line of content.
6. **Content never depends on JavaScript.** The map is static inline SVG made of links. `site.js` only adds hover notes and the travelling "events", and does nothing when reduced motion is requested.
7. **No build step is required.** The source pages are what GitHub Pages serves.

Visual language: warm paper and ink, Libre Caslon Display for headings, DM Sans for text, the system monospace for dates and tags, Caveat handwriting only inside the map, one terracotta accent. Light and dark themes follow the system setting.

## Local development

Run `npm run dev`, then visit http://127.0.0.1:4173. Requires Python 3 for the preview server. No dependency installation is needed.

## Build and publish

Run `npm run build` (Node.js) to copy the site into `dist/`. The source HTML pages remain directly compatible with GitHub Pages, including the `projects.html`, `news.html`, and `articles.html` addresses. `.nojekyll` disables Jekyll processing. A private Sites preview is configured separately in `.openai/hosting.json`.

## Editing

- `index.html`: hero and map, about, the finding, open questions, projects, systems work, background.
- `projects.html`: AgentConnect as the current project, then four open-source repositories.
- `articles.html`: research papers, summaries, and source links.
- `news.html`: a redirect to the home page, kept so the old address still works.
- `styles.css`: design tokens (colours, type), then base, layout, and components.
- `site.js`: the map's interaction only.

The header and footer are repeated in each page; change all three together.

### Editing the map

Nodes and edges live in the inline SVG in `index.html`. Each node is an `<a class="node">` with `href` (the section it jumps to), `data-id` and `data-note`; each edge is a `<path class="edge">` with `data-from` and `data-to`. The script reads the graph from those attributes, so adding a node or edge needs no JavaScript change. Keep the node's `aria-label` in step with `data-note`.

## Sources for the facts on the site

- Speak: Engineering since July 2026, working mainly on infrastructure and agentic consumer products for learners (owner's description, November 2026). Product description from https://www.speak.com/.
- AgentConnect summary based on https://github.com/agentconnect-md/agentconnect/blob/main/README.md.
- Research entry: arXiv:2608.13568, a 2026 preprint. The summary, the "usually not" conclusion and the three figures in the finding section (+6% to +118%, 0-6%, three-quarters of renames) are taken from its abstract.
- Microsoft end year is recorded without an exact departure month.
- Eventstreams throughput (up to 200 MB/s per eventstream at the High level) is Microsoft's published lab figure: https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-streams/configure-settings. The earlier "~5M events/day" and "~180% YoY" figures were removed because no public source supports them.
- Other biographical content and repository links were retained from the previous version of the site.
- The AgentConnect wordmark comes from the project's official `docs/assets/logo-wordmark.svg`, unmodified.
- The company chips in the About paragraph use coloured initials, not company logos.

`sketches/` holds botanical source drawings from the previous design; the site no longer uses them.
