set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

setup:
    if ! command -v pnpm >/dev/null; then corepack enable; fi
    pnpm install --frozen-lockfile

run:
    pnpm exec vite --host 0.0.0.0

[positional-arguments]
test *args:
    pnpm exec vitest run "$@"

lint:
    pnpm exec eslint .

format-check:
    pnpm exec prettier --check package.json tsconfig.json tsconfig.app.json tsconfig.node.json .prettierrc.json eslint.config.js vite.config.ts index.html 'src/**/*.{ts,tsx,css}' README.md docs/README.md

type-check:
    pnpm exec tsc -b --pretty false

build:
    pnpm exec tsc -b --pretty false
    pnpm exec vite build

[positional-arguments]
verify-focused *args:
    git diff --check
    pnpm exec vitest run "$@"
    pnpm exec eslint .
    pnpm exec tsc -b --pretty false
    bash tests/foreman-contract.sh

verify:
    git diff --check "$(git merge-base HEAD origin/main)"
    pnpm exec prettier --check package.json tsconfig.json tsconfig.app.json tsconfig.node.json .prettierrc.json eslint.config.js vite.config.ts index.html 'src/**/*.{ts,tsx,css}' README.md docs/README.md
    pnpm exec eslint .
    pnpm exec tsc -b --pretty false
    pnpm exec vitest run
    pnpm exec vite build
    bash tests/foreman-contract.sh

[positional-arguments]
issue-create title_file body_file:
    gh issue create --title "$(< "$1")" --body-file "$2"

[positional-arguments]
rpiv-create-pr title_file body_file:
    gh pr create --title "$(< "$1")" --body-file "$2"

[positional-arguments]
rpiv-update-issue issue body_file:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    gh issue edit "$1" --body-file "$2"

# Managed sessions only: project opt-in approves this policy before invocation.
[positional-arguments]
copilot-session agent worktree bootstrap_file:
    #!/usr/bin/env bash
    set -euo pipefail
    case "$1" in foreman|rpiv|issue-generator) ;; *) echo "Unsupported managed agent" >&2; exit 1 ;; esac
    test -r "$3" || { echo "Worker bootstrap file is not readable" >&2; exit 1; }
    prompt="$(< "$3")"
    test -n "$prompt" || { echo "Worker bootstrap file is empty" >&2; exit 1; }
    controller_root="$PWD"
    cd -- "$2"
    printf 'Managed agent: %s; directory: %s; permissions: --yolo\n' "$1" "$PWD"
    if [[ "$1" == foreman ]]; then
        exec copilot --agent "$1" --yolo -i "$prompt"
    fi
    if [[ "$1" == rpiv ]]; then
        exec copilot --agent "$1" --yolo --add-dir "$controller_root" -p "$prompt"
    fi
    exec copilot --agent "$1" --yolo -p "$prompt"

# Host primitives only. Foreman may invoke these after project opt-in and
# profile/ownership checks; they do not decide scheduling or acceptance.
[positional-arguments]
tmux-foreman-launch bootstrap_file:
    #!/usr/bin/env bash
    set -euo pipefail
    test -r "$1" || { echo "Controller bootstrap is not readable" >&2; exit 1; }
    if tmux has-session -t '=foreman' 2>/dev/null; then
        echo "Foreman session already exists; reconcile ownership" >&2; exit 1
    fi
    printf -v launch 'exec just --justfile %q copilot-session foreman %q %q' "$PWD/justfile" "$PWD" "$(realpath -e -- "$1")"
    session_id="$(tmux new-session -d -P -F '#{session_id}' -s foreman -n foreman)"
    [[ "$session_id" =~ ^\$[0-9]+$ ]] || { echo "Controller session identity is invalid" >&2; exit 1; }
    window_id="$(tmux list-windows -t "$session_id" -F '#{window_id}')"
    [[ "$window_id" =~ ^@[0-9]+$ ]] || { echo "Controller window identity is invalid" >&2; exit 1; }
    tmux set-option -t "$session_id" base-index 0
    if [[ "$(tmux display-message -p -t "$window_id" '#{window_index}')" != 0 ]]; then
        tmux move-window -s "$window_id" -t "$session_id:0"
    fi
    tmux set-option -w -t "$window_id" remain-on-exit on
    tmux respawn-window -k -t "$window_id" "$launch"

