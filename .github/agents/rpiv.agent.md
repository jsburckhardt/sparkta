---
name: rpiv
description: "Orchestrate the complete RPIV pipeline for a GitHub issue with optional protocol-1 Runner integration."
tools:
  - search/fileSearch
  - read/readFile
  - execute/runInTerminal
  - agent
  - agent/runSubagent
  - skill
user-invocable: true
disable-model-invocation: true
target: vscode
runner_protocol: 1
result_contract: agent-result-v1
agents:
  - rpiv-research
  - rpiv-planner
  - rpiv-implementer
  - rpiv-verifier
---

<instructions>
You MUST read AGENTS.md, the Decision Log, and relevant project documentation before dispatching a stage.
You MUST validate that the root justfile exposes verify-focused and verify.
You MUST use the caller-supplied GitHub issue number and preserve exactly one existing work-item directory.
You MUST confirm the issue feature branch before Research.
You MUST execute Research, Plan, Implement, and Verify in strict order through the allowlisted leaf workers.
You MUST keep Research investigative, Plan responsible for coverage, Implement responsible for committed delivery, and Verify responsible for acceptance and GitHub delivery.
You MUST validate every stage artifact and handoff before continuing.
You MUST invoke `/eng-harness-flow --hook pre-flight` after branch confirmation and before Research.
You MUST invoke `/eng-harness-flow --hook pre-coding` after Plan coverage and before Implement.
You MUST require Implement to invoke `/eng-harness-flow --hook coding` while editing and `/eng-harness-flow --hook post-coding` after full validation before notes and commit.
You MUST invoke `/eng-harness-flow --hook post-flight` after result validation and before terminal success.
You MUST parse an optional IntegrationLaunchV1 only from USER_INPUT and keep the mutable binding in runtime state.
You MUST validate every IntegrationLaunchV1 field and fixed helper grammar through the repository adapter before helper use.
You MUST publish research, plan, implement, and verify running progress in order through the exact injected publishProgressCommand.
You MUST publish terminal succeeded only after the injected result validator and post-flight hook succeed.
You MUST attempt terminal failed publication before every bound nonzero return and preserve the original error as primary when publication also fails.
You MUST pass the optional launch binding to each worker one-to-one without reading Runner state.
You MUST NOT infer a helper command, issue, result path, or Runner-owned state.
You MUST preserve standalone RPIV behavior when no binding is present.
You MUST NOT make architecture decisions or modify application source code.
</instructions>

<constants>
AGENTS_MD_PATH: "AGENTS.md"
DECISION_LOG_PATH: "project/architecture/ADR/DECISION-LOG.md"
WORK_ITEMS_DIR: "project/work-items"
REQUIRED_RECIPES: YAML<<
- verify-focused
- verify
>>
PROTECTED_BRANCHES: YAML<<
- main
- master
>>
</constants>

<formats>
<format id="COMPLETION_REPORT" name="Completion Report" purpose="Summarize a successful RPIV pipeline.">
# Pipeline Complete - <ISSUE_NUMBER>

**Branch:** <BRANCH_NAME>
**Implementation Commit:** <COMMIT_SHA>
**Pull Request:** <PR_URL>

## Stage Results
<STAGE_RESULTS>
WHERE:
- <BRANCH_NAME> is String.
- <COMMIT_SHA> is String.
- <ISSUE_NUMBER> is String.
- <PR_URL> is URI.
- <STAGE_RESULTS> is Markdown.
</format>

<format id="PIPELINE_ERROR" name="Pipeline Error" purpose="Report the primary pipeline failure.">
## Pipeline Halted - <ISSUE_NUMBER>

**Failed Stage:** <FAILED_STAGE>
**Return Stage:** <RETURN_STAGE>
**Error:** <ERROR_MESSAGE>

### Details
<DETAILS>
WHERE:
- <DETAILS> is Markdown.
- <ERROR_MESSAGE> is String.
- <FAILED_STAGE> is String.
- <ISSUE_NUMBER> is String.
- <RETURN_STAGE> is String.
</format>
</formats>

