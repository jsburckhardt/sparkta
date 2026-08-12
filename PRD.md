# Sparkta — Product Requirements Document

**Status:** Draft
**Version:** 0.1
**Repository:** `sparkta`

---

# 1. Summary

Sparkta is a local, agent-powered UI prototyping environment designed to run inside a development environment such as a Dev Container or GitHub Codespace.

A user starts Sparkta with a single command:

```bash
sparkta start
```

Sparkta launches a local web application.

From that application, the user can describe a UI they want to see:

> Create an executive dashboard showing engineering productivity across repositories.

Sparkta then:

1. Creates a new application directory.
2. Creates or starts a dedicated coding-agent session for that application.
3. Provides the coding agent with strict UI-generation instructions.
4. Generates a complete interactive frontend application.
5. Runs the generated application on an available local port.
6. Shows the application to the user.
7. Allows the user to continue modifying the application conversationally.

For example:

> Make the repository selector searchable.

> Add an engineer detail page.

> Make the charts more compact.

> Show an empty state when no repositories match.

The same application is modified rather than regenerated from scratch.

Sparkta is intentionally **not a general-purpose application builder**.

It is a rapid UI prototyping system.

Generated applications:

* contain frontend code only;
* use simulated/mock data;
* require no database;
* require no backend;
* require no external infrastructure;
* prioritize polished, modern, interactive UI;
* run only while the current development environment is running;
* can be restarted later directly from their files.

The generated source code stored on disk is the durable source of truth.

Agent sessions and running processes are considered disposable runtime state.

---

# 2. Product Vision

Sparkta should make building a working UI prototype feel closer to describing an idea than developing an application.

The core experience should be:

```text
Describe
   ↓
Generate
   ↓
Run
   ↓
See
   ↓
Discuss
   ↓
Modify
   ↓
See immediately
```

The user should not need to:

* initialize a frontend project;
* choose a framework;
* install packages;
* configure a development server;
* create mock data;
* tell an agent which files to edit;
* remember ports;
* manually restart applications;
* repeatedly explain the existing application.

Sparkta owns that workflow.

---

# 3. Core Product Principle

## Sparkta creates demos, not production applications.

This distinction should influence every architectural and product decision.

When faced with a choice between:

```text
production correctness
```

and:

```text
rapidly communicating a product idea
```

Sparkta should generally optimize for the latter.

The generated application should **look and behave convincingly**, without requiring production infrastructure.

---

# 4. Primary Use Case

A developer, product manager, architect, designer, consultant, or customer-facing engineer is working inside a Dev Container or Codespace.

They want to quickly communicate an application idea.

Instead of creating wireframes or manually implementing a frontend, they run:

```bash
sparkta start
```

They open Sparkta and enter:

> Build a dashboard for monitoring autonomous software delivery. Show active agents, their current task, repository, elapsed time, token consumption and recent activity.

Sparkta creates:

```text
.sparkta/
  apps/
    app-1/
```

A coding agent generates the UI.

Sparkta starts it on:

```text
6001
```

The user opens the application.

They then say:

> Clicking an agent should open a side panel showing its timeline.

The coding agent modifies the existing application.

The development server hot reloads.

The updated interface appears.

---

# 5. Goals

## G1 — One-command startup

Starting the product should require:

```bash
sparkta start
```

No additional manual services should be required.

---

## G2 — Prompt-to-running-UI

A user should be able to describe an interface and receive a functioning application without interacting with source code.

---

## G3 — Conversational iteration

Users should be able to continue changing an existing application through natural-language instructions.

---

## G4 — High-quality prototypes

Generated applications should look intentionally designed rather than like generic AI-generated dashboards.

---

## G5 — Interactive rather than static

Generated interfaces should simulate realistic application behavior.

Examples:

* navigation;
* filtering;
* searching;
* sorting;
* tabs;
* dialogs;
* forms;
* loading states;
* empty states;
* charts;
* editable controls;
* local state changes.

---

## G6 — Zero backend requirements

Applications must run without:

* databases;
* backend APIs;
* authentication infrastructure;
* cloud services;
* Docker Compose stacks;
* external data stores.

---

## G7 — Filesystem persistence

Applications must survive Sparkta restarts as long as their files remain available.

---

## G8 — Disposable runtime

Running processes, ports and agent sessions should be reconstructable from application files.

---

# 6. Non-Goals

The MVP will not attempt to provide:

