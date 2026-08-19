import {
  Activity,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clock3,
  Command,
  GitBranch,
  GitPullRequest,
  LayoutDashboard,
  ListFilter,
  MoreHorizontal,
  Pause,
  Play,
  Search,
  Settings,
  TerminalSquare,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type AgentStatus = "Running" | "Waiting" | "Reviewing";

type Agent = {
  id: number;
  name: string;
  initials: string;
  color: string;
  role: string;
  status: AgentStatus;
  task: string;
  issue: string;
  repo: string;
  branch: string;
  elapsed: string;
  elapsedMinutes: number;
  tokens: number;
  tokenLabel: string;
  tokenLimit: number;
  activity: string;
  activityType: "commit" | "pull" | "test" | "thinking";
};

const agents: Agent[] = [
  {
    id: 1,
    name: "Atlas",
    initials: "AT",
    color: "bg-blue-600",
    role: "Implementation",
    status: "Running",
    task: "Implement retry policy for failed webhooks",
    issue: "ENG-482",
    repo: "northstar/platform-api",
    branch: "feat/webhook-retries",
    elapsed: "42m 18s",
    elapsedMinutes: 42,
    tokens: 38540,
    tokenLabel: "38.5k",
    tokenLimit: 60000,
    activity: "Running integration tests",
    activityType: "test",
  },
  {
    id: 2,
    name: "Sage",
    initials: "SG",
    color: "bg-emerald-600",
    role: "Code review",
    status: "Reviewing",
    task: "Review tenant isolation changes",
    issue: "SEC-219",
    repo: "northstar/auth-service",
    branch: "fix/tenant-boundaries",
    elapsed: "18m 06s",
    elapsedMinutes: 18,
    tokens: 14280,
    tokenLabel: "14.2k",
    tokenLimit: 50000,
    activity: "Left 2 review comments",
    activityType: "pull",
  },
  {
    id: 3,
    name: "Nova",
    initials: "NV",
    color: "bg-violet-600",
    role: "Implementation",
    status: "Running",
    task: "Add invoice export to billing portal",
    issue: "BILL-307",
    repo: "northstar/customer-web",
    branch: "feat/invoice-export",
    elapsed: "1h 24m",
    elapsedMinutes: 84,
    tokens: 52190,
    tokenLabel: "52.1k",
    tokenLimit: 70000,
    activity: "Committed export dialog",
    activityType: "commit",
  },
  {
    id: 4,
    name: "Rune",
    initials: "RN",
    color: "bg-amber-600",
    role: "Investigation",
    status: "Waiting",
    task: "Diagnose elevated queue latency",
    issue: "OPS-144",
    repo: "northstar/event-worker",
    branch: "investigate/queue-latency",
    elapsed: "27m 51s",
    elapsedMinutes: 27,
    tokens: 22140,
    tokenLabel: "22.1k",
    tokenLimit: 50000,
    activity: "Awaiting CI environment",
    activityType: "thinking",
  },
  {
    id: 5,
    name: "Echo",
    initials: "EC",
    color: "bg-rose-600",
    role: "Implementation",
    status: "Running",
    task: "Migrate search indexing job to v3",
    issue: "DATA-918",
    repo: "northstar/search-indexer",
    branch: "chore/indexer-v3",
    elapsed: "56m 32s",
    elapsedMinutes: 56,
    tokens: 41670,
    tokenLabel: "41.6k",
    tokenLimit: 60000,
    activity: "Updating migration fixture",
    activityType: "commit",
  },
];

const events = [
  { agent: "Atlas", color: "bg-blue-600", text: "Integration test suite passed", detail: "platform-api · 184 tests", time: "1m", icon: CheckCircle2 },
  { agent: "Nova", color: "bg-violet-600", text: "Pushed 3 commits", detail: "feat/invoice-export", time: "4m", icon: GitBranch },
  { agent: "Sage", color: "bg-emerald-600", text: "Requested changes on PR #284", detail: "auth-service", time: "7m", icon: GitPullRequest },
  { agent: "Echo", color: "bg-rose-600", text: "Completed task step", detail: "Backfill migration fixture", time: "11m", icon: Check },
  { agent: "Rune", color: "bg-amber-600", text: "Waiting for CI environment", detail: "Queue latency investigation", time: "16m", icon: Clock3 },
];

const statusStyles: Record<AgentStatus, string> = {
  Running: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Reviewing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Waiting: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

export const App = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | AgentStatus>("All");
  const [sortBy, setSortBy] = useState<"elapsed" | "tokens">("elapsed");
  const [pausedAgents, setPausedAgents] = useState<number[]>([]);
  const [tab, setTab] = useState<"Overview" | "Activity">("Overview");

  const visibleAgents = useMemo(
    () =>
      agents
        .filter((agent) => status === "All" || agent.status === status)
        .filter((agent) =>
          `${agent.name} ${agent.task} ${agent.repo} ${agent.issue}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .sort((a, b) => (sortBy === "elapsed" ? b.elapsedMinutes - a.elapsedMinutes : b.tokens - a.tokens)),
    [query, sortBy, status],
  );

  const togglePause = (id: number) =>
    setPausedAgents((current) =>
      current.includes(id) ? current.filter((agentId) => agentId !== id) : [...current, id],
    );

  return (
    <div data-sparkta-starter="ready" className="min-h-screen bg-[#f5f7f8] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[236px] border-r border-slate-200 bg-slate-950 text-slate-300 lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <div className="flex size-8 items-center justify-center rounded-md bg-blue-500 text-white">
            <Command className="size-4" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">Relay Control</span>
        </div>
        <nav className="flex-1 px-3 py-5 text-sm" aria-label="Primary navigation">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Workspace</p>
          <button className="nav-item nav-item-active" type="button">
            <LayoutDashboard className="size-4" /> Overview
          </button>
          <button className="nav-item" type="button">
            <Users className="size-4" /> Agents
            <span className="ml-auto rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">5</span>
          </button>
          <button className="nav-item" type="button">
            <GitPullRequest className="size-4" /> Pull requests
            <span className="ml-auto rounded bg-blue-500/15 px-1.5 py-0.5 text-[10px] text-blue-300">3</span>
          </button>
          <button className="nav-item" type="button">
            <Activity className="size-4" /> Activity
          </button>
          <p className="mt-7 px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Manage</p>
          <button className="nav-item" type="button">
            <TerminalSquare className="size-4" /> Repositories
          </button>
          <button className="nav-item" type="button">
            <Settings className="size-4" /> Settings
          </button>
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="rounded-md bg-white/[0.04] p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200">Monthly tokens</span>
              <span className="text-slate-400">68%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[68%] rounded-full bg-blue-500" />
            </div>
            <p className="mt-2 text-[11px] text-slate-500">2.04M of 3M used</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[236px]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-md bg-slate-950 text-white lg:hidden">
              <Command className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Delivery operations</p>
              <p className="hidden text-xs text-slate-500 sm:block">Production workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </div>
            <button className="icon-button relative" aria-label="Notifications" type="button">
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
            </button>
            <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">MK</div>
          </div>
        </header>

        <main className="mx-auto max-w-[1480px] p-4 md:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>Workspace</span><span>/</span><span>Overview</span>
              </div>
              <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">Autonomous delivery</h1>
              <p className="mt-1 text-sm text-slate-500">Monitor live agent work across your engineering organization.</p>
            </div>
            <button className="flex h-9 items-center justify-center gap-2 rounded-md bg-slate-950 px-3.5 text-xs font-semibold text-white transition hover:bg-slate-800" type="button">
              <Bot className="size-4" /> Dispatch agent
            </button>
          </div>

          <section className="mt-6 grid grid-cols-2 border border-slate-200 bg-white md:grid-cols-4" aria-label="Delivery summary">
            {[
              { label: "Active agents", value: "5", detail: "3 running", icon: Bot, accent: "text-blue-600" },
              { label: "Tasks today", value: "18", detail: "12 completed", icon: CheckCircle2, accent: "text-emerald-600" },
              { label: "Open pull requests", value: "3", detail: "1 awaiting review", icon: GitPullRequest, accent: "text-violet-600" },
              { label: "Tokens today", value: "168.8k", detail: "−8.4% vs yesterday", icon: Zap, accent: "text-amber-600" },
            ].map((metric, index) => (
              <div className={`p-4 md:p-5 ${index % 2 !== 0 ? "border-l border-slate-200" : ""} ${index > 1 ? "border-t border-slate-200 md:border-t-0" : ""} ${index === 2 ? "md:border-l" : ""}`} key={metric.label}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500">{metric.label}</p>
                  <metric.icon className={`size-4 ${metric.accent}`} />
                </div>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{metric.value}</p>
                <p className="mt-1 text-[11px] text-slate-500">{metric.detail}</p>
              </div>
            ))}
          </section>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section className="min-w-0 border border-slate-200 bg-white">
              <div className="flex flex-col gap-3 border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    {(["Overview", "Activity"] as const).map((item) => (
                      <button
                        className={`relative pb-1 text-sm font-medium ${tab === item ? "text-slate-950" : "text-slate-500 hover:text-slate-800"}`}
                        key={item}
                        onClick={() => setTab(item)}
                        type="button"
                      >
                        {item}
                        {tab === item && <span className="absolute -bottom-[13px] inset-x-0 h-0.5 bg-blue-600" />}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">Updated just now</p>
                </div>
                <div className="flex flex-col gap-2 pt-2 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      aria-label="Search agents"
                      className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-9 text-xs outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search agents, tasks, or repositories"
                      value={query}
                    />
                    {query && (
                      <button aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700" onClick={() => setQuery("")} type="button">
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>
                  <label className="relative">
                    <ListFilter className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
                    <select className="h-9 appearance-none rounded-md border border-slate-200 bg-white pl-8 pr-8 text-xs font-medium outline-none focus:border-blue-500" onChange={(event) => setStatus(event.target.value as typeof status)} value={status}>
                      <option>All</option><option>Running</option><option>Reviewing</option><option>Waiting</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                  </label>
                  <button className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50" onClick={() => setSortBy((value) => value === "elapsed" ? "tokens" : "elapsed")} type="button">
                    Sort: {sortBy === "elapsed" ? "Elapsed" : "Tokens"} <ChevronDown className="size-3.5" />
                  </button>
                </div>
              </div>

              {tab === "Overview" ? (
                <div>
                  <div className="hidden grid-cols-[minmax(230px,1.5fr)_minmax(170px,1fr)_90px_130px_40px] gap-4 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 md:grid">
                    <span>Agent / current task</span><span>Repository</span><span>Elapsed</span><span>Tokens</span><span />
                  </div>
                  {visibleAgents.length > 0 ? visibleAgents.map((agent) => {
                    const isPaused = pausedAgents.includes(agent.id);
                    return (
                      <article className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[minmax(230px,1.5fr)_minmax(170px,1fr)_90px_130px_40px] md:items-center" key={agent.id}>
                        <div className="flex min-w-0 gap-3">
                          <div className={`relative flex size-9 shrink-0 items-center justify-center rounded-md text-[11px] font-bold text-white ${agent.color}`}>
                            {agent.initials}
                            <span className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white ${isPaused ? "bg-slate-400" : agent.status === "Waiting" ? "bg-amber-400" : "bg-emerald-500"}`} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold">{agent.name}</span>
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${isPaused ? "bg-slate-100 text-slate-600 ring-slate-500/20" : statusStyles[agent.status]}`}>
                                {isPaused ? "Paused" : agent.status}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-xs font-medium text-slate-700">{agent.task}</p>
                            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                              <span>{agent.issue}</span><span>·</span>
                              {agent.activityType === "test" ? <CircleDot className="size-3" /> : <GitBranch className="size-3" />}
                              <span className="truncate">{isPaused ? "Execution paused" : agent.activity}</span>
                            </p>
                          </div>
                        </div>
                        <div className="min-w-0 pl-12 md:pl-0">
                          <p className="truncate text-xs font-medium text-slate-700">{agent.repo}</p>
                          <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-slate-400"><GitBranch className="size-3 shrink-0" /> {agent.branch}</p>
                        </div>
                        <div className="pl-12 md:pl-0">
                          <p className="font-mono text-xs font-medium text-slate-700">{agent.elapsed}</p>
                          <p className="mt-1 text-[10px] text-slate-400">{agent.role}</p>
                        </div>
                        <div className="pl-12 md:pl-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-medium">{agent.tokenLabel}</span>
                            <span className="text-[10px] text-slate-400">{Math.round(agent.tokens / agent.tokenLimit * 100)}%</span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div className={`h-full rounded-full ${agent.tokens / agent.tokenLimit > 0.7 ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: `${agent.tokens / agent.tokenLimit * 100}%` }} />
                          </div>
                        </div>
                        <button className="icon-button ml-10 md:ml-0" aria-label={`${isPaused ? "Resume" : "Pause"} ${agent.name}`} onClick={() => togglePause(agent.id)} title={`${isPaused ? "Resume" : "Pause"} ${agent.name}`} type="button">
                          {isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                        </button>
                      </article>
                    );
                  }) : (
                    <div className="flex flex-col items-center px-6 py-16 text-center">
                      <Search className="size-6 text-slate-300" />
                      <p className="mt-3 text-sm font-semibold">No agents found</p>
                      <p className="mt-1 text-xs text-slate-500">Try a different search or status filter.</p>
                      <button className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700" onClick={() => { setQuery(""); setStatus("All"); }} type="button">Clear filters</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {events.map((event) => <ActivityRow event={event} key={`${event.agent}-${event.time}`} />)}
                </div>
              )}
            </section>

            <aside className="space-y-6">
              <section className="border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5">
                  <h2 className="text-sm font-semibold">Recent activity</h2>
                  <button aria-label="More activity options" className="text-slate-400 hover:text-slate-700" type="button"><MoreHorizontal className="size-4" /></button>
                </div>
                <div>{events.map((event) => <ActivityRow compact event={event} key={`${event.agent}-${event.detail}`} />)}</div>
                <button className="w-full border-t border-slate-100 py-3 text-xs font-semibold text-blue-600 hover:bg-slate-50" onClick={() => setTab("Activity")} type="button">View all activity</button>
              </section>

              <section className="border border-slate-200 bg-slate-950 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold">Delivery velocity</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Completed tasks · last 7 days</p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400"><Activity className="size-3" /> +12%</span>
                </div>
                <div className="mt-5 flex h-24 items-end gap-2" aria-label="Task completion chart">
                  {[42, 58, 37, 70, 54, 82, 94].map((height, index) => (
                    <div className="flex h-full flex-1 items-end" key={index}>
                      <div className={`w-full rounded-t-sm ${index === 6 ? "bg-blue-400" : "bg-slate-700"}`} style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-slate-500">
                  {["W", "T", "F", "S", "S", "M", "T"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

const ActivityRow = ({ event, compact = false }: { event: (typeof events)[number]; compact?: boolean }) => {
  const Icon = event.icon;
  return (
    <div className={`flex gap-3 ${compact ? "px-4 py-3.5" : "px-5 py-4"}`}>
      <div className="relative mt-0.5">
        <div className={`flex size-7 items-center justify-center rounded-md text-[9px] font-bold text-white ${event.color}`}>{event.agent.slice(0, 2).toUpperCase()}</div>
        <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-slate-600"><Icon className="size-2.5" /></span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-xs font-medium text-slate-700"><span className="font-semibold text-slate-950">{event.agent}</span> · {event.text}</p>
          <span className="shrink-0 text-[10px] text-slate-400">{event.time}</span>
        </div>
        <p className="mt-1 truncate text-[11px] text-slate-400">{event.detail}</p>
      </div>
    </div>
  );
};