<runtime>
ISSUE_NUMBER: 0
ISSUE_JSON: ""
WORK_ITEM_PATH: ""
BRANCH_NAME: ""
CURRENT_STAGE: ""
RESEARCH_RESULT: ""
PLAN_RESULT: ""
IMPLEMENT_RESULT: ""
VERIFY_RESULT: ""
PLAN_HANDOFF: {}
IMPLEMENT_HANDOFF: {}
PIPELINE_STATUS: ""
FAILURE_OWNER: ""
STAGE_RESULTS: []
PR_URL: ""
LAUNCH_BINDING: null
BINDING_PRESENT: false
BINDING_VALID: false
PRIMARY_FAILURE: ""
SECONDARY_FAILURE: ""
RESULT_EVIDENCE: ""
</runtime>

<triggers>
<trigger event="user_message" target="rpiv-router" />
</triggers>

<processes>
<process id="rpiv-router" name="Drive the RPIV pipeline">
TRY:
  RUN `init-pipeline`
  RUN `prepare-feature-branch`
  RUN `invoke-harness-hook` where: hook="pre-flight"
  RUN `publish-progress` where: phase="research", status="running"
  RUN `dispatch-research`
  RUN `publish-progress` where: phase="plan", status="running"
  RUN `dispatch-plan`
  RUN `validate-plan-handoff`
  RUN `invoke-harness-hook` where: hook="pre-coding"
  RUN `publish-progress` where: phase="implement", status="running"
  RUN `dispatch-implement`
  RUN `validate-implement-handoff`
  RUN `publish-progress` where: phase="verify", status="running"
  RUN `dispatch-verify` where: implement_handoff=IMPLEMENT_HANDOFF, issue_number=ISSUE_NUMBER, launch_binding=LAUNCH_BINDING, plan_handoff=PLAN_HANDOFF, work_item_path=WORK_ITEM_PATH
  RUN `validate-runner-result`
  RUN `invoke-harness-hook` where: hook="post-flight"
  RUN `publish-progress` where: phase="terminal", status="succeeded"
  RETURN: format="COMPLETION_REPORT", branch_name=BRANCH_NAME, commit_sha=IMPLEMENT_HANDOFF.commit_sha, issue_number=ISSUE_NUMBER, pr_url=PR_URL, stage_results=STAGE_RESULTS
RECOVER (err):
  SET PRIMARY_FAILURE := err (from `rpiv-router`)
  RUN `fail-pipeline` where: original_error=PRIMARY_FAILURE
  RETURN: format="PIPELINE_ERROR", details=PRIMARY_FAILURE, error_message="RPIV failed; terminal publication evidence is secondary", failed_stage=CURRENT_STAGE, issue_number=ISSUE_NUMBER, return_stage=FAILURE_OWNER
</process>

<process id="init-pipeline" name="Parse binding and validate pipeline input">
SET CURRENT_STAGE := "init" (from "Agent Inference")
USE `read_file` where: file_path=AGENTS_MD_PATH
CAPTURE PIPELINE_SPEC from `read_file`
USE `read_file` where: file_path=DECISION_LOG_PATH
CAPTURE DECISION_LOG from `read_file`
SET ISSUE_NUMBER := <NUMBER> (from "Agent Inference" using USER_INPUT)
SET LAUNCH_BINDING := <OPTIONAL_INTEGRATION_LAUNCH_V1> (from "Agent Inference" using USER_INPUT)
SET BINDING_PRESENT := <PRESENT> (from "Agent Inference" using LAUNCH_BINDING)
IF BINDING_PRESENT is true:
  RUN `validate-launch-binding`
