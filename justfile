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

# Format application and operating documentation.
format:
    npx prettier --write package.json tsconfig.base.json eslint.config.js prettier.config.js apps templates/default README.md docs project/architecture/README.md project/work-items/5-establish-the-blessed-frontend-starter

# Check formatting for application and operating documentation.
format-check:
    npm run format:check

# Type-check every application workspace.
type-check:
    npm run type-check

# Build every application workspace.
build:
    npm run build

# Enforce the three governed engineering-harness skills without inspecting siblings.
verify-harness-skills:
    engineering=(eng-harness-0-harnessability-assessment eng-harness-flow grill-agent-done)
    for skill in "${engineering[@]}"; do [[ -s ".agents/skills/$skill/SKILL.md" ]] || { echo "Missing or empty engineering-harness skill .agents/skills/$skill/SKILL.md" >&2; exit 1; }; done
    [[ ! -e skills-lock.json ]] || { echo "Remove stale root skills-lock.json; .harness/skills.lock.json is provenance only." >&2; exit 1; }
    if grep -En "builder|eng-harness-in-a-box|plan-0-v2-constitution|plan-v2-extract-domain|the-flow|validate-v2" AGENTS.md LLM.txt README.md docs/README.md .github/skills/README.md .harness/engineering-harness.md project/architecture/README.md; then echo "Live discovery documentation names an excluded engineering-harness skill." >&2; exit 1; fi

# Run a selected Vitest target, or all tests when no target is supplied, plus harness governance and diff integrity.
verify-focused target="":
    just verify-harness-skills
    if [[ -n "{{target}}" ]]; then npm run test:focused -- "{{target}}"; else npm run test:focused; fi
    git diff --check



