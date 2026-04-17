# Agent Instructions (Repo Local)

For this repository, prefer the local workflow in `docs/start-building.local.md`.

Default behavior:

- if the user says `start-building`, run the local workflow from `docs/start-building.local.md`
- treat this as repository-specific guidance for Cursor sessions
- do not switch to milestone/staging branch flow unless the user explicitly asks

Scope reminder:

- frontend-only mock app
- `main` branch workflow
- strict approval gates
- Figma is the visual source of truth: always match spacing, colors, alignment, sizing, typography, and hierarchy exactly unless the user explicitly approves a deviation
- icon policy: prefer the closest match from installed icon sets (Bootstrap Icons, PrimeIcons; Brave only if installed), across all features
- keep icon sizing/spacing consistent with design tokens and Bootstrap utilities first