* production application generation;
* backend generation;
* database generation;
* deployment to production;
* authentication systems;
* API development;
* infrastructure provisioning;
* Git workflows;
* pull-request management;
* collaborative editing;
* multi-user environments;
* visual drag-and-drop design;
* Figma replacement functionality;
* an IDE;
* a source-code editor;
* arbitrary framework selection;
* arbitrary package installation by users.

Sparkta should remain deliberately opinionated.

---

# 7. Key Product Constraint

Generated applications are **UI simulations**.

If a user asks:

> Build a customer management system.

Sparkta should create the experience of one.

It might include:

```text
Customers
Orders
Invoices
Search
Filters
Create customer
Edit customer
Customer details
Activity history
```

But all data is simulated locally.

Creating a customer may modify local React state.

Refreshing may restore fixture data.

This is acceptable.

The objective is to communicate:

> "This is what the product could feel like."

---

# 8. User Experience

## 8.1 Starting Sparkta

User runs:

```bash
sparkta start
```

Expected output should remain minimal:

```text
Sparkta running

Control UI:
http://localhost:6000
```

Inside environments supporting automatic port forwarding, the appropriate forwarded URL may also be surfaced.

---

# 9. Home Screen

The initial interface should be deliberately simple.

Example:

```text
┌─────────────────────────────────────────────────────────────┐
│ Sparkta                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ What do you want to build?                                  │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Describe an application or interface...                 │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                Create →     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Your demos                                                  │
│                                                             │
│ Agent Operations Dashboard              Running     Open →  │
│ Checkout Concept                        Stopped     Start →  │
│ Customer Portal                         Stopped     Start →  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 10. Application Workspace

Selecting a demo opens its workspace.

Conceptually:

```text
┌───────────────────────────────────────────────────────────────┐
│ ← Demos       Agent Operations              ● Running         │
├─────────────────────┬─────────────────────────────────────────┤
│                     │                                         │
│ Conversation        │                                         │
│                     │              Live Preview               │
│ User                │                                         │
│ Make the activity   │                                         │
│ chart selectable.   │                                         │
│                     │                                         │
│ Sparkta              │                                         │
│ Updating...         │                                         │
│                     │                                         │
│                     │                                         │
│ ┌─────────────────┐ │                                         │
│ │ Describe change │ │                                         │
│ └─────────────────┘ │                                         │
│          Send →     │                                         │
├─────────────────────┴─────────────────────────────────────────┤
│ Restart      Stop      Open externally      Delete             │
└───────────────────────────────────────────────────────────────┘
```

---

# 11. Core Domain Model

The central domain entity is an **App**.

An app is not an agent session.

An app is not a process.

An app is not a port.

An app is a persistent directory containing a generated UI.

Conceptually:

```text
App
 ├── identity
 ├── metadata
 ├── filesystem
 ├── conversation history
 ├── runtime
 └── optional agent session
```

---

# 12. Application Filesystem

Sparkta maintains its state under:

```text
.sparkta/
```

Suggested structure:

```text
.sparkta/
├── config.json
├── apps/
│   ├── app-1/
│   │   ├── sparkta.json
│   │   ├── package.json
│   │   ├── src/
│   │   ├── public/
│   │   └── README.md
│   │
│   ├── app-2/
│   │   └── ...
│   │
│   └── app-3/
│       └── ...
│
└── runtime/
    └── ...
```

Runtime files should be safe to delete.

Application files should not be.

---

# 13. Application Metadata

Each generated app contains:

```text
sparkta.json
```

Example:

```json
{
  "version": 1,
  "id": "app-1",
  "name": "Agent Operations",
  "description": "Dashboard for monitoring autonomous software delivery.",
  "createdAt": "2026-08-09T08:00:00Z",
  "updatedAt": "2026-08-09T08:10:00Z"
}
```

Do not store process IDs or other volatile runtime information here unless clearly marked as disposable.

---

# 14. Runtime Model

Runtime information should be tracked separately.

For example:

```json
{
  "appId": "app-1",
  "status": "running",
  "port": 6001,
  "pid": 4217,
  "startedAt": "2026-08-09T08:15:00Z"
}
```

If this information is lost, Sparkta should reconstruct the runtime from the filesystem.

---

# 15. Port Allocation

Sparkta owns a configurable port range.

Default:

```text
Controller: 6000

Generated applications:

