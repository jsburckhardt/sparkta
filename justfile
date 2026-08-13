set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

default:
    @just --list

# Install the locked npm workspace graph from a clean dependency state.
setup:
    npm ci --include=dev

# Start the minimal web and server development processes.
run:
    npm run dev

# Run all workspace unit tests.
test:
    npm test

# Check application source with ESLint.
lint:
    npm run lint

# Check formatting for application and operating documentation.
format-check:
    npm run format:check

# Type-check every application workspace.
type-check:
    npm run type-check

# Build every application workspace.
build:
    npm run build

# Run a selected Vitest target, or all tests when no target is supplied, plus diff integrity.
verify-focused target="":
    if [[ -n "{{target}}" ]]; then npm run test:focused -- "{{target}}"; else npm run test:focused; fi
    git diff --check

# Run the complete static, test, build, and diff-integrity suite.
verify:
    just test
    just lint
    just format-check
    just type-check
    just build
    git diff --check "$(git merge-base HEAD origin/main)"