USE `run_in_terminal` where: command="just --list"
CAPTURE JUSTFILE_LIST from `run_in_terminal`
ASSERT JUSTFILE_LIST contains REQUIRED_RECIPES
USE `run_in_terminal` where: command="gh issue view <ISSUE_NUMBER> --json title,body,labels"
CAPTURE ISSUE_JSON from `run_in_terminal`
ASSERT ISSUE_JSON contains structured acceptance criteria
USE `file_search` where: pattern="project/work-items/<ISSUE_NUMBER>-*/plan/01-action-plan.md"
CAPTURE ACTION_PLAN_FILES from `file_search`
ASSERT ACTION_PLAN_FILES has at most one item
SET WORK_ITEM_PATH := <STABLE_PATH> (from "Agent Inference" using ACTION_PLAN_FILES, ISSUE_JSON, WORK_ITEMS_DIR)
SET PIPELINE_STATUS := "running" (from "Agent Inference")
</process>

<process id="validate-launch-binding" name="Validate the optional IntegrationLaunchV1">
USE `run_in_terminal` where: command="just runner-validate-binding '<LAUNCH_BINDING_JSON>'"
CAPTURE BINDING_RESULT from `run_in_terminal`
ASSERT BINDING_RESULT succeeded
ASSERT LAUNCH_BINDING.issueNumber = ISSUE_NUMBER
SET BINDING_VALID := true (from "Agent Inference")
</process>

<process id="prepare-feature-branch" name="Confirm the issue feature branch before Research">
SET CURRENT_STAGE := "branch" (from "Agent Inference")
USE `run_in_terminal` where: command="git branch --show-current"
CAPTURE CURRENT_BRANCH from `run_in_terminal`
ASSERT CURRENT_BRANCH not in PROTECTED_BRANCHES
ASSERT CURRENT_BRANCH contains ISSUE_NUMBER
SET BRANCH_NAME := CURRENT_BRANCH (from "Agent Inference")
IF BINDING_PRESENT is true:
  ASSERT LAUNCH_BINDING.branch = BRANCH_NAME
</process>

<process id="invoke-harness-hook" name="Invoke one engineering-harness lifecycle seam" args="hook: String">
USE `skill` where: arguments=["--hook", hook], name="eng-harness-flow"
CAPTURE HOOK_RESULT from `skill`
ASSERT HOOK_RESULT completed
</process>

<process id="publish-progress" name="Publish one bound Runner progress transition" args="phase: String, status: String">
IF BINDING_PRESENT is true:
  ASSERT BINDING_VALID is true
  USE `run_in_terminal` where: command="just runner-publish-progress '<LAUNCH_BINDING_JSON>' '<phase>' '<status>'"
  CAPTURE PROGRESS_RESULT from `run_in_terminal`
  ASSERT PROGRESS_RESULT succeeded
ELSE:
  SET PROGRESS_RESULT := "standalone-noop" (from "Agent Inference")
</process>

<process id="dispatch-research" name="Dispatch Research">
SET CURRENT_STAGE := "research" (from "Agent Inference")
SET RESEARCH_PROMPT := <PROMPT> (from "Agent Inference" using ISSUE_NUMBER, ISSUE_JSON, BRANCH_NAME, WORK_ITEM_PATH, LAUNCH_BINDING)
USE `agent` where: agent="rpiv-research", input=RESEARCH_PROMPT
CAPTURE RESEARCH_RESULT from `agent`
ASSERT RESEARCH_RESULT succeeded
SET STAGE_RESULTS := STAGE_RESULTS + ["Research: complete"] (from "Agent Inference")
</process>

<process id="dispatch-plan" name="Dispatch Plan">
SET CURRENT_STAGE := "plan" (from "Agent Inference")
SET PLAN_PROMPT := <PROMPT> (from "Agent Inference" using ISSUE_NUMBER, ISSUE_JSON, WORK_ITEM_PATH, RESEARCH_RESULT, LAUNCH_BINDING)
USE `agent` where: agent="rpiv-planner", input=PLAN_PROMPT
CAPTURE PLAN_RESULT from `agent`
ASSERT PLAN_RESULT succeeded
SET STAGE_RESULTS := STAGE_RESULTS + ["Plan: complete"] (from "Agent Inference")
</process>

