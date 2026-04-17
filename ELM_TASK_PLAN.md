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

## MILESTONE 2 — Shared Layout: Footer

**Goal:**
Full footer matching Figma across desktop and mobile.

**Scope:**
Standalone `FooterComponent`. Four-column link grid (ملخص, روابط مهمة, الاتصال والدعم, تابعنا على): each column has a heading and list of links. Social icons row (X, LinkedIn, Instagram). Accessibility tools row (3 icon buttons). Bottom bar: copyright text, links (خريطة الموقع, RSS, تطبيق الجوال). Stacks to single column on mobile.

**Done when:**

- [x] Four columns render with correct headings and links
- [x] Social icons render and are keyboard-focusable with ARIA labels
- [x] Accessibility tool icons render as focusable buttons
- [x] Bottom bar renders with copyright + links
- [x] Footer stacks correctly on mobile
- [x] All links are `<a>` tags with meaningful text (no "click here")

---

## MILESTONE 3 — Shared UI Components

**Goal:**
Build the reusable components used across multiple pages so later milestones just compose them.

**Scope:**

- `ServiceCardComponent` — checkmark icon, title, description, tag chips (وسم badges), primary + secondary action buttons
- `NewsCardComponent` — image, two-line title, body text, "قراءة المزيد" button
- `PartnerLogoComponent` — logo image + label, used inside partner carousel
- `BreadcrumbComponent` — accepts array of `{label, route}`, renders with `>` separator (RTL reversed)
- `SectionHeaderComponent` — accepts title, subtitle, optional action button (عرض الكل)
- `PageFeedbackBarComponent` — "هل كانت هذه الصفحة مفيدة؟" + نعم/لا buttons + counter text

**Done when:**

- [ ] `ServiceCardComponent` renders all slots and both buttons are focusable
- [ ] `NewsCardComponent` renders image + text + button correctly
- [ ] `BreadcrumbComponent` emits correct aria-label and marks last item `aria-current="page"`
- [ ] `SectionHeaderComponent` renders title, subtitle, optional button
- [ ] `PageFeedbackBarComponent` renders and both buttons are keyboard accessible
- [ ] All components are standalone and exported from a `shared` barrel

---

## MILESTONE 4 — Home Page

**Goal:**
Full pixel-perfect home page composed from shared components and PrimeNG carousels.

**Scope:**
Five sections stacked vertically:

1. **Hero** — full-width dark green banner, Arabic heading + subtitle + CTA button on right, dot pagination (PrimeNG Carousel or manual dots), 4 slides
2. **About (من نحن)** — `SectionHeaderComponent`, secondary CTA button, 4 stats in a row: icon + "1.5M" number + label (شخص). Icons from PrimeNG or Bootstrap Icons.
3. **Services (قسم الخدمات)** — `SectionHeaderComponent`, horizontal PrimeNG Carousel of `ServiceCardComponent` items, prev/next arrow buttons, dot indicators
4. **News (قسم الاخبار والمقالات)** — `SectionHeaderComponent`, 3-column Bootstrap grid of `NewsCardComponent`, collapses to 1-column on mobile with carousel
5. **Partners (قسم الشركاء)** — PrimeNG Carousel of `PartnerLogoComponent` items, prev/next arrows

All sections use `SectionHeaderComponent`. `PageFeedbackBarComponent` not on homepage. Last-updated date in footer area.

**Done when:**

- [ ] Hero banner is full-width green with correct text alignment (right)
- [ ] Hero dot indicators are visible and clickable
- [ ] Stats section shows 4 items in a row on desktop, 2×2 on mobile
- [ ] Services carousel scrolls with arrows and dot indicators
- [ ] News cards render in 3-column grid on desktop
- [ ] Partners carousel scrolls with prev/next arrows
- [ ] Page is navigable by keyboard end-to-end

---

## MILESTONE 5 — Service Detail Page

**Goal:**
Full service detail page with sidebar info panel, tabs, video placeholder, related services carousel, and rating.

**Scope:**

**Right column (main content):**

- `BreadcrumbComponent` at top
- Service title (رخصة بناء), tag chips (الجهة, رحلة الحياة, المنصة)
- Description paragraph
- "اتفاقية مستوى الخدمة" link with icon
- PrimeNG `TabView` with 3 tabs: الخطوات | شروط الاستخدام | المستندات المطلوبة
- الخطوات tab content: video placeholder (dark bg + play button icon) + numbered steps list
- `PageFeedbackBarComponent` at bottom of main content
- Rating row: star rating (PrimeNG Rating, readonly, 3.9) + review count + "قيم هذه الخدمة" button

**Left sidebar:**

- "بدء الخدمة" primary button (full width)
- Info rows: الفئة المستهدفة, مدة الخدمة, قنوات الخدمة, تكلفة الخدمة, قنوات الدفع (stc pay + mada logos), الاسئلة الشائعة link, الهاتف, البريد الإلكتروني, تحميل دليل المستخدم button
- Mobile app badges: App Store, Google Play, AppGallery

**Related services section:**

- `SectionHeaderComponent` (خدمات ذات صلة)
- PrimeNG Carousel of `ServiceCardComponent` items

On mobile: sidebar moves below main content. Tabs remain functional.

**Done when:**

- [ ] Breadcrumb renders correctly
- [ ] Tags render as styled chips
- [ ] All 3 tabs are keyboard switchable with correct ARIA roles
- [ ] Video placeholder renders with centered play icon
- [ ] Steps list renders as numbered items
- [ ] Sidebar info rows all render with icons and values
- [ ] Rating displays correctly (readonly stars + count)
- [ ] Related services carousel works
- [ ] `PageFeedbackBarComponent` renders at bottom
- [ ] Layout stacks correctly on mobile

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
`PageFeedbackBarComponent` above footer.

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
- [ ] `PageFeedbackBarComponent` renders

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
