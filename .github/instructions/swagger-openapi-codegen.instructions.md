---
description: "Use when adding APIs from endpoint-only input. Resolve endpoint contracts from OpenAPI JSON (Swagger source) and implement API modules with strict GET/non-GET boundaries."
name: "Swagger OpenAPI Endpoint-Only API Rules"
applyTo: "src/shared/api/**/*.ts"
---

# Swagger OpenAPI Endpoint-Only API Rules

## Goal

- Support API implementation from endpoint-only input.
- Resolve request/response contracts from OpenAPI JSON, not guesses.
- Keep implementation aligned with shared API layer rules.

## Input Rule

- Required: endpoint path (example: `/v1/categories`).
- Optional: method (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- Optional: OpenAPI JSON URL.

## OpenAPI Source Rule

- Prefer OpenAPI JSON URL for machine-readable parsing.
- Default source URL is `http://localhost:8080/v3/api-docs` if no source is provided.
- If only Swagger UI URL is provided (example: `http://localhost:8080/swagger-ui/index.html`), convert it to OpenAPI JSON URL first.
- Do not implement contracts from Swagger UI labels/screenshots only.

## Endpoint Resolution Rule

- Locate endpoint under OpenAPI `paths`.
- Validate method-level contract before coding:
  - path/query/header params
  - request body schema
  - response schema
  - expected response status codes
- If endpoint or method does not exist in schema, stop and request corrected endpoint or schema URL.

## API Layer Implementation Rule

- Place modules only under:

```txt
src/shared/api/
  fetcher/
  services/
  actions/
```

- `GET` method:
  - implement service function in `services`
  - call through Route Handler (CSR) or Server Component (SSR)
- non-`GET` methods (`POST`, `PUT`, `PATCH`, `DELETE`):
  - implement service function in `services`
  - expose Server Action in `actions`
  - do not call non-`GET` directly from client components

## Codegen Rule

- Endpoint-based codegen is allowed if it preserves `fetcher/services/actions` responsibilities.
- Generated files should be isolated from hand-written files (example: `services/generated`, `actions/generated`).
- Re-run generation only for changed endpoints when possible.
- Do not manually edit generated output unless generation templates/rules are updated together.

## Response/Error Rule

- Interpret business success/failure with `response.code` first.
- Do not use HTTP status alone as business success criteria.
- Return or throw standardized error shape (`code`, `message`, `errors`) from shared fetcher-level handling.

## Verification Rule

- Confirm all of the following after implementation or regeneration:
  - endpoint contract matches OpenAPI JSON
  - GET/non-GET runtime boundaries are preserved
  - non-GET requests are routed through Server Actions
  - `response.code`-based error handling path exists
  - lint/type checks pass