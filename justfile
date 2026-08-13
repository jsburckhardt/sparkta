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

# Enforce the exact committed engineering-harness skill allowlist and live discovery references.
verify-harness-skills:
    expected=(eng-harness-0-harnessability-assessment eng-harness-flow grill-agent-done); mapfile -t actual < <(find .agents/skills -mindepth 1 -maxdepth 1 -type d -printf "%f\\n" | sort); if [[ "${actual[*]}" != "${expected[*]}" ]]; then printf "Expected skill directories: %s\\nActual skill directories: %s\\n" "${expected[*]}" "${actual[*]}" >&2; exit 1; fi
    for skill in "${expected[@]}"; do [[ -f ".agents/skills/$skill/SKILL.md" ]] || { echo "Missing .agents/skills/$skill/SKILL.md" >&2; exit 1; }; done
    [[ ! -e skills-lock.json ]] || { echo "Remove stale root skills-lock.json; .harness/skills.lock.json is provenance only." >&2; exit 1; }
    if grep -En "builder|eng-harness-in-a-box|plan-0-v2-constitution|plan-v2-extract-domain|the-flow|validate-v2" AGENTS.md LLM.txt README.md docs/README.md .github/skills/README.md .harness/engineering-harness.md project/architecture/README.md; then echo "Live discovery documentation names an excluded engineering-harness skill." >&2; exit 1; fi

# Run a selected Vitest target, or all tests when no target is supplied, plus diff integrity.
verify-focused target="":
    just verify-harness-skills
    if [[ -n "{{target}}" ]]; then npm run test:focused -- "{{target}}"; else npm run test:focused; fi
    git diff --check

# Run the complete static, test, build, and diff-integrity suite.
verify:
    just verify-harness-skills
    just test
    just lint
    just format-check
    just type-check
    just build
    git diff --check "$(git merge-base HEAD origin/main)"
