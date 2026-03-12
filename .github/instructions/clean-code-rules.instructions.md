---
description: "Use when writing or refactoring TypeScript/React modules. Enforce clean-code basics: clear naming, small focused functions, predictable control flow, explicit side-effect boundaries, and low-complexity modules."
name: "Clean Code Rules"
applyTo: "**/*.{ts,tsx}"
---

# Clean Code Rules

## Core Rule

- Write code that is easy to read first, then easy to extend.
- Prefer explicit and predictable code over short but implicit code.

## Naming Rule

- Use intention-revealing names for variables, functions, and types.
- Names should explain purpose, not implementation details.
- Avoid unclear abbreviations unless they are established domain terms.
- Boolean values should use clear predicates like `is`, `has`, `can`, `should`.

## Function Size And Focus Rule

- Keep functions focused on one job.
- Split functions when they start handling multiple concerns (validation, transformation, side effects, rendering decisions).
- Prefer early returns to reduce nested condition blocks.
- Keep control flow simple and shallow.

## File Size Guideline

- Keep files small and easy to scan.
- Treat `~100 lines` as a soft guardrail, not a hard limit.
- When a file grows because of mixed responsibilities, split by concern first (view/model/style/type/helper) instead of compressing code.
- For UI-heavy modules, prefer component decomposition (for example, Atomic Design style separation) to keep each file focused and maintainable.

## Abstraction Level Rule

- Keep each function at a single abstraction level.
- Do not mix high-level orchestration with low-level implementation details in the same function.
- Extract low-level details into helper functions when orchestration readability drops.

## Duplication Rule

- Remove meaningful duplication when the same behavior appears in multiple places.
- Do not over-abstract small incidental similarities.
- Abstract only when duplicated logic has the same reason to change.

## Side Effect Boundary Rule

- Separate pure logic from side effects (network, storage, DOM, time, random).
- Keep side-effect code close to boundary layers (actions, handlers, adapters).
- Pass required data into pure functions instead of reading global state directly.

## Error Handling Rule

- Fail fast on invalid states and return/throw consistent error shapes.
- Do not swallow errors silently.
- Include actionable context in errors when propagating (what failed and where).

## Constant And Literal Rule

- Replace unexplained magic numbers/strings with named constants.
- Place shared constants in proper `config`/`constants` modules.
- Keep literals inline only when they are obvious and local.

## Comment Rule

- Prefer self-explanatory code over comments.
- Add comments only when expressing intent, constraints, or non-obvious trade-offs.
- Remove comments that duplicate what the code already states.

## Change Scope Rule

- Keep refactors incremental and scoped.
- In behavior-changing edits, include or update tests for changed logic when test coverage exists.
- Avoid unrelated formatting or structural churn in the same change.
