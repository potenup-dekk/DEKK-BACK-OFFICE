---
description: "Use when creating or refactoring frontend file structures. Enforce Feature-Sliced Design (FSD) directory tree, layer responsibilities, and import boundaries."
name: "FSD File Tree Rules"
applyTo: "src/**/*.{ts,tsx}"
---

# FSD File Tree Rules

## Core Rule

- Follow Feature-Sliced Design (FSD) for frontend file/folder organization.
- Organize by business/domain responsibility first, then by technical role.

## Standard Layers

Use this top-level order and responsibility:

- `app`: app initialization, providers, global styles, router composition
- `pages`: route-level page compositions
- `widgets`: large UI blocks composed from multiple features/entities
- `features`: user actions/use-cases (like auth, like-card, upload-item)
- `entities`: core domain objects (user, card, product)
- `shared`: reusable technical foundation (ui kit, api client, lib, config, types)

## Dependency Direction Rule

- Allowed dependency direction is downward only:
  - `app -> pages -> widgets -> features -> entities -> shared`
- Upper layers must not be imported by lower layers.
- `shared` must not depend on any upper business layer.

## Slice And Segment Rule

Inside each slice, split by segment responsibility when needed:

- `ui/`: presentational components
- `model/`: state, hooks, business logic
- `api/`: slice-specific API calls/adapters
- `lib/`: local helpers
- `config/`: local constants/config
- `types/`: local types

Example:

```txt
src/features/auth/
  ui/
  model/
  api/
  lib/
  types/
  index.ts
```

## Public API Rule

- Each slice exposes only its public API through `index.ts`.
- Other layers/slices should import from `index.ts`, not deep internal files.
- Deep imports like `features/auth/model/internalX` are disallowed unless there is an explicit exception.

## Single File Principle Alignment

- Keep one file focused on one concern.
- Keep style, view, motion, and model concerns separated according to existing project rules.

## Next.js App Router Note

- Keep route files under `src/app` (App Router convention).
- Place reusable business logic and UI structures in FSD layers (`widgets/features/entities/shared`) and compose them in route files.
