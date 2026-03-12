---
description: "Use when writing or refactoring UI styles in React/Next TypeScript files. Enforce Tailwind CSS + tailwind-variants usage, style/view layer separation, and clsx grouping rules."
name: "Frontend Style Rules"
applyTo: "**/*.{ts,tsx}"
---

# Frontend Style Rules

## Single File Principle (Style Scope)

- Keep style concerns isolated from view and motion concerns.
- Put component-owned style definitions in `style.ts`.

## Tailwind Variants Rule

- Use Tailwind CSS as the default styling approach.
- Define component styles with `tailwind-variants` (`tv`) in `style.ts`.
- Keep variant logic in `style.ts`; do not build complex conditional class strings in UI files.
- Use the following shape as the default `tv` pattern:

```ts
import { tv } from "tailwind-variants";

const componentNameStyle = tv({
  base: "",
  variants: {
    variantA: {
      true: "",
      false: "",
    },
    variantB: {
      primary: "",
      secondary: "",
    },
  },
  defaultVariants: {
    variantA: "true",
    variantB: "primary",
  },
});

export default componentNameStyle;
```

## Style And View Separation Rule

- Separate style and view layers to keep files focused and single-responsibility.
- Put style definitions in `style.ts`.
- Put render logic in `ui/*.tsx` (or component `index.tsx` when no `ui` folder is used).
- UI files should consume exported style functions from `style.ts`.
- Avoid large inline Tailwind class strings in view files when the class set is component-owned style logic.

Recommended structure:

- `src/.../<Component>/style.ts`
- `src/.../<Component>/ui/<Component>.tsx`

## clsx Grouping Rule

- Use `clsx` only when merging grouped class sets with similar intent.
- Group classes by semantic category such as:
  - position/layout
  - size/spacing
  - font/typography
  - animation/transition
- Prefer composing pre-grouped strings (or variables) over one long mixed inline class list.
- Keep variant-owned style decisions in `style.ts` (`tv`) and use `clsx` for view-level composition only.

Example:

```ts
const positionClasses = "relative inset-0 flex items-center justify-center";
const sizeClasses = "w-full h-full p-4";
const fontClasses = "text-sm font-semibold";
const motionClasses = "transition-transform duration-200";

const className = clsx(
  positionClasses,
  sizeClasses,
  fontClasses,
  motionClasses,
);
```