6001
6002
6003
...
```

Ports should be allocated dynamically.

Do not permanently bind:

```text
app-1 = 6001
```

Instead:

```text
app-1
  ↓
request runtime
  ↓
find available port
  ↓
6004
```

An application should not depend on a specific port.

---

# 16. Application Lifecycle

Every application supports five fundamental operations:

```text
create(prompt)

update(appId, prompt)

start(appId)

stop(appId)

delete(appId)
```

These operations form the core product API.

---

# 17. Create Flow

When the user submits:

> Build an analytics dashboard showing Copilot adoption across engineering teams.

Sparkta should:

```text
1. Generate app ID
       ↓
2. Create application directory
       ↓
3. Copy blessed starter template
       ↓
4. Create app metadata
       ↓
5. Start agent task
       ↓
6. Ask agent to implement requested UI
       ↓
7. Validate generated project
       ↓
8. Allocate port
       ↓
9. Start dev server
       ↓
10. Return running preview
```

---

# 18. Update Flow

For an existing application:

> Add a date range selector and compare the current period with the previous one.

Sparkta should:

```text
User instruction
      ↓
Application lookup
      ↓
Agent session lookup
      ↓
Resume session if appropriate
      ↓
Otherwise start new maintenance session
      ↓
Agent reads existing project
      ↓
Agent modifies files
      ↓
Validation
      ↓
Existing dev server hot reloads
      ↓
Preview updates
```

---

# 19. Critical Resilience Rule

## Application continuity must not depend on agent-session continuity.

Preferred:

```text
app-1
 ├── files
 └── session-abc
```

If:

```text
session-abc
```

disappears, Sparkta creates:

```text
session-def
```

and provides instructions such as:

```text
You are maintaining an existing Sparkta application.

Read the application before making changes.

Understand its current:
- layout;
- components;
- visual language;
- interactions;
- mock data;
- navigation.

Preserve existing functionality unless the user specifically asks for changes.

User request:

"Add repository filtering."
```

The application files are authoritative.

---

# 20. Agent Architecture

Sparkta should integrate with coding agents through an abstraction.

Example conceptual interface:

```ts
interface AgentAdapter {
  createSession(options): Promise<AgentSession>;
  resumeSession(sessionId, prompt): Promise<AgentResult>;
  runInApp(appPath, prompt): Promise<AgentResult>;
  cancel(sessionId): Promise<void>;
}
```

The initial implementation targets the Copilot CLI.

The product architecture should not unnecessarily couple the entire application to one specific Copilot CLI invocation syntax.

---

# 21. Copilot Session Semantics

Where supported, each application should receive a recognizable session identity.

For example:

```text
app-1
app-2
app-3
```

or:

```text
sparkta-app-1
```

Agent work must execute with the application's directory as its working directory.

Example conceptual execution:

```text
cwd = .sparkta/apps/app-1
session = sparkta-app-1
```

Exact CLI integration should live behind the agent adapter.

---

# 22. Agent Instruction System

The quality of Sparkta will depend heavily on its agent instructions.

The instruction system is a first-class product component.

Suggested structure:

```text
agent/
├── system.md
├── design-rules.md
├── architecture-rules.md
└── modification-rules.md
```

---

# 23. Base Agent Rules

The generated application must obey:

```markdown
# Sparkta UI Agent

You create high-quality interactive frontend prototypes.

## Purpose

Your output is a working product prototype intended to communicate how an application could look and behave.

It is not a production system.

## Architecture

- Frontend only.
- Never create backend services.
- Never create databases.
- Never require Docker.
- Never require external infrastructure.
- Never introduce authentication infrastructure.
- Avoid external API requirements.
- Use simulated application data.
- Keep the application independently runnable.

## Interaction

The prototype should behave convincingly.

Where appropriate:

- buttons should work;
- forms should respond;
- filters should filter;
- search should search;
- tabs should change content;
- navigation should work;
- dialogs should open and close;
- tables should sort;
- controls should affect the interface.

## Data

Use realistic simulated data.

Avoid:

- lorem ipsum;
- meaningless values;
- generic User 1 / User 2 content.

Prefer realistic domain-specific names, numbers, statuses and timestamps.

## UX

Create useful states where appropriate:

- loading;
- empty;
- error;
- success;
- disabled;
- hover;
- selected.

## Modification

When changing an existing application:

1. Read the existing implementation.
2. Understand its design language.
3. Preserve unrelated functionality.
4. Make the smallest coherent change.
5. Avoid rewriting the application unnecessarily.
```

---

# 24. Design Philosophy

Sparkta should actively discourage stereotypical AI-generated interfaces.

Avoid patterns such as:

```text
giant gradients
every element inside a card
huge border radiuses
excessive shadows
meaningless statistics
random purple accents
generic hero sections
excessive whitespace
```

Prefer:

```text
clear hierarchy
purposeful density
coherent spacing
strong typography
subtle interaction
good information architecture
domain-specific interfaces
responsive layouts
realistic content
```

The generated application should feel like it was designed for its stated purpose.

---

# 25. Blessed Frontend Stack

The MVP should support exactly one generated-application stack.

Recommended baseline:

```text
React
TypeScript
Vite
Tailwind CSS
Lucide icons
Radix/shadcn-style components
Recharts where charts are needed
```

The exact component strategy may evolve, but users should not select their framework.

This is intentional.

Sparkta controls the environment so that agents can focus on implementation rather than architectural decisions.

---

# 26. Starter Template

New applications should not be generated from an empty directory.

Sparkta should maintain a known-good starter application.

Example:

```text
templates/
└── default/
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx
    │   └── index.css
    └── ...
```

Benefits:

* predictable dependencies;
* faster generation;
* consistent scripts;
* reduced agent work;
* reduced dependency errors;
* consistent design primitives.

---

# 27. Dependency Policy

Agents should generally use dependencies already present in the starter template.

Agents should avoid arbitrarily adding packages.

If additional packages are allowed later, Sparkta should explicitly define an allowlist.

This protects:

* startup speed;
* reliability;
* security;
* repeatability.

---

# 28. Standard Runtime Contract

Every application must support:

```bash
npm run dev -- --host 0.0.0.0 --port <PORT>
```

Sparkta should therefore be able to start any existing application without understanding its implementation.

---

# 29. Standard Validation Contract

Every generated application must support at least:

```bash
npm run build
```

Recommended later:

```bash
npm run lint
```

Before an agent task is considered complete, Sparkta should verify that the application builds successfully.

---

# 30. Failure Recovery

If an agent produces invalid code:

```text
Agent finishes
    ↓
npm run build
    ↓
failure
    ↓
send build failure back to agent
    ↓
agent repairs
    ↓
validate again
```

A configurable retry limit should prevent infinite correction loops.

For MVP:

```text
max repair attempts = 3
```

---

# 31. Application Statuses

Suggested user-visible states:

```text
Creating
Updating
Running
Stopped
Failed
```

Internal states may be more granular:

```text
CREATING_FILES
AGENT_RUNNING
VALIDATING
STARTING
RUNNING
STOPPING
FAILED
```

The UI should expose the simpler product states.

---

# 32. Creation Experience

Creating an application may take multiple steps.

The user should see meaningful progress.

For example:

```text
Creating application...

✓ Workspace created
✓ UI generated
✓ Application validated
● Starting preview
```

Avoid exposing noisy agent logs by default.

A detailed log can be available for diagnostics.

---

# 33. Conversational History

Sparkta should maintain lightweight conversation history per application.

Suggested:

```text
.sparkta/apps/app-1/.sparkta/
  conversation.json
```

Example:

```json
[
  {
    "role": "user",
    "content": "Build an agent monitoring dashboard."
  },
  {
    "role": "user",
    "content": "Add a repository filter."
  }
]
```

This history provides context for humans and may optionally assist fresh agent sessions.

It should not replace reading the existing application.

---

# 34. Restarting Sparkta

After the development environment restarts:

```bash
sparkta start
```

Sparkta scans:

```text
.sparkta/apps/
```

and discovers:

```text
app-1
app-2
app-3
```

All should initially appear as:

```text
Stopped
```

The user can click:

```text
Start
```

Sparkta:

1. allocates a port;
2. starts the application;
3. updates its runtime state;
4. exposes the preview.

No agent is required to restart an application.

---

# 35. Restarting an App

Conceptually:

```bash
sparkta app start app-1
```

may eventually be supported.

The UI is the primary MVP interface, but application lifecycle primitives should be implemented in a way that makes CLI commands straightforward.

---

# 36. Suggested CLI

MVP required:

```bash
sparkta start
```

Potential commands:

```bash
sparkta start

sparkta apps

sparkta app start app-1

sparkta app stop app-1

