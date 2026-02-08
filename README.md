# SignalVC Monorepo

Welcome to the SignalVC monorepo. This codebase contains the web application, mobile application, and shared packages for the SignalVC platform.

## Project Structure

-   **`apps/web`**: Next.js application (Admin/User Dashboard).
-   **`apps/mobile`**: Expo React Native application (iOS/Android).
-   **`packages/ui`**: Shared UI Component Library (Twin-Implementation).
-   **`packages/*`**: Shared logic (domain, store, utilities).
-   **`api`**: Python FastAPI Backend.

## Getting Started

### Prerequisites
-   **Node.js**: v20+
-   **pnpm**: v9+
-   **Python**: v3.11+ (for API)

### Installation

```bash
# Install Node dependencies
pnpm install
```

## 🛠 Development Workflows

We use **Turborepo** to manage tasks. You can run commands from the root.

### Running Apps

**Option A: Run Everything (Parallel)**
```bash
pnpm dev
```
> *Note: This runs Web and Mobile apps simultaneously. The API must be run separately (see `api/` directory).*

**Option B: Run Interactive (Recommended)**
For better interactive logs and debugging, run apps individually in separate terminals:

```bash
# Terminal 1: Web App (http://localhost:3000)
pnpm --filter @signalvc/web dev

# Terminal 2: Mobile App (Press 'i' for iOS simulator)
pnpm --filter @signalvc/mobile dev
```

### Building & Testing

```bash
# Build all apps and packages
pnpm build

# Run Typecheck across the monorepo
pnpm typecheck

# Run Unit Tests
pnpm test
```

## Architecture Guidelines

### Frontend Architecture
We follow a **Feature-Entity-Shared** architecture.
-   **Features**: Smart, isolated product features (e.g., `Feed`, `Auth`).
-   **Entities**: Domain business objects (e.g., `User`, `Startup`).
-   **Shared**: Generic utilities and UI.

### UI Components (`packages/ui`)
We use a **Twin-Implementation** strategy:
-   **Web**: Semantic HTML + Tailwind CSS.
-   **Mobile**: Native Primitives + NativeWind.
-   **Shared Logic**: All styles are defined in `*.variants.ts` using CVA.

---

*For detailed architectural rules and agent guidelines, see [AGENTS.md](./AGENTS.md).*
