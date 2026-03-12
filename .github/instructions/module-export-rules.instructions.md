---
description: "Use when writing or refactoring TypeScript modules. Use default export when a file has a single exported target, and use named export list syntax when exporting multiple items."
name: "Module Export Rules"
applyTo: "**/*.{ts,tsx}"
---

# Module Export Rules

## Core Rule

- If a file exports only one target, use `default export`.
- If a file exports multiple targets, use named export list syntax: `export { A, B, C }`.

## Single Export Pattern

```ts
const LoginPage = () => {
  return <main>Login</main>;
};

export default LoginPage;
```

## Multiple Export Pattern

```ts
const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const cardTransition = { duration: 0.2 };

export { cardVariants, cardTransition };
```

## Consistency Rule

- Keep export style consistent inside each file.
- Avoid mixing `export default` and multiple direct declaration exports in the same file unless technically required.