# Recover only an exactly identified empty shell left by a partial controller launch.
[positional-arguments]
tmux-foreman-recover bootstrap_file expected_session_id expected_window_id expected_pane_id expected_pane_pid expected_path:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$#" -eq 6 ]] || { echo "Controller recovery requires six ownership arguments" >&2; exit 1; }
    test -r "$1" || { echo "Controller bootstrap is not readable" >&2; exit 1; }
    [[ "$2" =~ ^\$[0-9]+$ ]] || { echo "Invalid expected session identity" >&2; exit 1; }
    [[ "$3" =~ ^@[0-9]+$ ]] || { echo "Invalid expected window identity" >&2; exit 1; }
    [[ "$4" =~ ^%[0-9]+$ ]] || { echo "Invalid expected pane identity" >&2; exit 1; }
    [[ "$5" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid expected pane PID" >&2; exit 1; }
    expected_path="$(realpath -e -- "$6")"
    [[ "$expected_path" == "$(realpath -e -- "$PWD")" ]] || { echo "Expected controller path is not this repository root" >&2; exit 1; }
    tmux has-session -t "$2" 2>/dev/null || { echo "Expected controller session is missing" >&2; exit 1; }
    session_record="$(tmux list-sessions -F '#{session_id}:#{session_name}:#{session_windows}' | grep -Fx -- "$2:foreman:1")" || { echo "Controller session ownership does not match" >&2; exit 1; }
    window_record="$(tmux list-windows -t "$2" -F '#{window_id}:#{window_index}:#{window_name}:#{window_panes}')"
    [[ "$window_record" == "$3:0:foreman:1" ]] || { echo "Controller window ownership does not match" >&2; exit 1; }
    pane_record="$(tmux list-panes -t "$3" -F '#{pane_id}:#{pane_pid}:#{pane_current_command}:#{pane_current_path}')"
    IFS=: read -r pane_id pane_pid pane_command pane_path <<< "$pane_record"
    [[ "$pane_id" == "$4" && "$pane_pid" == "$5" ]] || { echo "Controller pane identity does not match" >&2; exit 1; }
    [[ "$pane_path" == "$expected_path" ]] || { echo "Controller pane path does not match" >&2; exit 1; }
    case "$pane_command" in bash|dash|fish|ksh|sh|zsh) ;; *) echo "Controller pane is running a non-shell process" >&2; exit 1 ;; esac
    printf -v launch 'exec just --justfile %q copilot-session foreman %q %q' "$PWD/justfile" "$PWD" "$(realpath -e -- "$1")"
    tmux set-option -t "$2" base-index 0
    tmux set-option -w -t "$3" remain-on-exit on
    tmux respawn-window -k -t "$3" "$launch"

[positional-arguments]
tmux-worker-launch issue worktree bootstrap_file:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    worktree="$(realpath -e -- "$2")"
    root="$(realpath -e -- "$(git rev-parse --show-toplevel)")"
    [[ "$(realpath -e -- "$PWD")" == "$root" && "$worktree" == "$root/.trees/issue-$1" ]] ||
        { echo "Worktree is outside the owning repository or does not match the issue" >&2; exit 1; }
    [[ "$(realpath -e -- "$(git -C "$worktree" rev-parse --show-toplevel)")" == "$worktree" ]] ||
        { echo "Worker checkout is not a Git worktree" >&2; exit 1; }
    root_common="$(realpath -e -- "$(git rev-parse --git-common-dir)")"
    worker_common="$(cd -- "$worktree" && realpath -e -- "$(git rev-parse --git-common-dir)")"
    [[ "$root_common" == "$worker_common" ]] ||
        { echo "Worker checkout belongs to another repository" >&2; exit 1; }
    test -r "$3" || { echo "Worker bootstrap is not readable" >&2; exit 1; }
    tmux has-session -t '=foreman' || { echo "Foreman session is missing" >&2; exit 1; }
    tmux list-windows -t '=foreman' -F '#{window_name}' | grep -Fxq -- foreman ||
        { echo "Foreman controller window is missing" >&2; exit 1; }
    if tmux list-windows -t '=foreman' -F '#{window_name}' | grep -Fxq -- "rpiv-$1"; then
        echo "Worker window already exists; reconcile ownership" >&2; exit 1
    fi
    printf -v launch 'exec just --justfile %q copilot-session rpiv %q %q' "$PWD/justfile" "$worktree" "$(realpath -e -- "$3")"
    tmux new-window -d -t 'foreman:' -n "rpiv-$1"
    tmux set-option -w -t "foreman:rpiv-$1" remain-on-exit on
    tmux respawn-window -k -t "foreman:rpiv-$1" "$launch"

[positional-arguments]
tmux-worker-list:
    tmux list-windows -t '=foreman' -F '#{window_index}:#{window_name}:#{window_id}'

[positional-arguments]
tmux-worker-inspect issue:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    tmux list-panes -t "foreman:rpiv-$1" -F '#{window_name}:#{pane_pid}:#{pane_dead}:#{pane_current_path}'

[positional-arguments]
tmux-worker-status issue:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    tmux list-panes -t "foreman:rpiv-$1" -F '#{pane_dead}'

[positional-arguments]
tmux-worker-signal issue:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    tmux list-panes -t "foreman:rpiv-$1" -F '#{pane_id}' >/dev/null
    tmux wait-for -S "foreman-rpiv-$1"