sparkta app delete app-1

sparkta doctor
```

`sparkta doctor` would later validate that required dependencies are available.

---

# 37. Control Plane Architecture

Sparkta consists of three major layers:

```text
┌─────────────────────────────────┐
│          Sparkta Web UI          │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│        Sparkta Controller        │
│                                 │
│ Apps                            │
│ Runtime                         │
│ Agents                          │
│ Validation                      │
│ Filesystem                      │
└───────┬────────────────┬────────┘
        │                │
        │                │
┌───────▼──────┐   ┌─────▼─────────────┐
│ Copilot CLI  │   │ Generated Apps    │
│              │   │                   │
│ sessions     │   │ app-1 :6001       │
└──────────────┘   │ app-2 :6002       │
                   │ app-3 :6003       │
                   └───────────────────┘
```

---

# 38. Suggested Repository Structure

```text
sparkta/
├── package.json
├── README.md
├── docs/
│   └── architecture.md
│
├── packages/
│   ├── cli/
│   │   └── src/
│   │
│   ├── server/
│   │   └── src/
│   │
│   ├── web/
│   │   └── src/
│   │
│   ├── core/
│   │   └── src/
│   │
│   └── agent-copilot/
│       └── src/
│
├── templates/
│   └── default/
│
├── agent/
│   ├── system.md
│   ├── design-rules.md
│   └── modification-rules.md
│
└── tests/
```

A monorepo is appropriate because these packages represent one application and will evolve together.

---

# 39. Core Package Responsibilities

## `packages/core`

Domain logic.

Responsibilities:

```text
App model
App IDs
App discovery
Metadata
Filesystem paths
Port allocation abstractions
Lifecycle contracts
```

Should avoid UI or Copilot-specific logic.

---

## `packages/agent-copilot`

Copilot integration.

Responsibilities:

```text
start session
resume session
execute prompt
capture output
cancel execution
report status
```

---

## `packages/server`

Local control plane.

Responsibilities:

```text
HTTP API
WebSocket/SSE status updates
application lifecycle
agent orchestration
process management
validation
```

---

## `packages/web`

Sparkta user interface.

Responsibilities:

```text
home
create app
app workspace
conversation
preview
status
runtime controls
```

---

## `packages/cli`

Entry point.

Responsibilities:

```text
sparkta start
```

Starts the Sparkta server and provides the access URL.

---

# 40. Process Management

Sparkta must track child development servers.

A process abstraction should support:

```ts
interface AppRuntimeManager {
  start(appId: string): Promise<AppRuntime>;
  stop(appId: string): Promise<void>;
  restart(appId: string): Promise<AppRuntime>;
  status(appId: string): Promise<AppRuntimeStatus>;
}
```

Sparkta should terminate generated application processes when its own process exits where feasible.

---

# 41. Dev Container / Codespace Lifecycle

Sparkta does not promise permanent hosting.

Expected lifecycle:

```text
Codespace starts
      ↓
sparkta start
      ↓
apps can run
      ↓
Codespace stops
      ↓
apps stop
```

The application files remain wherever the workspace filesystem persists.

When the environment returns:

```text
sparkta start
```

and apps can be started again.

This ephemeral runtime model is intentional.

---

# 42. Security Boundary

Agent tasks must be constrained as much as practical to:

```text
.sparkta/apps/<app-id>
```

The agent should not need to modify the parent repository.

Generated applications should not require secrets.

Agents should explicitly be instructed:

```text
Do not read environment secrets.
Do not modify files outside the current application.
Do not introduce credentials.
Do not call external services unless explicitly allowed by Sparkta.
```

Runtime enforcement should be preferred over instruction-only enforcement where practical.

---

# 43. Preview

The application workspace should support a preview.

Possible implementations:

### Option A — iframe

```text
Sparkta UI
   ↓
iframe localhost:6001
```

Preferred where environment and browser restrictions permit.

### Option B — Open Preview

Provide an obvious button:

```text
Open app
```

which opens the environment-forwarded application URL.

MVP should support both where practical.

---

# 44. Preview Refresh

Generated applications should rely on Vite HMR.

During an update:

```text
agent modifies source
       ↓
Vite notices
       ↓
browser refreshes/HMR
       ↓
