# Attempt evidence

- Trial ID: `03-customer-management`
- Attempt ID: `02-rerun`
- Starter Inventory SHA-256: `22603a301228e0979c8395b7186e72b4b03d0098771b184de30c0f2a7f492eb5`
- Starter Lock SHA-256: `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7`
- Clean Copy: PASS — complete starter copy with no node_modules or dist

## Dependency installation

- Outcome: PASS
- Command: `npm ci --include=dev`
- Exit Status: 0
- Lock Before: `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7`
- Lock After: `ea65164c5e5c4adc563dd2bfff644023bba2053a7f6e50383ede8813b2ac02a7`
- Dependency Allowlist: PASS

```text

added 179 packages in 8s

28 packages are looking for funding
  run `npm fund` for details
npm warn allow-scripts 1 package has install scripts not yet covered by allowScripts:
npm warn allow-scripts   esbuild@0.28.1 (postinstall: node install.js)
npm warn allow-scripts
npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.

```

## Frontend-only audit

- Outcome: PASS
- Simulated domain marker: /customer|invoice/i
- Prohibited backend, database, Docker, authentication, external API, and runtime fetch scan: PASS

## Build result

- Outcome: PASS
- Command: `npm run build`
- Exit Status: 0
- Artifact: `app/dist/index.html` proved before owned cleanup

```text

> sparkta-generated-frontend@0.0.0 build
> tsc -b && vite build

vite v7.3.6 building client environment for production...
transforming...
✓ 1579 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.43 kB │ gzip:  0.28 kB
dist/assets/index-kKs7FGQl.css   22.34 kB │ gzip:  5.83 kB
dist/assets/index-CsMIsPeL.js   220.96 kB │ gzip: 68.94 kB
✓ built in 3.50s

```

## Runtime port

- Outcome: PASS
- Assigned Port: 33709
- Command: `npm run dev -- --host 0.0.0.0 --port 33709`

## Browser-load result

- Outcome: PASS
- Evidence Level: HTTP browser-loadability only; no real-browser, DOM-event, screenshot, console, or viewport claim
- HTTP 200: PASS
- Content-Type text/html: PASS
- Trial-specific source marker over Vite HTTP: PASS

## Owned cleanup

- Outcome: PASS
- Process: owned detached process group only
- Released Port: PASS
- Runtime artifacts: node_modules and dist removed after proof

## Generated result hash

- Post-generation app inventory SHA-256: `d026f75fff42b03daa7bc207178b8d982d44f85252cada93a87ce2934e1f8031`

## Prompt-major controls

Evidence is source-backed behavior inference combined with the successful HTTP runtime proof above; it does not claim DOM-event or real-browser automation.

| Prompt-major capability | Rendered control | Handler/state transition | Expected visible effect | Verdict |
| --- | --- | --- | --- | --- |
| Search customers | Search input, clear button | `search` state and `filtered` memo in `app/src/App.tsx:468,477-484,545` | Rows narrow by customer name, company, or email; clear restores rows | PASS |
| Filter customers | Status and tier selects | `status`/`tier` state feed `filtered` memo in `app/src/App.tsx:469-470,481-482,547-551` | Table and result count update; clear filters restores all customers | PASS |
| Create customer | Create customer button and required modal form | `formMode="create"`; `saveCustomer` prepends a complete local record and raises a toast in `app/src/App.tsx:491-515,533,583-584` | New customer appears in table and summary count with success feedback | PASS |
| Customer details | Customer row and chevron | `selectedId` selects `DetailView` in `app/src/App.tsx:476,527-528,563-572` | Customer identity, account metrics, contacts, notes, and related records replace the list | PASS |
| Edit customer | Edit customer button and populated modal | `formMode="edit"`; `saveCustomer` updates matching local record and prepends history in `app/src/App.tsx:491-499,528,583` | Edited details render immediately and success toast confirms save | PASS |
| Orders and invoices | Detail tabs | `DetailView` tab state selects `RecordsTable` in `app/src/App.tsx:340,358-365,401-402,408-440` | Customer-specific orders or invoices, statuses, amounts, and empty state render | PASS |
| Activity history | Activity tab | Tab state selects `ActivityHistory` in `app/src/App.tsx:358-365,403,444-463` | Timestamped customer, order, invoice, and note events render | PASS |

## Unmet checks

- Checklist interaction row: FAIL — secondary controls not required by the fixed prompt are visibly inert: primary sidebar navigation, global search, Help center, Edit note, New order, New invoice, and record chevrons have no workflow handler. All prompt-major controls listed above have complete source paths.
- Real-browser visual, DOM-event, screenshot, console, and viewport behavior remain uninstrumented. Design and responsive findings are bounded source/CSS inference plus HTTP browser-loadability only.

## Product Quality Bar

- Build: PASS — locked install and strict TypeScript/Vite build succeeded.
- Start: PASS — standard assigned-port runtime returned HTTP 200 `text/html` and cleaned up port 33709.
- Visually represents request: PASS — source renders a customer workspace with customer rows, account health, customer details, orders, invoices, and activity history.
- Major controls plausible: PASS — every fixed-prompt control has a complete control/state/visible-effect trace above.
- Story-supporting data: PASS — eight named customer accounts have coherent contacts, tiers, statuses, spend, orders, invoices, notes, and dated history.
- Not unfinished scaffold: PASS — the fixed-prompt list/detail/create/edit and related-record workflows are complete; inert secondary controls remain an explicit non-blocking quality gap.

## Attempt verdict

- Operational Validation: PASS
- Product Quality Bar: PASS
- Attempt Verdict: PASS
- Blocker: None; secondary inert controls are retained as an explicit unmet quality check