[positional-arguments]
tmux-worker-retire issue:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    test "$(tmux list-panes -t "foreman:rpiv-$1" -F '#{pane_dead}')" = 1 ||
        { echo "Worker is still running; request cooperative cancellation first" >&2; exit 1; }
    tmux kill-window -t "foreman:rpiv-$1"

# Refresh only an owned, clean checkout already on the configured base branch.
# This fast-forwards a local branch after integration; it never merges a PR.
[positional-arguments]
integration-sync remote base_branch:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[a-zA-Z0-9._-]+$ ]] || { echo "Invalid remote name" >&2; exit 1; }
    git check-ref-format --branch "$2" >/dev/null ||
        { echo "Invalid base branch" >&2; exit 1; }
    [[ "$(realpath -e -- "$PWD")" == "$(realpath -e -- "$(git rev-parse --show-toplevel)")" ]] ||
        { echo "Run from the owned base checkout root" >&2; exit 1; }
    [[ "$(git branch --show-current)" == "$2" ]] ||
        { echo "Checkout is not on the configured base branch" >&2; exit 1; }
    [[ -z "$(git status --porcelain)" ]] ||
        { echo "Base checkout is not clean" >&2; exit 1; }
    git remote get-url "$1" >/dev/null
    git fetch -- "$1" "refs/heads/$2:refs/remotes/$1/$2"
    git merge --ff-only "$1/$2"
    git rev-parse HEAD

# Read evidence only; Foreman, not this recipe, decides review acceptance.
[positional-arguments]
pr-inspect repository pr:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$2" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid PR number" >&2; exit 1; }
    head="$(gh pr view "$2" --repo "$1" --json headRefOid --jq '.headRefOid')"
    gh pr view "$2" --repo "$1" --json number,url,state,baseRefName,headRefName,headRefOid,body,comments,reviews,statusCheckRollup,closingIssuesReferences
    gh pr diff "$2" --repo "$1"
    current="$(gh pr view "$2" --repo "$1" --json headRefOid --jq '.headRefOid')"
    test -n "$head" && test "$head" = "$current" || { echo "PR head changed or is missing; review must be repeated" >&2; exit 1; }
    printf 'Inspected head: %s\n' "$head"

[positional-arguments]
pr-comment repository pr body_file:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$2" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid PR number" >&2; exit 1; }
    gh pr comment "$2" --repo "$1" --body-file "$3"

[positional-arguments]
rpiv-edit-pr pr title_file body_file:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid PR number" >&2; exit 1; }
    gh pr edit "$1" --title "$(< "$2")" --body-file "$3"

[positional-arguments]
rpiv-find-pr branch:
    gh pr list --head "$1" --state all --json number,url,state,headRefName,headRefOid,baseRefName,body

[positional-arguments]
pr-resolve-thread thread_id:
    gh api graphql -f query='mutation($id: ID!) { resolveReviewThread(input: {threadId: $id}) { thread { id isResolved } } }' -f id="$1"

# Create a new isolated issue worktree from the configured remote base.
[positional-arguments]
worktree-prepare issue branch remote base_branch:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    git check-ref-format --branch "$2" >/dev/null || { echo "Invalid branch" >&2; exit 1; }
    [[ "$3" =~ ^[a-zA-Z0-9._-]+$ ]] || { echo "Invalid remote name" >&2; exit 1; }
    git check-ref-format --branch "$4" >/dev/null || { echo "Invalid base branch" >&2; exit 1; }
    root="$(realpath -e -- "$(git rev-parse --show-toplevel)")"
    [[ "$(realpath -e -- "$PWD")" == "$root" ]] || { echo "Run from the owning repository root" >&2; exit 1; }
    target="$root/.trees/issue-$1"
    [[ ! -e "$target" ]] || { echo "Issue worktree already exists; reconcile ownership" >&2; exit 1; }
    git show-ref --verify --quiet "refs/heads/$2" && { echo "Issue branch already exists; reconcile ownership" >&2; exit 1; }
    git remote get-url "$3" >/dev/null
    git fetch -- "$3" "refs/heads/$4:refs/remotes/$3/$4"
    mkdir -p -- "$root/.trees"
    git worktree add -b "$2" "$target" "$3/$4"
    printf '%s\n' "$target"

