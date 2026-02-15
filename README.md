# SignalVC Monorepo

Welcome to the SignalVC monorepo. This codebase contains the web application, mobile application, and shared packages for the SignalVC platform.

## Project Structure

-   **`apps/web`**: Next.js application (Admin/User Dashboard).
-   **`apps/mobile`**: Expo React Native application (iOS/Android).
-   **`apps/api`**: Python FastAPI backend.
-   **`packages/ui`**: Shared UI Component Library (Twin-Implementation).
-   **`packages/*`**: Shared logic (domain, store, utilities).

## Getting Started (Backend)


### Running locally

Running locally as fast as possbile requires having only `docker` and `docker-compose` installed. You can run the backend with:

```bash
# To run all services (API + Postgres)
docker compose up 

# To run only the API (Postgres must be running)
docker compose up api

# To run in detached mode
docker compose up -d
```

### Installing locally

The prequisites for running the backend locally are:
-   **Python**: v3.12+
-   **Poetry**: v1.8+
-   **Pyenv**: v2.0+ (Recommended for managing Python versions)

To install the backend locally you need a virtual environment with Python 3.13 and Poetry installed. Then, you can run the following commands:

```bash

# Create virtual environment with Python 3.13
pyenv install 3.13.3
pyenv virtualenv 3.13.3 signalvc-313

# Activate virtual environment
pyenv local signalvc-313

# Install dependencies with Poetry
pip install poetry

# Install Python dependencies
cd apps/api
poetry install
```

Now you can run the API with:

```bash
./apps/api/scripts/run_local.sh
```

But running it with Docker is recommended as it closely mimics the production environment and requires less setup, its plug-and-play.


## Getting Started (Web & Mobile)

### Prerequisites
-   **Node.js**: v20+
-   **pnpm**: v9+

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
