# AGENTS.md

## Project Snapshot

- Monorepo layout: `apps/`, `packages/`, `tools/`, with `api/` kept at repo root for now.
- Workspace tooling: pnpm workspaces (`pnpm-workspace.yaml`) + Turborepo (`turbo.json`).
- Apps:
  - `apps/web`: Next.js app.
  - `apps/mobile`: Expo app (blank TypeScript template) with minimal Metro config.
- Shared packages:
  - `packages/data-access`, `packages/domain`, `packages/store`, `packages/types`, `packages/utils`.
- Package scope: `@signalvc/*` across apps and packages.

## Tooling Decisions

- Root `package.json` scripts delegate to Turbo:
  - `dev`, `build`, `lint`, `typecheck`, `test`.
- Turbo tasks:
  - `dev` is persistent and not cached.
  - `build` depends on upstream builds and caches `dist/**`, `.next/**`, `build/**`.
  - `lint`, `typecheck`, `test` depend on upstream tasks and do not cache outputs.

## Linting & Formatting

- ESLint is shared via `packages/eslint-config` (flat config, strict type-aware rules).
  - Apps extend the shared config using their local `tsconfig.json`.
- Prettier is shared via `packages/prettier-config` and root `.prettierrc.cjs`.
- `apps/web` uses Next.js ESLint presets plus shared strict rules.
- `apps/mobile` uses shared strict rules with a minimal flat config.

## Expo Monorepo Notes

- `apps/mobile/metro.config.js` uses `@expo/metro-config` minimal setup to ensure workspace packages resolve.

## Explicit Non-Decisions

- No shared `tsconfig.base.json` at this time.
- No `helloDomain()` wiring in apps.
- `api/` is not included in Turbo yet.
