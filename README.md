# Pengcheng Xu — personal website

A four-page, dependency-free portfolio inspired by the closing natural-history illustrations in Anthropic’s _Introducing Claude Fable 5_ film: warm paper, hand-colored botanical engravings, centered book-like typography, quiet floral marginalia, and restrained motion.

## Local development

Run `npm run dev`, then visit http://127.0.0.1:4173. Requires Node.js for building and Python 3 for the local preview server. No dependency installation is needed.

## Build and publish

Run `npm run build` to produce `dist/`. The source HTML pages remain directly compatible with GitHub Pages, including the original `projects.html`, `news.html`, and `articles.html` addresses. `.nojekyll` disables unnecessary Jekyll processing. A private Sites preview is configured separately in `.openai/hosting.json`.

## Editing

- `index.html`: introduction, interests, selected work, background, education, skills.
- `projects.html`: AgentConnect as the current project, alongside the original four repositories.
- `news.html`: updates; `articles.html`: research papers, summaries, and source links.
- `styles.css`: shared palette, type, layouts, responsive and print styles.
- `site.js`: optional one-time section entrance, respecting reduced-motion settings. All content and navigation work without JavaScript.

Public biographical content and repository links were retained from the original site. The natural-history background artwork is original AI-generated imagery; it does not reproduce Anthropic’s video frames. Existing assets are retained in source history.

Reference: https://www.youtube.com/watch?v=Y9Wz2PV404E (closing butterfly/moth illustrations, approximately 1:48).

Biography updated from the owner’s September 2026 corrections: Speak, Engineering, since July 2026. AgentConnect summary based on https://github.com/agentconnect-md/agentconnect/blob/main/README.md. Microsoft end year is recorded without inventing an exact departure month.

Research entry: arXiv:2608.13568, listed as a 2026 preprint with its author, full title, PDF, and linked code/data repository.

AgentConnect wordmark sourced from the project’s official `docs/assets/logo-wordmark.svg`; retained unmodified with its built-in reduced-motion support.