# Prove the standalone starter installs, builds, serves, and cleans up from an isolated copy.
starter-check:
    #!/usr/bin/env bash
    set -euo pipefail
    starter="$PWD/templates/default"
    root_lock_before="$(sha256sum package-lock.json | cut -d " " -f1)"
    [[ -f project/architecture/ADR/ADR-260815-blessed-frontend-starter.md ]]
    [[ -f project/architecture/core-components/CORE-COMPONENT-260815-generated-frontend-contract.md ]]
    grep -A3 -q "## Status.*" project/architecture/ADR/ADR-260815-blessed-frontend-starter.md || grep -q "Accepted" project/architecture/ADR/ADR-260815-blessed-frontend-starter.md
    grep -q "Adopted" project/architecture/core-components/CORE-COMPONENT-260815-generated-frontend-contract.md
    for decision in $(seq 58 64); do grep -Eq "^\| $decision +\|" project/architecture/ADR/DECISION-LOG.md; done
    if find project/work-items/5-establish-the-blessed-frontend-starter -type f \( -name "ADR-*.md" -o -name "CORE-COMPONENT-*.md" \) | grep -q .; then
      echo "Architecture artifact found inside work item" >&2; exit 1
    fi
    for doc in README.md docs/README.md project/architecture/README.md LLM.txt; do grep -q "templates/default" "$doc"; done
    grep -q "must not install arbitrary" README.md
    grep -q "must not install arbitrary" docs/README.md
    if grep -RInE "blessed (generated-app )?starter (is not included|remain[s]? future)|No .*blessed starter" README.md docs/README.md project/architecture/README.md LLM.txt; then
      echo "Live documentation still says the starter is absent" >&2; exit 1
    fi
    node --input-type=module -e '
      import fs from "node:fs";
      const root = JSON.parse(fs.readFileSync("package.json", "utf8"));
      const starter = JSON.parse(fs.readFileSync("templates/default/package.json", "utf8"));
      const lock = JSON.parse(fs.readFileSync("templates/default/package-lock.json", "utf8"));
      const required = ["react", "react-dom", "tailwindcss", "lucide-react", "@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge", "recharts", "typescript", "vite"];
      const declared = { ...starter.dependencies, ...starter.devDependencies };
      for (const name of required) {
        if (!declared[name]) throw new Error(`Missing blessed dependency: ${name}`);
        if (!lock.packages?.[`node_modules/${name}`]) throw new Error(`Unlocked blessed dependency: ${name}`);
      }
      if (root.workspaces.some((entry) => entry.startsWith("templates"))) throw new Error("Starter entered root workspace graph");
      if (starter.scripts.build !== "tsc -b && vite build" || starter.scripts.dev !== "vite") throw new Error("Direct starter scripts changed");
      console.log(`starter dependency audit: ${required.length} blessed packages declared and locked`);
    '
    grep -q "@tailwind base" "$starter/src/index.css"
    grep -q "lucide-react" "$starter/src/App.tsx"
    grep -q "@radix-ui/react-slot" "$starter/src/components/ui/button.tsx"
    grep -q "from \"recharts\"" "$starter/src/chart-support.ts"
    grep -q "Do \*\*not\*\* install arbitrary packages" "$starter/AGENTS.md"
    grep -q "explicitly adopted architecture change" "$starter/AGENTS.md"
    if grep -RInE "fetch[[:space:]]*\(|axios|fastify|express|prisma|sequelize|firebase|supabase|passport" "$starter/src" "$starter/package.json"; then
      echo "Starter contains a prohibited service or external-data dependency" >&2; exit 1
    fi
    tmp="$(mktemp -d /tmp/sparkta-starter.XXXXXX)"
    owned_pid=""
    stop_owned() {
      if [[ -z "$owned_pid" ]]; then return 0; fi
      if kill -0 "$owned_pid" 2>/dev/null; then
        pgid="$(ps -o pgid= -p "$owned_pid" | tr -d " ")"
        if [[ "$pgid" != "$owned_pid" ]]; then echo "Refusing to signal unverified process group" >&2; return 1; fi
        kill -TERM -- "-$owned_pid"
        for _ in $(seq 1 50); do if ! kill -0 "$owned_pid" 2>/dev/null; then break; fi; sleep 0.1; done
        if kill -0 "$owned_pid" 2>/dev/null; then kill -KILL -- "-$owned_pid"; fi
      fi
      wait "$owned_pid" 2>/dev/null || true
      owned_pid=""
    }
    cleanup() { stop_owned || true; rm -rf -- "$tmp"; echo "temporary copy cleanup: removed $tmp"; }
    allocate_port() { node -e "const net=require(\"node:net\");const s=net.createServer();s.listen(0,\"127.0.0.1\",()=>{console.log(s.address().port);s.close()})"; }
    assert_port_free() {
      local port="$1"
      for _ in $(seq 1 50); do
        if node -e "const net=require(\"node:net\");const s=net.createServer();s.once(\"error\",()=>process.exit(1));s.listen($port,\"127.0.0.1\",()=>s.close())"; then return 0; fi
        sleep 0.1
      done
      echo "Port $port was not released within 5 seconds" >&2
      return 1
    }
    run_smoke() {
      local expected_marker="$1" port log headers body ready outcome
      port="$(allocate_port)"
      if [[ "$port" == "5173" || "$port" == "3000" ]]; then port="$(allocate_port)"; fi
      log="$tmp/vite-$port.log"; headers="$tmp/headers-$port.txt"; body="$tmp/body-$port.html"
      echo "runtime command: npm run dev -- --host 0.0.0.0 --port $port"
      setsid bash -c 'cd "$1" && exec npm run dev -- --host 0.0.0.0 --port "$2"' _ "$tmp" "$port" >"$log" 2>&1 &
      owned_pid=$!
      ready=false
      for _ in $(seq 1 100); do
        if curl --silent --show-error --max-time 1 --dump-header "$headers" --output "$body" "http://127.0.0.1:$port/" 2>/dev/null; then ready=true; break; fi
        if ! kill -0 "$owned_pid" 2>/dev/null; then break; fi
        sleep 0.1
      done
      outcome=0
      if [[ "$ready" != true ]]; then echo "Starter did not become ready within 10 seconds" >&2; outcome=1
      elif ! grep -Eq "^HTTP/[0-9.]+ 200" "$headers"; then echo "Starter response was not HTTP 200" >&2; outcome=1
      elif ! grep -Eiq "^content-type: text/html" "$headers"; then echo "Starter response was not HTML" >&2; outcome=1
      elif ! grep -q "$expected_marker" "$body"; then echo "Expected page marker was absent: $expected_marker" >&2; outcome=1
      else echo "browser proof: HTTP 200, text/html, marker $expected_marker on port $port"; fi
      stop_owned
      assert_port_free "$port"
      echo "runtime cleanup: owned process stopped and port $port released"
      return "$outcome"
    }
    trap cleanup EXIT
    cp -R "$starter/." "$tmp/"
    if [[ -e "$tmp/node_modules" || -e "$tmp/dist" ]]; then echo "Copied starter was not clean" >&2; exit 1; fi
    copy_lock_before="$(sha256sum "$tmp/package-lock.json" | cut -d " " -f1)"
    echo "clean copy: $tmp; lock checksum: $copy_lock_before"
    (cd "$tmp" && npm ci --include=dev)
    copy_lock_after="$(sha256sum "$tmp/package-lock.json" | cut -d " " -f1)"
    [[ "$copy_lock_before" == "$copy_lock_after" ]]
    (cd "$tmp" && npm run build)
    [[ -s "$tmp/dist/index.html" ]]
    find "$tmp/dist" -maxdepth 2 -type f -printf "built artifact: %P\n" | sort
    run_smoke "data-sparkta-starter=\"ready\""
    if run_smoke "marker-that-must-not-exist"; then echo "Failure cleanup exercise unexpectedly passed" >&2; exit 1; fi
    echo "failure cleanup proof: missing-marker assertion failed and owned runtime was removed"
    root_lock_after="$(sha256sum package-lock.json | cut -d " " -f1)"
    [[ "$root_lock_before" == "$root_lock_after" ]]
    echo "lockfile proof: copied and root lockfiles unchanged"

# Run the complete static, test, build, and diff-integrity suite.
verify:
    just verify-harness-skills
    just test
    just lint
    just format-check
    just type-check
    just build
    just starter-check
    git diff --check "$(git merge-base HEAD origin/main)"
