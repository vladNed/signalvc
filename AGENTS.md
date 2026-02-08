# AGENTS.md

## Project Snapshot

-   Monorepo layout: `apps/`, `packages/`, `tools/`, with `api/` kept at repo root for now.
-   Workspace tooling: pnpm workspaces (`pnpm-workspace.yaml`) + Turborepo (`turbo.json`).
-   Apps:
    -   `apps/web`: Next.js app.
    -   `apps/mobile`: Expo app (blank TypeScript template) with minimal Metro config.
-   Shared packages:
    -   `packages/data-access`, `packages/domain`, `packages/store`, `packages/types`, `packages/utils`.
-   Package scope: `@signalvc/*` across apps and packages.

## Frontend Architecture

We adhere to a **Feature-Entity-Shared** architecture for scalability and separation of concerns.

### Directory Structure

-   **/features**: Self-contained product features (e.g., `Feed`, `UserProfile`, `Authentication`).
-   **/entities**: Business domain objects used across multiple features (e.g., `Post`, `User`, `Comment`).
-   **/shared**: Truly generic reusable code (e.g., `UI Components`, `Hooks`, `Utils`, `Theme`).

#### Component Module Structure
Inside each feature/entity/shared module:
```text
/feature-name
  /consts      # Constants
  /assets      # API assets (SVGs, static images)
  /services    # RTK Query API, Redux slices
  /components  # UI components
  /pages       # (Features only) Main page exports
  /utils       # Helper functions
  /hooks       # Custom React hooks
  /models      # TypeScript models (Zod schemas encouraged for external data)
  /__tests__   # Unit/Integration tests co-located with the module
  index.ts     # Public API (Barrel file) - ONLY exports what other modules can use
```

### Integration with Frameworks
-   **Next.js (`apps/web/app`) & Expo (`apps/mobile/app`)**:
    -   The `app/` folder is for **routing only**.
    -   Pages in `app/` should import and render pages/components from `@/features`.
    -   Keep logic out of the `app/` directory.

### Dependency Rules (Strict)
1.  **Features** cannot import from other **Features**. Move shared logic to Entity/Shared.
2.  **Entities** cannot import from **Features**.
3.  **Shared** cannot import from **Features** or **Entities**.
4.  **Encapsulation**: Always import from the public `index.ts` (e.g., `@/features/feed`), never deep imports. This is enforced by ESLint.

### Best Practices & Testing
-   **State**: Redux Toolkit (RTK) for global state; RTK Query for server state.
-   **Testing**: Unit and Integration tests using Vitest + React Testing Library.
    -   Tests reside in `__tests__` folders within the module.
    -   Focus on behavior (what the user sees), not implementation details.
-   **Data Validation**: Use Zod for runtime validation of external data (API responses, forms).

## UI Component Framework

We use a **Twin-Implementation Strategy** for cross-platform UI in `packages/ui`.

-   **Goal**: Semantic HTML for Web (SEO), Native Performance for Mobile, Shared Design System.
-   **Tech**: Tailwind CSS (Web) + NativeWind (Mobile) + CVA (Shared Logic).

### Component Recipe
Every component in `packages/ui/src/components` must have:
1.  `component.variants.ts`: Shared styling logic using `class-variance-authority` (CVA).
2.  `index.web.tsx`: **Web Implementation**. Uses **Semantic HTML** (e.g., `<button>`).
3.  `index.tsx`: **Mobile Implementation**. Uses **Native Primitives** (e.g., `<Pressable>`).
4.  `index.ts`: Public export.

### Rules
-   **No "React Native for Web"**: We do not map `View` to `div`. Web must be written manually with semantic tags.
-   **Shared Tokens**: All apps must consume the shared `tailwind.config.ts` from `packages/ui`.
-   **Atomic Design**: Small primitives (Button, Input) live in `packages/ui`. Complex, domain-aware components live in `features` or `entities`.

## Tooling Decisions

-   Root `package.json` scripts delegate to Turbo:
    -   `dev`, `build`, `lint`, `typecheck`, `test`.
-   Turbo tasks:
    -   `dev` is persistent and not cached.
    -   `build` depends on upstream builds and caches `dist/**`, `.next/**`, `build/**`.
    -   `lint`, `typecheck`, `test` depend on upstream tasks and do not cache outputs.
-   Dev workflow notes:
    -   Root `pnpm dev` (Turbo) starts every `dev` script in parallel; Expo then lacks a TTY so keypress shortcuts (e.g. `i` for iOS) don't work.
    -   For interactive servers, run per-app: `pnpm --filter @signalvc/mobile dev` or `pnpm --filter @signalvc/web dev` in separate terminals.
    -   Use Turbo for non-interactive, fan-out tasks (`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`).

## Linting & Formatting

-   ESLint is shared via `packages/eslint-config` (flat config, strict type-aware rules).
    -   Apps extend the shared config using their local `tsconfig.json`.
-   Prettier is shared via `packages/prettier-config` and root `.prettierrc.cjs`.
-   `apps/web` uses Next.js ESLint presets plus shared strict rules.
-   `apps/mobile` uses shared strict rules with a minimal flat config.

## Expo Monorepo Notes

-   `apps/mobile/metro.config.js` uses `@expo/metro-config` minimal setup to ensure workspace packages resolve.

## Explicit Non-Decisions

-   No shared `tsconfig.base.json` at this time.
-   No `helloDomain()` wiring in apps.
-   `api/` is not included in Turbo yet.

## LLM Collaboration Rule

-   When a discussion with the LLM produces a clearly relevant or actionable conclusion, the LLM must ask the user whether to capture that idea in `AGENTS.md` before proceeding.
