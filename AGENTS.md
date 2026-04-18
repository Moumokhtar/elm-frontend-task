# Agent Instructions (Repo Local)

For this repository, prefer the local workflow in `docs/start-building.local.md`.

Default behavior:

- if the user says `start-building`, run the local workflow from `docs/start-building.local.md`
- treat this as repository-specific guidance for Cursor sessions
- do not switch to milestone/staging branch flow unless the user explicitly asks

Slice sync (GitHub issues):

- When a vertical-slice issue is **done** (acceptance criteria met, `npm run lint` and `npm test` clean): **commit on `main`** with `Closes #<issue-number>` in the commit **body**, then **`git push origin main`** so the issue auto-closes and the board matches the repo. Do not leave verified slices only in the working tree.

Scope reminder:

- frontend-only mock app
- `main` branch workflow
- strict approval gates
- Figma is the visual source of truth: always match spacing, colors, alignment, sizing, typography, and hierarchy exactly unless the user explicitly approves a deviation
- icon policy: prefer the closest match from installed icon sets (Bootstrap Icons, PrimeIcons; Brave only if installed), across all features
- keep icon sizing/spacing consistent with design tokens and Bootstrap utilities first
- layout: prefer **Bootstrap rows, columns, and the grid** (`row`, `col-*`, `col-md`, `col-md-auto`, etc.) for page and component structure; avoid custom flexbox/CSS layout when utilities or the grid can express the same behavior (reduces RTL bugs and uneven width distribution)
- **Home visual QA (until full page milestones, e.g. M4 Home):** when adding a new shared UI slice, mount a **sample instance** on `HomePage` inside the existing strip pattern (`home-page__strip` / `home-page__strip-inner`, `data-testid="home-visual-qa-<component>"`, HTML comment “VISUAL QA ONLY — remove for M4”). Remove those strips when the real page composition ships.

## Figma MCP (Cursor plugin)

Use this when you need **measured** specs or **export** assets from the Figma file — not when the user only pastes a link (the agent still must **call** MCP).

- **Server identifier:** `plugin-figma-figma` (Cursor **Plugin MCP**). It is **not** named `figma`; `call_mcp_tool` with server `figma` will fail. Read tool descriptors under the project’s Cursor MCP folder if the identifier ever changes.
- **Primary read tool:** `get_design_context` with **`fileKey`** + **`nodeId`** (both required). Parse any design URL of the form `https://www.figma.com/design/<fileKey>/...?node-id=2036-65728` → `nodeId` must be **`2036:65728`** (hyphen in the query string becomes a **colon**).
- **Optional arguments:** `clientLanguages` (e.g. `typescript,html,scss`) and `clientFrameworks` (e.g. `angular`) are for logging; include them when calling.
- **Response shape:** MCP returns **reference** markup (often React + Tailwind) plus **metadata** and **temporary asset URLs** (`https://www.figma.com/api/mcp/asset/...`). **Adapt** to this repo: Angular templates, Bootstrap utilities, tokens in `_tokens.scss`, and component SCSS only where Bootstrap cannot express the value.
- **Assets:** MCP image URLs **expire** (on the order of days). For anything committed to the repo, **download** the asset into `public/images/` (e.g. with `Invoke-WebRequest -OutFile` on Windows) and reference a **local path** in `ngSrc` / `src`.
- **Prompting:** Ask explicitly, e.g. *“Call `plugin-figma-figma` / `get_design_context` for fileKey `…` node `…` and map spacing, colors, radii, and typography to our tokens.”*
- **`NgOptimizedImage` + LCP:** If a hero or **above-the-fold** image uses `NgOptimizedImage` and Angular warns **NG02955** (LCP without `priority`), set **`priority`** on that `<img>` (e.g. expose an optional `imagePriority` input on the component and enable it only for the Home visual QA / real hero instances — do not set `priority` on every card in a grid).
