---
description: "Use when adding or refactoring framer-motion usage in React/Next TypeScript files. Enforce animation config separation into model/animate.ts and preserve server-component-first boundaries."
name: "Framer Motion Rules"
applyTo: "**/*.{ts,tsx}"
---

# Framer Motion Rules

## Animation Config Separation Rule

- Do not inline `framer-motion` animation variants or transition objects directly inside UI component files.
- Define and export animation-related constants/functions in `model/animate.ts`.
- Import animations from `model/animate.ts` in the UI component.

Recommended structure:

- `src/.../<Feature>/model/animate.ts`
- `src/.../<Feature>/ui/<Component>.tsx`

Example:

```ts
import type { Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const cardTransition = { duration: 0.28, ease: "easeOut" };

export { cardTransition, cardVariants };
```

## Server Component Priority Rule

- Components without `framer-motion` should be written to run as SSR/server components when possible.
- Avoid `"use client"` unless client-only features are required.
- If a component uses `framer-motion`, isolate the animated part as a client component and keep non-animated wrappers/server-safe parts in server components where possible.
- Do not add client-only hooks (`useEffect`, `useState`, browser APIs) to components that can remain server components.
