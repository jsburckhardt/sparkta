# Prototype 0 trial findings

- Adoption Batch: NONE
- Reruns Created: NONE
- Overall Prototype 0 Verdict: FAIL
- Overall Blocker: 03-customer-management / 01-initial — Copilot generation reached the finite 600-second timeout, so install, build, runtime load, and completed control evaluation are blocking gaps.

## Finding F-1 — Generation timeout and scope-orientation overhead

- Category: instruction and trial operation
- Disposition: DEFERRED
- Observation: The customer-management invocation spent substantial bounded output attempting repository RPIV orientation before generating app source and did not return within 600 seconds.
- Proposed Improvement: Add generation-mode guidance that tells an app-bounded coding agent to implement the prompt directly without attempting repository RPIV orchestration.
- Rationale: The first two identical protocol invocations completed successfully, while one timeout is insufficient evidence for a safe canonical instruction change. The partial third result must not be hand-repaired or treated as successful.
- Affected Trials: `03-customer-management`
- Evidence: `03-customer-management/attempts/01-initial/agent-result.md`

## Finding F-2 — Deterministic trial checks are effective

- Category: starter and validation
- Disposition: PROPOSED
- Observation: Clean-copy hashes, dependency allowlisting, build/runtime proof, owned cleanup, source-control traces, and fixed verdict arithmetic produced finite evidence for both successful and timed-out outcomes.
- Proposed Improvement: Retain the Issue 7 recipes as an operational manual-trial surface until a product agent adapter owns generation lifecycle.
- Rationale: No canonical starter defect was found in successful trials; adopting a starter source change would add unproven scope and trigger unnecessary reruns.
- Affected Trials: `01-engineering-productivity`, `02-autonomous-delivery`, `03-customer-management`
- Evidence: each initial `evidence.md` and root `just trials-check`

## Adoption and rerun decision

No starter or instruction improvement was adopted. Therefore no `02-rerun` directory is permitted or created. Initial evidence remains immutable and comparable. The timeout is dispositioned as a blocker and deferred instruction hypothesis, not concealed by a retry or fake rerun.
