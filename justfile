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

# Enforce three engineering-harness skills plus the separately governed Soft Factory skill.
verify-harness-skills:
    engineering=(eng-harness-0-harnessability-assessment eng-harness-flow grill-agent-done)
    governed=("${engineering[@]}" soft-factory); mapfile -t governed < <(printf "%s\n" "${governed[@]}" | sort)
    mapfile -t actual < <(find .agents/skills -mindepth 1 -maxdepth 1 -type d -printf "%f\n" | sort)
    if [[ "${actual[*]}" != "${governed[*]}" ]]; then printf "Expected governed skill directories: %s\nActual skill directories: %s\n" "${governed[*]}" "${actual[*]}" >&2; exit 1; fi
    for skill in "${engineering[@]}"; do [[ -f ".agents/skills/$skill/SKILL.md" ]] || { echo "Missing engineering-harness skill .agents/skills/$skill/SKILL.md" >&2; exit 1; }; done
    [[ -f .agents/skills/soft-factory/SKILL.md ]] || { echo "Missing separately governed Soft Factory skill." >&2; exit 1; }
    [[ ! -e skills-lock.json ]] || { echo "Remove stale root skills-lock.json; .harness/skills.lock.json is provenance only." >&2; exit 1; }
    if grep -En "builder|eng-harness-in-a-box|plan-0-v2-constitution|plan-v2-extract-domain|the-flow|validate-v2" AGENTS.md LLM.txt README.md docs/README.md .github/skills/README.md .harness/engineering-harness.md project/architecture/README.md; then echo "Live discovery documentation names an excluded engineering-harness skill." >&2; exit 1; fi

# Run a selected Vitest target, or all tests when no target is supplied, plus harness governance and diff integrity.
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