user sees change
```

Sparkta should not manually rebuild and restart for normal frontend edits.

---

# 45. MVP Screens

Only three principal screens are required.

## Screen 1 — Apps

```text
Create new demo
List demos
Start
Stop
Open
Delete
```

## Screen 2 — Creating

```text
Prompt
Progress
Failure/retry state
```

## Screen 3 — App Workspace

```text
Conversation
Preview
Status
Send modification
Restart
Stop
Open externally
```

Avoid adding settings-heavy interfaces initially.

---

# 46. API Sketch

Potential HTTP API:

```text
GET    /api/apps

POST   /api/apps

GET    /api/apps/:id

DELETE /api/apps/:id

POST   /api/apps/:id/start

POST   /api/apps/:id/stop

POST   /api/apps/:id/restart

POST   /api/apps/:id/messages

GET    /api/apps/:id/runtime

GET    /api/apps/:id/events
```

Creation:

```json
POST /api/apps

{
  "prompt": "Build a dashboard for monitoring autonomous agents."
}
```

Modification:

```json
POST /api/apps/app-1/messages

{
  "message": "Add a repository filter."
}
```

---

# 47. Events

Long-running operations should emit events.

Example:

```text
APP_CREATED
AGENT_STARTED
AGENT_PROGRESS
AGENT_COMPLETED
VALIDATION_STARTED
VALIDATION_FAILED
VALIDATION_COMPLETED
APP_STARTING
APP_RUNNING
APP_STOPPED
APP_FAILED
```

The frontend can consume these through SSE initially.

SSE is likely sufficient for the MVP and simpler than introducing bidirectional WebSockets unless later required.

---

# 48. Deletion

Deleting an app should:

```text
stop runtime
cancel active agent if necessary
delete application directory
remove runtime state
```

Deletion must require explicit user action.

---

# 49. Concurrency

The system should eventually support multiple apps running simultaneously.

Example:

```text
6000 Sparkta
6001 app-1
6002 app-2
6003 app-3
```

For the initial prototype, multiple running apps should work, but parallel agent generation does not need heavy optimization.

---

# 50. Agent Execution Lock

Only one mutating agent operation should run against an application at a time.

If the user sends:

```text
Change A
Change B
Change C
```

while the application is updating, Sparkta should queue messages rather than allowing multiple agents to edit the same files concurrently.

Conceptually:

```text
app-1
  agent lock = busy

message A → running
message B → queued
message C → queued
```

---

# 51. Product Quality Bar

A generated application is successful when:

1. It builds.
2. It starts.
3. It visually represents the requested idea.
4. Major controls behave plausibly.
5. Sample data supports the story the UI is trying to tell.
6. The result does not obviously look like an unfinished scaffold.

---

# 52. MVP Acceptance Criteria

## Startup

Given a compatible development environment,

when the user runs:

```bash
sparkta start
```

then Sparkta starts successfully and exposes its control UI.

---

## Create

Given Sparkta is running,

when the user describes a UI,

then Sparkta creates an application directory and invokes the configured coding agent.

---

## Generate

Given an application creation request,

when the agent completes,

then the generated application:

```text
uses the blessed frontend stack;
contains simulated data;
contains no required backend;
builds successfully.
```

---

## Run

Given a valid generated app,

when generation finishes,

then Sparkta starts it on an available port and exposes its preview.

---

## Modify

Given a running application,

when the user describes a change,

then an agent modifies the existing application rather than creating a separate application.

---

## Hot Reload

Given a running application,

when source files change,

then the preview reflects those changes through the frontend development server.

---

## Restart

Given a previously generated but stopped application,

when the user starts it,

then Sparkta runs it without requiring an agent.

---

## Recovery

Given Sparkta has restarted,

when the application files still exist,

then Sparkta discovers them and allows them to run again.

---

## Agent Recovery

Given an application exists but its previous agent session cannot be resumed,

when the user requests another modification,

then Sparkta starts a new agent session that reads and modifies the existing project.

---

# 53. Prototype Delivery Plan

Development should progress through small prototypes that validate the risky assumptions before building the complete experience.

---

# Prototype 0 — Can We Generate?

### Objective

Validate that a coding agent can reliably generate a good frontend under strict instructions.

### Scope

No Sparkta UI.

Manual directory creation.

Something equivalent to:

```text
mkdir app-1
invoke agent with Sparkta prompt
npm run build
npm run dev
```

### Validate

* design quality;
* agent instruction quality;
* frontend stack;
* mock-data quality;
* build reliability.

### Exit criterion

Repeated prompts produce useful working prototypes.

---

# Prototype 1 — Controller + Create

### Objective

Prove the core end-to-end experience.

Implement:

```bash
sparkta start
```

Web page containing:

```text
prompt input
Create button
```

Flow:

```text
prompt
 ↓
