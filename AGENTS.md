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
