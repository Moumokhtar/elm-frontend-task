# Start-Building Local Workflow (Main-Only)

This file is the project-local execution contract for this repository.

This is a Cursor/repo-local override only. It does not modify or replace your global Claude Code skill.

- Scope: frontend-only Angular mock app
- Branch policy: `main` only
- Tracking: GitHub PRD issue + child slice issues
- Gates: strict explicit confirmation gates
- No mandatory model switching

## How to Trigger

When the user says `start-building`, run this workflow in order.

## Phase 0 - Session Recovery (Always First)

1. Check repo state:
   - `git status --short --branch`
   - `git log --oneline -n 8`
2. Check milestone state in GitHub issues:
   - find open PRD/milestone issue
   - find child slice issues and their states
3. Determine resume point:
   - no PRD issue -> Phase 1
   - PRD exists, no child issues -> Phase 2
   - child issues exist with open items -> Phase 3
   - all child issues closed -> Phase 4
4. Report findings and stop for explicit user confirmation.

## Phase 1 - Analysis and Orientation

1. Read only:
   - `docs/current-state.md`
   - current milestone section in `ELM_TASK_PLAN.md`
2. Summarize in 2-3 sentences:
   - what will be built
   - what is out of scope
   - top constraints (frontend-only, RTL, accessibility)
3. Run a focused grill-style Q&A for unclear requirements and edge cases.
4. Gate: wait for explicit user confirmation before Phase 2.

## Phase 2 - Planning and Issue Breakdown

1. Create/update one PRD issue for the current milestone.
2. Create thin vertical-slice child issues with acceptance criteria.
3. Apply milestone label to PRD + child issues.
4. Gate: wait for explicit user approval of PRD + issue split.

## Phase 3 - Implementation (Slice by Slice on main)

For each child issue in dependency order:

1. State slice scope before writing code.
2. Read only minimal relevant files for that slice.
3. Implement code + tests together.
4. Verify:
   - `npm run lint`
   - `npm test`
5. Present what changed and map evidence to acceptance criteria.
6. Gate: wait for explicit user approval.
7. Commit on `main` with `Closes #<issue-number>`.
8. Comment on issue with commit hash and close the issue.

If implementation goes sideways:

- stop immediately
- explain failure clearly
- re-align with the user before continuing

## Phase 4 - Post-Implementation (Frontend-Only)

1. Update only frontend-relevant docs:
   - `README.md` (if setup/usage changed)
   - `docs/current-state.md` (status updates)
   - optional UI notes when useful
2. Close parent PRD issue with summary + key outcomes.
3. Gate: wait for final user confirmation.
4. Push final approved commits on `main`.

## Model Recommendations (Efficiency-First)

- Phase 0/1: high-reasoning model for discovery, ambiguity, and edge cases
- Phase 2: balanced model for structured drafting and issue decomposition
- Phase 3: balanced model by default; escalate to high-reasoning for risky slices
- Phase 4: balanced or fast model for mechanical wrap-up

## Non-Negotiable Controls

- no silent requirement decisions
- Figma-first fidelity rule:
  - treat the target Figma frame as the source of truth for spacing, colors, alignment, sizing, typography, and visual hierarchy
  - do not approximate visual values when Figma provides explicit values/tokens
  - any intentional deviation requires explicit user approval first
- explicit approval before risky changes:
  - new dependencies
  - auth/session logic
  - large UI architecture shifts
- icon consistency rule across the whole app:
  - prefer the closest available icon from installed sets (Bootstrap Icons, PrimeIcons; Brave only when installed)
  - keep icon size and icon-label spacing aligned with Figma and existing token/utility patterns
- keep tests in each slice, not postponed
- preserve existing user changes unless explicitly asked otherwise
