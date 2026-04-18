# Elm Frontend Task — Time Summary

Estimated vs actual effort by milestone. **Actual** values are approximate (session-based notes, not a stopwatch); adjust if you need exact accounting for submission.

| Milestone | Scope (short) | Estimated (h) | Actual (h, approx.) |
|-----------|----------------|-----------------|----------------------|
| M0 | Project bootstrap, tooling, tokens | 3 | 3 |
| M1 | Navbar (desktop + mobile, PrimeNG) | 6 | 7 |
| M2 | Footer layout + assets | 4 | 4 |
| M3 | Shared UI (cards, breadcrumb, feedback, etc.) | 8 | 9 |
| M4 | Home page (hero, sections, carousels) | 12 | 14 |
| M5 | Service detail page | 10 | 11 |
| M6 | Form page (wizard, inputs, validation) | 10 | 11 |
| M7 | Routing, shell, 404, navbar active routes | 5 | 5 |
| M8 | Accessibility pass (focus, ARIA, semantics) | 6 | 6 |
| M9 | GitHub Pages deploy, `SUMMARY.md`, README | 2 | 2 |
| **Total** | | **66** | **72** |

## Notes

- **M9 deploy:** Run `npm run deploy` (or `ng deploy`) from a machine with Git credentials for `https://github.com/Moumokhtar/elm-frontend-task.git`. First-time setup: enable **GitHub Pages** from the **`gh-pages`** branch in the repository **Settings → Pages**. The app is served under **`/elm-frontend-task/`**; `angular-cli-ghpages` emits **`404.html`** (copy of `index.html`) so deep links to `/service` and `/form` resolve without Hash routing.
- **Hosted URL (after first successful deploy):** https://moumokhtar.github.io/elm-frontend-task/