# Wait for a bounded wakeup hint; lifecycle data remains in typed files.
[positional-arguments]
tmux-worker-wait issue timeout_seconds:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    [[ "$2" =~ ^[1-9][0-9]*$ && "$2" -le 300 ]] || { echo "Invalid timeout" >&2; exit 1; }
    wait_outcome=signaled
    if timeout --foreground "${2}s" tmux wait-for "foreman-rpiv-$1"; then
        :
    else
        wait_status=$?
        if [[ "$wait_status" -eq 124 ]]; then
            wait_outcome=timeout
        else
            echo "Worker wait transport failed with exit $wait_status" >&2
            exit "$wait_status"
        fi
    fi
    pane_dead="$(tmux list-panes -t "foreman:rpiv-$1" -F '#{pane_dead}')"
    [[ "$pane_dead" == 0 || "$pane_dead" == 1 ]] || { echo "Invalid worker pane liveness evidence" >&2; exit 1; }
    printf 'wait_outcome=%s\npane_dead=%s\n' "$wait_outcome" "$pane_dead"

# Resume an owned stopped worker in its existing window and worktree.
[positional-arguments]
tmux-worker-resume issue worktree bootstrap_file:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$1" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid issue number" >&2; exit 1; }
    worktree="$(realpath -e -- "$2")"
    root="$(realpath -e -- "$(git rev-parse --show-toplevel)")"
    [[ "$(realpath -e -- "$PWD")" == "$root" && "$worktree" == "$root/.trees/issue-$1" ]] || { echo "Worktree does not match the owned issue" >&2; exit 1; }
    [[ "$(realpath -e -- "$(git -C "$worktree" rev-parse --show-toplevel)")" == "$worktree" ]] || { echo "Worker checkout is not a Git worktree" >&2; exit 1; }
    [[ "$(realpath -e -- "$(git rev-parse --git-common-dir)")" == "$(cd -- "$worktree" && realpath -e -- "$(git rev-parse --git-common-dir)")" ]] || { echo "Worker checkout belongs to another repository" >&2; exit 1; }
    test -r "$3" || { echo "Worker bootstrap is not readable" >&2; exit 1; }
    tmux has-session -t '=foreman' || { echo "Foreman session is missing" >&2; exit 1; }
    test "$(tmux list-panes -t "foreman:rpiv-$1" -F '#{pane_dead}')" = 1 || { echo "Worker pane is not stopped" >&2; exit 1; }
    printf -v launch 'exec just --justfile %q copilot-session rpiv %q %q' "$PWD/justfile" "$worktree" "$(realpath -e -- "$3")"
    tmux respawn-window -k -t "foreman:rpiv-$1" "$launch"

# Run the reviewed issue generator as a primary managed Copilot session.
[positional-arguments]
issue-generator-run bootstrap_file:
    #!/usr/bin/env bash
    set -euo pipefail
    test -r "$1" || { echo "Issue-generator bootstrap is not readable" >&2; exit 1; }
    exec just --justfile "$PWD/justfile" copilot-session issue-generator "$PWD" "$(realpath -e -- "$1")"

# Return GitHub and base-ancestry evidence; Foreman decides readiness and acceptance.
[positional-arguments]
delivery-inspect repository pr remote base_branch:
    #!/usr/bin/env bash
    set -euo pipefail
    [[ "$2" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid PR number" >&2; exit 1; }
    [[ "$3" =~ ^[a-zA-Z0-9._-]+$ ]] || { echo "Invalid remote name" >&2; exit 1; }
    git check-ref-format --branch "$4" >/dev/null || { echo "Invalid base branch" >&2; exit 1; }
    git remote get-url "$3" >/dev/null
    state="$(gh pr view "$2" --repo "$1" --json state --jq '.state')"
    pr_base="$(gh pr view "$2" --repo "$1" --json baseRefName --jq '.baseRefName')"
    merge_oid="$(gh pr view "$2" --repo "$1" --json mergeCommit --jq '.mergeCommit.oid // ""')"
    metadata="$(gh pr view "$2" --repo "$1" --json number,url,state,isDraft,baseRefName,headRefName,headRefOid,mergedAt,mergeCommit,closingIssuesReferences)"
    printf '%s\n' "$metadata"
    if [[ "$state" != MERGED ]]; then
        printf 'delivery_state=%s\nancestry=not-merged\n' "$state"
        exit 0
    fi
    [[ "$pr_base" == "$4" ]] || { echo "Merged PR base '$pr_base' contradicts configured base '$4'" >&2; exit 1; }
    [[ "$merge_oid" =~ ^[0-9a-fA-F]{40}$ ]] || { echo "Merged PR has no valid merge commit identity" >&2; exit 1; }
    git fetch -- "$3" "refs/heads/$4:refs/remotes/$3/$4"
    git cat-file -e "$merge_oid^{commit}" || { echo "Merged commit is unavailable after base fetch" >&2; exit 1; }
    git merge-base --is-ancestor "$merge_oid" "$3/$4" || { echo "Merged commit is not available on configured remote/base" >&2; exit 1; }
    printf 'delivery_state=MERGED\nmerge_commit=%s\nremote_base=%s/%s\nancestry=available\n' "$merge_oid" "$3" "$4"
