# cloud-foundry-tools

VS Code extension providing Cloud Foundry development tools (login, create/bind/unbind services). Monorepo managed with Lerna and Yarn workspaces.

## Architecture

Three packages under `packages/`:

- **`backend/`** (`vscode-cf-tools`) — the VS Code extension. Entry point: `packages/backend/src/extension.ts`. Compiled output: `packages/backend/dist/extension.js`. Registers commands, views, and view-containers. Uses `chisel.ts` for SSH tunneling, `cfView.ts` for the tree view, and `commands.ts` / `cfViewCommands.ts` for CF command implementations.
- **`frontend/`** (`cloud-foundry-tools-frontend`) — Vue 3 UI (Vite). Built to `packages/frontend/dist/`, then copied into `packages/backend/dist/media/` by `backend`'s `frontend:copy` script.
- **`wrapper/`** (`vscode-wing-cf-tools`) — deprecated wrapper extension; contains no new logic.

Versions are locked (Lerna fixed mode): all packages share the same version number.

## Build

```sh
yarn                  # install all dependencies (root)
yarn compile          # clean + tsc --build across all packages
yarn compile:watch    # watch mode
yarn ci:artifacts_only  # compile + webpack + package .vsix (no tests)
```

Run extension locally: open repo in VS Code, run `yarn ci:artifacts_only`, then launch **Run Extension** from the Run panel.

## Testing

The backend and wrapper use Mocha + Chai with Istanbul/Nyc coverage. The frontend uses Jest.

```sh
# inside packages/backend or packages/wrapper:
yarn test
yarn coverage

# inside packages/frontend:
yarn test

# from the repository root: build, lint, test, and merge coverage
yarn ci
```

The frontend does not define a `coverage` script.

## CI/CD & Deployment

GitHub Actions (`.github/workflows/`):

- **`ci.yml`** — runs `yarn ci` on Node 20/22/24 for pushes and PRs to `main*` branches.
- **`release.yml`** — triggered by `v*.*.*` tags; runs `yarn ci` and creates a GitHub Release containing `packages/*/*.vsix`. It does not run `release:publish`.
- **`commitlint.yml`** — enforces conventional commit message format.

To cut a release:

```sh
yarn run release:version   # lerna version --force-publish (bumps, commits, tags)
# the pushed tag triggers the GitHub Release workflow
```

## Configuration

The extension reads VS Code settings (declared under `contributes.configuration` in `packages/backend/package.json`). Logger preferences are configurable via VS Code Settings UI (search "CF").

No `.env` files or secrets are required for local development. External CLI prerequisites include CF CLI v8, the `targets` plugin, and the service-info plugin documented in `packages/backend/README.md`. Install CF CLI from https://github.com/cloudfoundry/cli/releases.

## Prerequisites

- Node.js LTS (20+)
- Yarn ≥ 1.4.2
- CF CLI v8 (`cf` on PATH)
- (optional) commitizen for conventional commit messages: `npm install -g commitizen`
