# Elm Frontend Task — Development Plan

Angular + Bootstrap + PrimeNG | RTL Arabic | April 2026

---

## Design Reference

Figma: https://www.figma.com/design/wh34oGmGLBesPFMgXM4BLS/Frontend-Task--RTL?node-id=0-1&m=dev

**Pages:**

- Home Page (3 sections + hero carousel + footer)
- Service Detail Page (sidebar info panel + tabs + related services)
- Form Page (multi-step wizard + varied input types)

**Responsive:** Desktop + Mobile breakpoints for all pages.

---

## Global Rules

- Angular v17+ standalone components throughout — no NgModules
- RTL direction set globally (`dir="rtl"`, `direction: rtl` in styles)
- Bootstrap handles layout/grid; PrimeNG handles interactive components (carousel, tabs, rating, etc.)
- All Arabic text hardcoded as placeholder content matching the Figma copy
- No backend — all data is static/mock
- Accessibility: semantic HTML, ARIA labels, keyboard navigation on all interactive elements
- Each milestone is independently committable

---

## MILESTONE 0 — Project Bootstrap ✅ Complete

Shipped. See [PRD #1](https://github.com/Moumokhtar/elm-frontend-task/issues/1) and slices #2–#7.

---

## MILESTONE 1 — Shared Layout: Navbar ✅ Complete

Shipped. See [PRD #8](https://github.com/Moumokhtar/elm-frontend-task/issues/8) and slices #9–#13.

---

## MILESTONE 2 — Shared Layout: Footer ✅ Complete

Shipped. See [PRD #14](https://github.com/Moumokhtar/elm-frontend-task/issues/14) and slices #15–#19.

---

## MILESTONE 3 — Shared UI Components ✅ Complete

Shipped. See [PRD #20](https://github.com/Moumokhtar/elm-frontend-task/issues/20) and slices #21–#27.

---

## MILESTONE 4 — Home Page ✅ Complete

Shipped. See [PRD #28](https://github.com/Moumokhtar/elm-frontend-task/issues/28) and slices #29–#35.

---

## MILESTONE 5 — Service Detail Page ✅ Complete

Shipped. See [PRD #36](https://github.com/Moumokhtar/elm-frontend-task/issues/36) and slice [#37](https://github.com/Moumokhtar/elm-frontend-task/issues/37).

---

## MILESTONE 6 — Form Page ✅ Complete

Shipped. See [PRD #38](https://github.com/Moumokhtar/elm-frontend-task/issues/38) and slices [#39](https://github.com/Moumokhtar/elm-frontend-task/issues/39)–[#43](https://github.com/Moumokhtar/elm-frontend-task/issues/43). Implementation: `src/app/features/form/` (`form-page`, `form-mock.ts`), route `/form`, stepper + التالي/رجوع step state with validation on the fields step, Figma input variants (incl. merged affix corners), `FeedbackBlock`.

---

## MILESTONE 7 — Routing & Page Shell ✅ Complete

Shipped. See [PRD #44](https://github.com/Moumokhtar/elm-frontend-task/issues/44) and slices [#45](https://github.com/Moumokhtar/elm-frontend-task/issues/45), [#47](https://github.com/Moumokhtar/elm-frontend-task/issues/47), [#46](https://github.com/Moumokhtar/elm-frontend-task/issues/46). Implementation: `app.routes.ts` wildcard 404 → `src/app/features/not-found/not-found-page`, navbar `routerLink` on logos + `routerLinkActive` / `aria-current="page"` on routed items (desktop + mobile; active fill `var(--button-background-primary-default)`), `app.routes.spec` harness + breadcrumb integration.

---

## MILESTONE 8 — Accessibility Audit ✅ Complete

Shipped. See [PRD #48](https://github.com/Moumokhtar/elm-frontend-task/issues/48) and slices [#49](https://github.com/Moumokhtar/elm-frontend-task/issues/49)–[#52](https://github.com/Moumokhtar/elm-frontend-task/issues/52) (global `:focus-visible` in `src/styles/_focus.scss`; shell skip link + `main#main-content`, navbar mobile region + submenu `aria-*`, 404 `<h1>`; home hero semantics + carousel `aria-label`; service detail tabpanels + `aria-selected` / `aria-controls`; form page `aria-labelledby`, stepper `aria-current` on list items, mobile `role="status"`, required fields `aria-required` / `aria-invalid` / `aria-describedby`; token contrast note on primary green).

---

## MILESTONE 9 — Deployment & Summary

**Goal:**
Deploy to GitHub Pages and write the time estimate vs actual summary for submission.

**Scope:**
Install `angular-cli-ghpages`, configure `baseHref` for GitHub Pages, run deploy script. Write `SUMMARY.md` with a table of estimated vs actual hours per milestone.

**Done when:**

- [ ] `ng deploy` completes successfully
- [ ] Hosted URL loads the home page correctly
- [ ] All 3 routes work on the hosted URL (no 404 on direct navigation — HashLocationStrategy or 404.html redirect)
- [ ] `SUMMARY.md` has time estimate vs actual table
- [ ] GitHub repo is public with clean commit history
- [ ] README includes the hosted URL and local setup instructions (`npm install`, `ng serve`)

---

_Elm Frontend Task Plan | Mohamed Muktar | April 2026_