directory
 ↓
agent
 ↓
application
 ↓
start
 ↓
Open App
```

Only one app needs to exist at a time.

### Exit criterion

A user can go from natural-language request to running frontend entirely through Sparkta.

---

# Prototype 2 — Multiple Apps

### Objective

Introduce persistent application identity.

Implement:

```text
app list
app IDs
filesystem discovery
port allocation
start
stop
delete
```

### Exit criterion

Multiple generated demos can coexist independently.

---

# Prototype 3 — Conversational Modification

### Objective

Validate the key iteration loop.

Implement:

```text
conversation panel
agent session tracking
update message
existing-app modification
build validation
```

### Exit criterion

A user can iteratively evolve an application without touching code.

---

# Prototype 4 — Live Workspace

### Objective

Make the experience feel productized.

Implement:

```text
embedded preview
progress states
event streaming
runtime state
restart
error UI
```

### Exit criterion

Sparkta feels like one cohesive product rather than a wrapper around terminal scripts.

---

# Prototype 5 — Agent Resilience

### Objective

Remove dependency on persistent agent sessions.

Test:

```text
create app
destroy agent session
restart Sparkta
request modification
```

Fresh agent should understand and successfully modify the existing app.

### Exit criterion

Filesystem is demonstrably sufficient durable state.

---

# Prototype 6 — Quality Harness

### Objective

Improve reliability and output quality.

Introduce automated checks for:

```text
build
runtime startup
basic browser load
console errors
design-rule compliance where practical
```

Agent receives failures and repairs its own work.

---

# 54. Initial Technical Decisions

Unless strong evidence emerges otherwise, begin with:

```text
Language:
TypeScript

Runtime:
Node.js

Control UI:
React

Control UI build:
Vite

Server:
Fastify or similarly lightweight Node HTTP server

Streaming:
Server-Sent Events

Generated apps:
React + TypeScript + Vite

Styling:
Tailwind

Agent:
Copilot CLI through adapter

Persistence:
Filesystem

Runtime management:
Node child processes
```

Avoid introducing:

```text
PostgreSQL
Redis
Docker Compose
Kubernetes
message brokers
complex job infrastructure
```

They are unnecessary for the product being validated.

---

# 55. Questions We Intentionally Defer

The following do not need to block the MVP:

* production deployment;
* shared demos;
* hosted Sparkta;
* multiple users;
* authentication;
* remote workspaces;
* GitHub repository creation;
* importing existing projects;
* backend generation;
* persistent cloud agent sessions;
* visual editing;
* model selection;
* arbitrary framework selection.

These become relevant only if the core conversational UI-prototyping experience succeeds.

---

# 56. North-Star Experience

The north-star demonstration should be possible in a clean Dev Container.

The user runs:

```bash
sparkta start
```

They open Sparkta.

They type:

> Create a modern dashboard for monitoring AI-assisted software delivery. I want to see repositories, active coding agents, current issues, pull request status, build health and a timeline of recent agent activity.

Shortly afterward, the application appears.

The user explores it.

They then type:

> I don't like the cards. Make it feel more like a serious engineering operations console. Put repositories in a left sidebar, use a denser layout and add an agent activity drawer when I click an agent.

The existing app changes.

They then type:

> Add a simulated failure state where the payments repository has a failing build and let me click it to inspect the failed checks.

The UI changes again.

At no point does the user:

```text
create a React app
edit source
install UI libraries
create mock JSON
configure Vite
choose ports
restart servers
explain files to an agent
```

That is Sparkta.

---

# 57. Product Thesis

Modern coding agents are already capable of producing high-quality frontend applications.

The missing product layer is not another code generator.

It is an opinionated harness that gives those agents:

```text
a constrained environment
+ strong design instructions
+ deterministic project scaffolding
+ lifecycle management
+ conversational continuity
+ automatic validation
+ immediate preview
```

Sparkta provides that harness.

The product does not need to own application development.

It only needs to make this loop excellent:

```text
idea
 ↓
working UI
 ↓
feedback
 ↓
better working UI
```

If Sparkta makes that loop fast, reliable and enjoyable, it has succeeded.
