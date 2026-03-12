---
description: "Use when defining or refactoring TypeScript types. Use interface for structured object groups and type for one-of selection cases like unions."
name: "Type Declaration Rules"
applyTo: "**/*.{ts,tsx}"
---

# Type Declaration Rules

## Core Rule

- Use `interface` for structured data groups (object-shaped contracts).
- Use `type` when selecting one among options.

## When To Use `interface`

- Domain entities and DTO-like object structures
- Component props with object shape
- API response item models with object shape

## Component Props File Rule

- Define component type declarations in `model/props.type.ts`.
- In `model/props.type.ts`, define the component contract as `interface {ComponentName}`.
- Keep one component contract per file unless multiple tightly-coupled contracts are required.

Example:

```ts
export interface UserProfile {
  id: string;
  nickname: string;
  email: string;
}
```

## When To Use `type`

- Union/literal selection types
- Discriminated unions
- Utility compositions where one-of semantics are central

Example:

```ts
type AuthProvider = "google" | "kakao" | "email";

type AuthState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; provider: AuthProvider };

export { AuthProvider, AuthState };
```

## Consistency Rule

- Keep this convention consistent across `shared/types`, component props files, API models, and feature-level model types.
