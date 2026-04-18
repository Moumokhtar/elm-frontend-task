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

## MILESTONE 6 — Form Page (Multi-Step)

**Goal:**
Multi-step form page with step wizard, varied field types, validation states, and back/next navigation.

**Scope:**

**Left sidebar (desktop):**

- Step wizard: Step 1 (checkmark = completed), Step 2 (active, number badge), Step 3 (inactive). Each step has title + subtitle. Connected by vertical line.
- On mobile: replaced by top progress indicator "الخطوة الأول — وصف الخطوة — 1 من 4"

**Main form area:**
Page title (حقول النص) + description paragraph.
"\* المعلومات المطلوبة" required fields notice in red.

2-column Bootstrap grid of field pairs (right = required إلزامي, left = optional اختياري):

| Row | Right (Required)                             | Left (Optional)                 |
| --- | -------------------------------------------- | ------------------------------- |
| 1   | Plain text input                             | Plain text input                |
| 2   | Text input with search icon (suffix)         | Text input with search icon     |
| 3   | Text input with text prefix (نص)             | Text input with text prefix     |
| 4   | Text input with dropdown prefix              | Text input with dropdown prefix |
| 5   | Plain text + helper text (نص مساعد)          | Plain text + helper text        |
| 6   | Error state (red border + red error message) | Error state                     |
| 7   | Disabled input (full row, single column)     | Disabled input                  |

Bottom: رجوع (back) + التالي (next, primary) buttons, right-aligned.
`FeedbackBlock` (helpfulness row) above footer.

On mobile: single column, same fields stacked.

**Validation:**

- Required fields show red border + error message when submitted empty
- Helper text renders below field in grey
- Disabled fields are non-interactive with muted styling

**Done when:**

- [ ] Step wizard renders all 3 steps with correct states (done/active/inactive)
- [ ] Mobile step progress indicator renders correctly
- [ ] Required field indicator (\*) renders in red
- [ ] All 7 field row types render correctly matching Figma
- [ ] Error state renders with red border and red helper text
- [ ] Disabled state renders as non-interactive
- [ ] Back button is visible; Next button is primary green
- [ ] Form fields are all labelled (explicit `<label for>` or `aria-label`)
- [ ] Tab key moves through all fields in logical order
- [ ] `FeedbackBlock` renders

---

## MILESTONE 7 — Routing & Page Shell

**Goal:**
Wire all routes, add active nav link highlighting, and ensure back/next on the form page navigates correctly.

**Scope:**
`app.routes.ts` routes finalized. `RouterLink` on nav items. Active route gets highlighted nav item. Form page Next button navigates to a dummy step 2 placeholder (or loops). Breadcrumb links are functional. 404 fallback route renders a simple "الصفحة غير موجودة" message.

**Done when:**

- [ ] `/` loads home page
- [ ] `/service` loads service detail page
- [ ] `/form` loads form page
- [ ] Active nav item is visually highlighted
- [ ] Breadcrumb home link navigates to `/`
- [ ] Form Next/Back buttons work (step state changes or route changes)
- [ ] Unknown route shows 404 message
- [ ] Browser back/forward buttons work correctly

---

## MILESTONE 8 — Accessibility Audit

**Goal:**
Verify and fix all keyboard navigation, ARIA, and semantic HTML issues before deployment.

**Scope:**
Full pass across all 3 pages:

- All interactive elements reachable by Tab
- Focus ring visible on all focusable elements (override Bootstrap's `:focus-visible` if needed)
- All images have `alt` text
- All icon-only buttons have `aria-label`
- Carousels have prev/next button ARIA labels
- Tabs have correct `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Form inputs all have associated labels
- Error messages linked to inputs via `aria-describedby`
- Step wizard has correct `aria-current="step"`
- Color contrast passes WCAG AA on green/white text

**Done when:**

- [ ] Tab-only navigation completes all 3 pages without mouse
- [ ] No interactive element is unreachable by keyboard
- [ ] All images have non-empty `alt` attributes
- [ ] All icon buttons have `aria-label`
- [ ] PrimeNG tab component has correct ARIA roles applied
- [ ] Form error messages are linked via `aria-describedby`
- [ ] No WCAG AA contrast failures on primary text/background combinations

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
