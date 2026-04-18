# Current State

_Updated: 2026-04-18._

## Status

- **M0 — Project Bootstrap:** ✅ complete. PRD [#1](https://github.com/Moumokhtar/elm-frontend-task/issues/1) and all six slice issues closed.
- **M1 — Shared Layout: Navbar:** ✅ complete. PRD [#8](https://github.com/Moumokhtar/elm-frontend-task/issues/8) and all five slice issues (#9–#13) closed. Navbar lives at `src/app/layout/navbar/navbar.ts` with desktop + mobile variants, PrimeNG dropdowns (items 4–7), inline mobile accordion, and routerLink on items 1/2/3 (`/`, `/service`, `/form`).
- **M2 — Shared Layout: Footer:** ✅ complete. PRD [#14](https://github.com/Moumokhtar/elm-frontend-task/issues/14) and slice issues #15–#19 closed. Footer lives at `src/app/layout/footer/footer.ts`, mounted from `shell.html`, with four link columns, social + accessibility icon rows, bottom legal/links, and local assets under `public/images/footer-*`.
- **M3 — Shared UI Components:** ✅ complete. PRD [#20](https://github.com/Moumokhtar/elm-frontend-task/issues/20) and slices #21–#27 closed. Shared pieces under `src/app/shared/` include `FeedbackBlock` (Figma-aligned feedback stack; optional top rows), `ServiceCard`, `NewsCard`, `PartnerLogo`, `Breadcrumb`, `SectionHeader`, plus tokens and home visual QA wiring.
- **M4 — Home Page:** ✅ complete. PRD [#28](https://github.com/Moumokhtar/elm-frontend-task/issues/28) and slices #29–#35. Composition in `src/app/features/home/` (hero, about + stats, services / news / partners carousels, feedback strip, `home-mock.ts`).
- **M5 — Service Detail Page:** ✅ complete. PRD [#36](https://github.com/Moumokhtar/elm-frontend-task/issues/36) and slice [#37](https://github.com/Moumokhtar/elm-frontend-task/issues/37). Route `/service` → `src/app/features/service/` (`service-detail-page`, `service-detail-mock.ts`): tent + main/sidebar Figma frames, Bootstrap-icon sidebar rows, payment SVG tiles, store CTAs (user PNG icons + LTR copy), related services carousel matching home services chrome (`HOME_SERVICES` length), `FeedbackBlock` with full-bleed brand borders and `u-page-strip-y` on host (home + service sections use `bg-white` wrapper only).
- **M6 — Form Page:** ✅ complete. PRD [#38](https://github.com/Moumokhtar/elm-frontend-task/issues/38) and slices #39–#43. Route `/form` → `src/app/features/form/` (`form-page`, `form-mock.ts`): RTL stepper + mobile progress, step navigation (رجوع / التالي) with validation on the fields step, placeholders on steps 1 and 3, Figma-aligned text inputs (plain, search icon, text prefix/suffix with merged radii, helper, disabled), `FeedbackBlock` helpfulness row, tokens in `_tokens.scss`.
- **M7 — Routing & Page Shell:** ✅ complete. PRD [#44](https://github.com/Moumokhtar/elm-frontend-task/issues/44) and slices [#45](https://github.com/Moumokhtar/elm-frontend-task/issues/45), [#47](https://github.com/Moumokhtar/elm-frontend-task/issues/47), [#46](https://github.com/Moumokhtar/elm-frontend-task/issues/46). Wildcard 404 at `src/app/features/not-found/not-found-page`, navbar `routerLink` logos + `routerLinkActive` on routed items (primary CTA green + white label), `app.routes.spec` breadcrumb → `/` integration.
- **M8 — Accessibility Audit:** ✅ complete. PRD [#48](https://github.com/Moumokhtar/elm-frontend-task/issues/48) and slices [#49](https://github.com/Moumokhtar/elm-frontend-task/issues/49)–[#52](https://github.com/Moumokhtar/elm-frontend-task/issues/52). Global focus styles, shell/main landmark + skip link, navbar + home + service detail + form ARIA/semantics; form `aria-labelledby` + stepper/list semantics; `_tokens.scss` contrast note for primary green on white.
- **M9 — Deployment & Summary:** ✅ complete. `angular-cli-ghpages`, `angular.json` `deploy` target (`baseHref` `/elm-frontend-task/`), `npm run deploy`, `SUMMARY.md` (est. vs actual hours), README live URL + deploy steps. Hosted: https://moumokhtar.github.io/elm-frontend-task/ (after first `npm run deploy` and GitHub Pages source = `gh-pages`).
- **Next up:** Maintenance / submission only — all planned milestones shipped.

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
| GitHub Pages deploy | M9 |

## Verify before starting

```bash
cd elm-frontend-task
npm install
npm run lint       # expect: all pass
npm test           # expect: all tests passing
npm run build      # expect: success
```

If any of these fail on a fresh clone, stop and investigate — don't paper over it.
