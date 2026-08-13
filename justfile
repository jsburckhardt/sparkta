set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

default:
    @just --list

# Delegate all Soft Factory commands to the configured ambient CLI.
runner *args:
    soft-factory {{args}}

# Prove ambient Runner package identity without adding a repository dependency.
runner-identity:
    executable="$(command -v soft-factory)"; [[ -x "$executable" ]]; root="$(npm root -g)"; ROOT="$root" node -e 'const p=require(process.env.ROOT+"/soft-factory-runner/package.json"); if(p.name!=="soft-factory-runner"||p.version!=="0.1.0"||p.bin["soft-factory"]!=="dist/index.js") process.exit(1); console.log(JSON.stringify({executable:process.argv[1],name:p.name,version:p.version,bin:p.bin}))' "$executable"

# Display the non-mutating Runner command grammar.
runner-help:
    soft-factory --help

# Validate the structured RPIV integration contract.
runner-instructions:
    output="$(soft-factory instructions --json)"; printf "%s\n" "$output"; JSON="$output" node -e 'const x=JSON.parse(process.env.JSON); if(x.schemaVersion!==1||x.effectiveFinalValidation.command!=="just verify"||x.paths.progress!==".soft-factory/rpiv-status.json"||x.paths.result!==".soft-factory/agent-result.json") process.exit(1)'

# Converge recommended official assets; this must report no changes.
runner-install-assets:
    output="$(soft-factory install --recommended)"; printf "%s\n" "$output"; grep -Eq "ASSETS_UP_TO_DATE|Changed: no" <<<"$output"

# Validate all 24 ordered repository Doctor checks.
runner-doctor:
    set +e; output="$(soft-factory doctor --json)"; status=$?; set -e; printf "%s\n" "$output"; JSON="$output" node -e 'const x=JSON.parse(process.env.JSON); const ids=["repository.git-membership","repository.primary-worktree","repository.git-common-directory","repository.github-identity","repository.default-branch","command.git","command.gh","command.tmux","command.node","command.copilot","authentication.github-cli","authentication.copilot-cli","compatibility.rpiv-agent","compatibility.runner-protocol","compatibility.configuration","compatibility.worktree-root","compatibility.state-root-writable","compatibility.trees-ignored","compatibility.runtime-state-ignored","compatibility.result-contract","runtime.trees-ownership","runtime.state-readable","runtime.locks-interpretable","runtime.required-paths-creatable"]; if(x.checks.some(c=>c.status==="failed"&&(!c.message||!c.remediation))) process.exit(1); if(x.schemaVersion!==1||x.ready!==true||JSON.stringify(x.checks.map(c=>c.id))!==JSON.stringify(ids)||x.checks.some(c=>c.status!=="passed"||c.blocking!==true)) process.exit(1)'; [[ $status -eq 0 ]]

# Enforce exact config, RPIV metadata, official asset digests, and ignore coverage.
runner-contract:
    node scripts/verify-soft-factory.mjs
    git check-ignore -q .trees/issue-3/example
    git check-ignore -q .soft-factory/runs/3/snapshot.json
    ! git check-ignore -q .soft-factory/config.yml

# Run all safe, non-issue Runner discovery and readiness checks.
runner-readiness:
    just runner-identity
    just runner-help
    just runner-instructions
    just runner-contract
    just runner-install-assets
    just runner-doctor

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

# Run a selected Vitest target, or all tests when no target is supplied, plus diff integrity.
verify-focused target="":
    just verify-harness-skills
    just runner-readiness
    if [[ -n "{{target}}" ]]; then npm run test:focused -- "{{target}}"; else npm run test:focused; fi
    git diff --check

# Run the complete static, test, build, and diff-integrity suite.
verify:
    just verify-harness-skills
    just runner-readiness
    just test
    just lint
    just format-check
    just type-check
    just build
    git diff --check "$(git merge-base HEAD origin/main)"
