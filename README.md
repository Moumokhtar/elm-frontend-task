# Elm Frontend Task

Arabic (RTL) web app built with Angular 21 + Bootstrap 5 + PrimeNG v20.

## Stack

- **Framework:** Angular 21 (standalone components, client-side routing, strict mode)
- **UI:** Bootstrap 5 (RTL build) + PrimeNG v20 (Aura preset)
- **Icons:** PrimeIcons + Bootstrap Icons
- **Styling:** SCSS
- **Font:** IBM Plex Sans Arabic (Google Fonts)
- **Testing:** Vitest + jsdom
- **Tooling:** ESLint (angular-eslint) + Prettier

## Prerequisites

- Node.js >= 20 (LTS recommended; see `.nvmrc`)
- npm 11+

## Commands

```bash
npm install       # install dependencies
npm start         # run dev server on http://localhost:4200
npm run build     # production build
npm test          # run unit tests (Vitest)
npm run lint      # lint TypeScript and templates
npm run format    # format with Prettier
```

## Project Structure

```
src/app/
  core/        # singletons, guards, interceptors
  shared/      # reusable presentational components/pipes
  layout/      # shell, header, footer
  features/    # feature pages (home, service, form)
```

Path aliases: `@core/*`, `@shared/*`, `@layout/*`, `@features/*`.

See `ELM_TASK_PLAN.md` for the full milestone plan.

## Start-Building Workflow (Local)

For this repository, the project-local start-building contract is documented in:

- `docs/start-building.local.md`

Use this local workflow when starting implementation sessions. It is main-only, keeps strict approval gates, and is tailored for this frontend-only mock app.
