---
description: "Use when writing or refactoring React/Next TypeScript files for function style and Next.js rendering boundaries. Enforce arrow functions and no-CSR page rules."
name: "Frontend Function and Rendering Rules"
applyTo: "**/*.{ts,tsx}"
---

# Frontend Function And Rendering Rules

## Single File Principle

- Follow single-responsibility per file by default.
- One file should focus on one concern (view, model logic, or type definition).
- Do not mix multiple major concerns in one file.
- Prefer splitting when a file starts combining rendering and data logic heavily.
- Keep file length near or under `~100 lines` as a maintenance guardrail.
- This is not a strict line-count rule; prioritize readability and responsibility split.
- For components, split into smaller units (for example: Atomic Design style such as atom/molecule/organism roles) when scope grows.

## Arrow Function Rule

- Always use arrow functions for all functions.
- Always use arrow function components for React components.
- Do not use function declarations like `function foo()` or `export default function Component()`.

Examples:

```ts
const toQueryString = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();
```

```tsx
const LoginPage = () => {
  return <main>Login</main>;
};

export default LoginPage;
```

## Rendering Rule (No CSR Pages)

- `page.tsx` files must not be CSR pages.
- Do not mark page files with `"use client"`.
- Keep route pages server-rendered by Next.js server pipeline (SSR/SSG/ISR allowed by route intent), but never as client-rendered pages.
- If client-only interaction is needed, isolate it into child client components and keep the page itself server-side.