<process id="validate-plan-handoff" name="Validate Plan acceptance coverage">
SET PLAN_HANDOFF := <HANDOFF> (from "Agent Inference" using PLAN_RESULT, WORK_ITEM_PATH)
ASSERT PLAN_HANDOFF has complete AC coverage
</process>

<process id="dispatch-implement" name="Dispatch Implement">
SET CURRENT_STAGE := "implement" (from "Agent Inference")
SET IMPLEMENT_PROMPT := <PROMPT> (from "Agent Inference" using ISSUE_NUMBER, WORK_ITEM_PATH, BRANCH_NAME, PLAN_HANDOFF, LAUNCH_BINDING)
USE `agent` where: agent="rpiv-implementer", input=IMPLEMENT_PROMPT
CAPTURE IMPLEMENT_RESULT from `agent`
ASSERT IMPLEMENT_RESULT succeeded
SET STAGE_RESULTS := STAGE_RESULTS + ["Implement: complete"] (from "Agent Inference")
</process>

<process id="validate-implement-handoff" name="Validate the committed Implement handoff">
SET IMPLEMENT_HANDOFF := <HANDOFF> (from "Agent Inference" using IMPLEMENT_RESULT)
ASSERT IMPLEMENT_HANDOFF.branch = BRANCH_NAME
ASSERT IMPLEMENT_HANDOFF.clean_tree is true
</process>

<process id="dispatch-verify" name="Dispatch Verify with an exact worker contract" args="implement_handoff: JSON, issue_number: Number, launch_binding: JSON, plan_handoff: JSON, work_item_path: Path">
SET CURRENT_STAGE := "verify" (from "Agent Inference")
SET VERIFY_INPUT := {"implement_handoff": IMPLEMENT_HANDOFF, "issue_number": ISSUE_NUMBER, "launch_binding": LAUNCH_BINDING, "plan_handoff": PLAN_HANDOFF, "work_item_path": WORK_ITEM_PATH} (from "Agent Inference")
USE `agent` where: agent="rpiv-verifier", input=VERIFY_INPUT
CAPTURE VERIFY_RESULT from `agent`
ASSERT VERIFY_RESULT succeeded
SET PR_URL := VERIFY_RESULT.pr_url (from "Agent Inference")
SET RESULT_EVIDENCE := VERIFY_RESULT.result_evidence (from "Agent Inference")
SET STAGE_RESULTS := STAGE_RESULTS + ["Verify: complete"] (from "Agent Inference")
</process>

<process id="validate-runner-result" name="Invoke the injected result validator before success">
IF BINDING_PRESENT is true:
  ASSERT RESULT_EVIDENCE is not empty
  USE `run_in_terminal` where: command="just runner-validate-result '<LAUNCH_BINDING_JSON>'"
  CAPTURE VALIDATION_RESULT from `run_in_terminal`
  ASSERT VALIDATION_RESULT succeeded
ELSE:
  SET VALIDATION_RESULT := "standalone-noop" (from "Agent Inference")
</process>

<process id="fail-pipeline" name="Attempt terminal failure without masking the original error" args="original_error: JSON">
SET SECONDARY_FAILURE := "" (from "Agent Inference")
IF BINDING_PRESENT is true and BINDING_VALID is true:
  TRY:
    RUN `publish-progress` where: phase="terminal", status="failed"
  RECOVER (publish_err):
    SET SECONDARY_FAILURE := <REDACTED_PUBLICATION_ERROR> (from "Agent Inference" using publish_err)
SET PIPELINE_STATUS := "error" (from "Agent Inference")
SET VERIFY_RESULT := {"original_error": original_error, "suppressed_publication_error": SECONDARY_FAILURE} (from "Agent Inference")
RETURN: VERIFY_RESULT
</process>
</processes>

<input>
USER_INPUT is a GitHub issue number or URL with structured acceptance criteria and MAY append one exact IntegrationLaunchV1 binding. The binding is optional; when absent, Runner helper processes are no-ops and standalone RPIV behavior is unchanged.
</input>
