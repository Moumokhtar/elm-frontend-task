# Agent constraints (repo)

- **`start-building`:** follow `docs/start-building.local.md`.
- **GitHub slices (non-UI):** when done (`npm run lint` + `npm test` clean), commit on `main` with `Closes #<n>` in the commit body, then `git push origin main`.
- **UI / visual slices:** do **not** commit or push until the user **explicitly** confirms visuals; keep work local until then.
- **Stack:** frontend-only mock app, `main` workflow, approval gates as documented elsewhere.
- **Figma = source of truth (UI):** specs come from **Figma MCP** (`get_design_context`), not from issue prose, memory, or guessed values. **User:** for any UI/visual work, **always send a Figma link** (frame or component) so the agent can call MCP and align implementation. **Agent:** if no link is provided for visual work, **ask for the frame/component URL** before building; after calling MCP, map results to Angular + Bootstrap + `_tokens.scss` and download assets before commit. URL `node-id=2036-31010` → MCP `nodeId` **`2036:31010`** (hyphen → colon; numbers are an example).
- **Figma MCP:** server **`plugin-figma-figma`** (not `figma`); **`get_design_context`** requires `fileKey` + `nodeId`.
- **CSS:** prefer **Bootstrap utilities**; custom / `u-*` in `_tokens.scss` only when Bootstrap cannot match Figma; prefer **grid** (`row` / `col-*`) for page structure.
- **RTL:** `html` has `dir="rtl"` / `lang="ar"` — still set **`dir="rtl"`** (and `direction: rtl` on `:host` or slice root) on RTL slices so flex and PrimeNG do not pick up LTR; prefer **logical** utilities (`ms-*` / `me-*`, `text-start` / `text-end`).
- **Home visual QA:** new shared UI → sample in `home-page__strip` / `home-page__strip-inner` with `data-testid="home-visual-qa-<name>"`; strip when real composition ships (e.g. M4).
- **Images:** `NgOptimizedImage` **priority** only for above-the-fold / hero instances that need it, not every card.
