# Current State

_Updated: 2026-04-17 after M1 complete._

## Status

- **M0 — Project Bootstrap:** ✅ complete. PRD [#1](https://github.com/Moumokhtar/elm-frontend-task/issues/1) and all six slice issues closed.
- **M1 — Shared Layout: Navbar:** ✅ complete. PRD [#8](https://github.com/Moumokhtar/elm-frontend-task/issues/8) and all five slice issues (#9–#13) closed. Navbar lives at `src/app/layout/navbar/navbar.ts` with desktop + mobile variants, PrimeNG dropdowns (items 4–7), inline mobile accordion, and routerLink on items 1/2/3 (`/`, `/service`, `/form`).
- **Next up:** M2 — per `ELM_TASK_PLAN.md`.

## Conventions the next agent must follow

These aren't obvious from the code alone — respect them when adding to M1+.

### 2025 Angular file naming

Drop the `.component.` suffix and the `Component` class-name suffix.

```
shell.ts           → export class Shell {}
home-page.ts       → export class HomePage {}
```

NOT `shell.component.ts` / `ShellComponent`. Applies to every new component.

### Path aliases — always use them

```ts
import { Shell } from '@layout/shell/shell';
import { HomePage } from '@features/home/home-page';
```

`@core/* @shared/* @layout/* @features/*`. No `baseUrl` (deprecated in TS 7) — paths resolve via `./` prefix.

### RTL strategy

- Global RTL is on (`<html dir="rtl">`, `body { direction: rtl }`).
- `src/styles/_rtl-overrides.scss` is an **empty stub by design**. Only add rules when a specific PrimeNG/Bootstrap component misbehaves in RTL. Don't preemptively write overrides.
- **Bootstrap JS is deliberately not imported.** Use Angular signals or PrimeNG for interactivity (dropdowns, collapse, modals). If M1 Navbar needs a mobile hamburger toggle, use a signal, not Bootstrap's collapse JS.

### PrimeNG

- Aura preset, `darkModeSelector: false`, ripple on. Don't add dark-mode without asking the user.
- **Primary color is deferred to M1** — pick the brand color from Figma and wire it through `providePrimeNG({ theme: { preset: ..., options: { ... } } })` in `app.config.ts`.

### Testing pattern

- `data-testid` attributes + `By.css('[data-testid="..."]')` selectors. See `shell.spec.ts` for the template.
- Route tests use `RouterTestingHarness.navigateByUrl(url, ComponentType)`. See `app.routes.spec.ts`.
- Vitest is the runner (Angular 21 default, not Karma).

### Shell slots

`shell.html` has `<header>` / `<main><router-outlet/></main>` / `<footer>` with `data-testid` hooks. M1 Navbar goes inside the `<header>` slot — don't wrap `<app-root>` with a second shell.

## Workflow

- Conventional Commits. `Closes #N` in body auto-closes the GitHub issue on push.
- PRD + slice issues on GitHub (`Moumokhtar/elm-frontend-task`). Update issue bodies via `gh issue edit --body-file` when decisions change mid-implementation.
- `main` is the only branch.
- Keep the dev server running across slices; don't restart unless config requires it.
- User chose to ignore the skill's `/model sonnet` switch — keep the current model.

## Known gotchas

- **PrimeNG is v21**, not v20 as the plan originally said (`^20` no longer published). PRD #1 updated.
- **Initial bundle budget** is 1MB/2MB (raised from 500kB/1MB) — Bootstrap + PrimeNG + two icon fonts baseline at ~416kB.
- Windows + Git Bash: CRLF warnings on every commit are harmless. `TaskStop` doesn't always kill `ng serve` child process — port 4200 may stay occupied; fall back to 4201.

## Deferred (don't forget)

| Item | When |
|---|---|
| Per-component RTL overrides | M1+ as needed |
| `routerLinkActive` styling on navbar | M7 |
| GitHub Pages deploy | M9 |

## Verify before starting

```bash
cd elm-frontend-task
npm install
npm run lint       # expect: all pass
npm test           # expect: 35/35 passing
npm run build      # expect: success, ~858kB initial (154kB transfer)
```

If any of these fail on a fresh clone, stop and investigate — don't paper over it.
