---
description: "Use when creating or refactoring API modules under src/shared/api. Enforce fetcher/services/actions folder structure, GET invocation policy (Route Handler or Server Component), non-GET via Server Actions, and handle request errors by response code field."
name: "API Layer Structure and Error Code Rules"
applyTo: "src/shared/api/**/*.ts"
---

# API Layer Structure And Error Code Rules

## Single File Principle

- Follow single-responsibility per file by default.
- One API file should own one concern only (fetch utility, service function set, response parser, or action entry).
- Do not mix fetcher internals, service orchestration, and UI/client concerns in the same file.
- Keep files focused and split when responsibilities grow.
- Existing `fetcher/` and `services/` separation is the required baseline for this principle.

## Directory Rule

- Manage API modules inside `src/shared/api`.
- Separate responsibilities with this structure:

```txt
src/shared/api/
  fetcher/
    ...
  services/
    ...
  actions/
    ...
```

- Place low-level request utilities in `fetcher`.
- Place domain API functions in `services`.
- Place Server Action entry files in `actions`.
- Do not mix domain service logic into `fetcher`.

## Server Action Location Rule

- For non-`GET` API entry points, create Server Actions under `src/shared/api/actions`.
- Keep Server Action files focused on action orchestration and delegate request details to `services`/`fetcher`.
- Do not place non-`GET` action entry points inside UI/component folders.

## HTTP Method Execution Rule

- For `GET` requests, call APIs through one of these paths:
  - Route Handler for CSR use cases (client-facing cached fetch path)
  - Server Component for SSR use cases
- For non-`GET` methods (`POST`, `PUT`, `PATCH`, `DELETE`), use Server Actions.
- Keep those Server Action entry points in `src/shared/api/actions`.
- Do not call non-`GET` APIs directly from client components.
- Keep external API endpoints, auth headers, and sensitive request details hidden behind Server Actions.

## Caching Rule For GET

- Prefer caching at Route Handler boundary for CSR flows.
- For SSR flows in Server Components, use server-side fetch caching strategy appropriate to the page requirements.
- Apply cache/revalidate policy intentionally per endpoint; do not leave caching behavior ambiguous.

## Response Contract Rule

All request handling must follow this response contract:

```ts
type ApiResponse<T = unknown> = {
  code: string;
  message: string;
  data?: T;
  errors?: string[];
};
```

## Error Handling Rule

- Handle request success/failure using `response.code` first.
- Do not treat a request as success only by HTTP status.
- Since `code` values are custom per API, classify them with `switch` per API (or per service function).
- Do not assume global fixed values such as `SUCCESS`/`FAIL`.
- If `code` indicates failure, throw or return a standardized error object including:
  - `code`
  - `message`
  - `errors`
- Keep the same error interpretation logic in a shared place in `fetcher` so `services` stay thin.

Example:

```ts
type ApiResponse<T = unknown> = {
  code: string;
  message: string;
  data?: T;
  errors?: string[];
};

type ApiError = {
  code: string;
  message: string;
  errors?: string[];
};

const assertApiSuccess = <T>(response: ApiResponse<T>): T => {
  switch (response.code) {
    // Example success code for this API only
    case "USER_PROFILE_OK": {
      return response.data as T;
    }
    // Example recoverable code
    case "USER_NOT_FOUND": {
      throw {
        code: response.code,
        message: response.message,
        errors: response.errors,
      } satisfies ApiError;
    }
    default: {
      throw {
        code: response.code,
        message: response.message,
        errors: response.errors,
      } satisfies ApiError;
    }
  }
};
```
