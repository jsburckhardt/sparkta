#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const LAUNCH_KEYS = ["schemaVersion", "runId", "attempt", "issueNumber", "branch", "startedAt", "progressPath", "resultPath", "requiredFinalValidation", "publishProgressCommand", "publishResultCommand", "validateResultCommand"];
const PHASES = new Set(["research", "plan", "implement", "verify", "terminal"]);
const STATUSES = new Set(["running", "succeeded", "failed", "blocked", "cancelled", "interrupted"]);
const record = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const positive = (value) => Number.isSafeInteger(value) && value > 0;
const nonempty = (value) => typeof value === "string" && value.length > 0;

export function parseLaunchBinding(text) {
  const binding = JSON.parse(text);
  assert.ok(record(binding), "IntegrationLaunchV1 must be an object");
  assert.deepEqual(Object.keys(binding).sort(), [...LAUNCH_KEYS].sort(), "IntegrationLaunchV1 keys differ");
  assert.equal(binding.schemaVersion, 1, "IntegrationLaunchV1 schemaVersion must be 1");
  assert.ok(nonempty(binding.runId), "IntegrationLaunchV1 runId is required");
  assert.ok(positive(binding.attempt), "IntegrationLaunchV1 attempt must be positive");
  assert.ok(positive(binding.issueNumber), "IntegrationLaunchV1 issueNumber must be positive");
  assert.ok(nonempty(binding.branch), "IntegrationLaunchV1 branch is required");
  assert.ok(nonempty(binding.startedAt) && Number.isFinite(Date.parse(binding.startedAt)), "IntegrationLaunchV1 startedAt is invalid");
  assert.ok(nonempty(binding.progressPath) && path.isAbsolute(binding.progressPath) && binding.progressPath.endsWith(`${path.sep}.soft-factory${path.sep}rpiv-status.json`), "IntegrationLaunchV1 progressPath is invalid");
  assert.ok(nonempty(binding.resultPath) && path.isAbsolute(binding.resultPath) && binding.resultPath.endsWith(`${path.sep}.soft-factory${path.sep}agent-result.json`), "IntegrationLaunchV1 resultPath is invalid");
  assert.notEqual(binding.progressPath, binding.resultPath, "IntegrationLaunchV1 paths must be distinct");
  assert.deepEqual(binding.requiredFinalValidation, { command: "just verify" }, "Only the snapshotted root final validation is supported");
  const issue = String(binding.issueNumber);
  assert.equal(binding.publishProgressCommand, `soft-factory internal publish-progress --issue ${issue} --phase <phase> --status <status>`, "publishProgressCommand differs from the fixed protocol-1 grammar");
  assert.equal(binding.publishResultCommand, `soft-factory internal publish-result --issue ${issue} --candidate .soft-factory/agent-result.candidate.json`, "publishResultCommand differs from the fixed protocol-1 grammar");
  assert.equal(binding.validateResultCommand, `soft-factory internal validate-result --issue ${issue}`, "validateResultCommand differs from the fixed protocol-1 grammar");
  return binding;
}

function tokenizeFixedCommand(command) {
  assert.ok(!/[\n\r\t'"`$;&|<>\\]/u.test(command), "Injected helper command contains shell syntax");
  const tokens = command.split(" ");
  assert.ok(tokens.every(nonempty), "Injected helper command contains empty argv entries");
  assert.equal(tokens[0], "soft-factory", "Injected helper executable must be soft-factory");
  return { command: tokens[0], args: tokens.slice(1) };
}

export function buildHelperInvocation(input) {
  const binding = typeof input.binding === "string" ? parseLaunchBinding(input.binding) : parseLaunchBinding(JSON.stringify(input.binding));
  let helper;
  if (input.operation === "progress") {
    assert.ok(PHASES.has(input.phase), "Progress phase is invalid");
    assert.ok(STATUSES.has(input.status), "Progress status is invalid");
    assert.equal(input.phase === "terminal", input.status !== "running", "Only terminal progress may use a terminal status");
    helper = binding.publishProgressCommand.replace("<phase>", input.phase).replace("<status>", input.status);
  } else if (input.operation === "publish-result") helper = binding.publishResultCommand;
  else if (input.operation === "validate-result") helper = binding.validateResultCommand;
  else if (input.operation === "final-validation") helper = binding.requiredFinalValidation.command;
  else throw new Error(`Unsupported integration helper operation: ${input.operation}`);
  return tokenizeFixedCommand(helper);
}

export function executeHelper(input, executor = spawnSync) {
  const invocation = buildHelperInvocation(input);
  const result = executor(invocation.command, invocation.args, { stdio: "inherit", shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Injected helper exited with status ${String(result.status)}`);
  return invocation;
}

function cli() {
  const [operation, bindingText, phase, status] = process.argv.slice(2);
  assert.ok(operation && bindingText, "Usage: runner-integration-adapter <operation> <binding-json> [phase] [status]");
  if (operation === "validate-binding") {
    parseLaunchBinding(bindingText);
    console.log("RUNNER_BINDING_VALID");
    return;
  }
  executeHelper({ operation, binding: bindingText, phase, status });
}
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) cli();
