# Prototype 0 trial findings

- Adoption Batch: ONE
- Reruns Created: `03-customer-management/attempts/02-rerun`
- Overall Prototype 0 Verdict: PASS
- Overall Blocker: None; all three latest required attempts pass the fixed Product Quality Bar. The customer rerun retains inert secondary-control and real-browser-sensor limitations as explicit non-blocking unmet checks.

## Finding F-1 — Generation timeout and scope-orientation overhead

- Category: instruction and trial operation
- Disposition: ADOPTED
- Observation: The customer-management invocation spent substantial bounded output attempting repository RPIV orientation before generating app source and did not return within 600 seconds.
- Proposed Improvement: Add generation-mode guidance that tells an app-bounded coding agent to implement the prompt directly without attempting repository RPIV orchestration.
- Rationale: Verifier evidence tied the timeout to repository-orchestration work inside the app-bounded generation run. The scoped canonical instruction now directs generation agents to implement the supplied interface prompt immediately and forbids parent-repository, RPIV, harness, and Runner orchestration; this remains within the adopted frontend-generation contract.
- Affected Trials: `03-customer-management`
- Evidence: initial timeout in `03-customer-management/attempts/01-initial/agent-result.md`; canonical adoption in `templates/default/AGENTS.md`; successful rerun generation and operational evidence in `03-customer-management/attempts/02-rerun/agent-result.md` and `evidence.md`

## Finding F-2 — Deterministic trial checks are effective

- Category: starter and validation
- Disposition: PROPOSED
- Observation: Clean-copy hashes, dependency allowlisting, build/runtime proof, owned cleanup, source-control traces, and fixed verdict arithmetic produced finite evidence for both successful and timed-out outcomes.
- Proposed Improvement: Retain the Issue 7 recipes as an operational manual-trial surface until a product agent adapter owns generation lifecycle.
- Rationale: No canonical starter defect was found in successful trials; adopting a starter source change would add unproven scope and trigger unnecessary reruns.
- Affected Trials: `01-engineering-productivity`, `02-autonomous-delivery`, `03-customer-management`
- Evidence: each initial `evidence.md` and root `just trials-check`

## Adoption and rerun decision

F-1 is the single adopted improvement batch. Canonical `templates/default/AGENTS.md` now carries direct-generation guidance, and only affected trial `03-customer-management` receives one fresh `02-rerun` with the identical prompt. `01-initial` remains immutable except mechanical removal of trailing horizontal whitespace from its bounded raw result so repository diff integrity can evaluate the evidence. Trials 1 and 2 are not rerun, and no second adoption cycle is permitted.

## Initial versus rerun comparison

| Measure | `01-initial` | `02-rerun` | Result |
| --- | --- | --- | --- |
| Fixed prompt SHA-256 | `5f5788d94f27a613a25d61c836b399e537137c7b5f3a073acf652134cfd97083` | `5f5788d94f27a613a25d61c836b399e537137c7b5f3a073acf652134cfd97083` | Identical prompt |
| Starter boundary | Pre-adoption full clean copy, inventory `2eb1d7...81f5` | Post-adoption full clean copy, inventory `22603a...92eb5` | Only canonical guidance changed before fresh copy |
| Generation | TIMEOUT at 600 seconds after repository RPIV orientation | SUCCESS in 211 seconds, source diff `f30b3b...dd0d` | Adopted guidance removed the observed orchestration detour |
| Locked install/build | Skipped honestly after timeout | PASS, unchanged lock and allowlisted dependencies | Rerun operationally complete |
| Standard runtime/HTTP/cleanup | Unproved | PASS on assigned port 33709 with HTTP 200, `text/html`, marker, owned cleanup, and released port | AC-3 evidence restored |
| Prompt-major controls | Unproved | Seven PASS source/state/effect traces for search, filters, create, edit, details, orders/invoices, and activity | AC-4 evidence restored; inert secondary controls named separately |
| Trial verdict | FAIL | PASS | Latest required attempt is `02-rerun` |

The initial attempt remains unchanged except removal of trailing horizontal spaces on two bounded-result lines, which preserves the recorded text while satisfying repository diff integrity. No trial 1 or trial 2 rerun exists, and this is the only adoption cycle.
