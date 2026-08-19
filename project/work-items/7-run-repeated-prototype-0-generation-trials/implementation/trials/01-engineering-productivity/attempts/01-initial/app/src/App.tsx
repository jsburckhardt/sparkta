import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Code2,
  GitPullRequest,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Repository = {
  name: string;
  team: string;
  language: string;
  prs: number;
  cycle: number;
  deploys: number;
  success: number;
  trend: number;
  status: "On track" | "Watch" | "At risk";
};

const repositoryData: Repository[] = [
  { name: "checkout-service", team: "Commerce", language: "TypeScript", prs: 84, cycle: 18.2, deploys: 31, success: 98.7, trend: 12, status: "On track" },
  { name: "merchant-portal", team: "Commerce", language: "TypeScript", prs: 67, cycle: 23.6, deploys: 24, success: 97.9, trend: 8, status: "On track" },
  { name: "identity-platform", team: "Core Platform", language: "Go", prs: 59, cycle: 29.4, deploys: 18, success: 96.2, trend: -4, status: "Watch" },
  { name: "data-pipelines", team: "Data", language: "Python", prs: 46, cycle: 38.1, deploys: 12, success: 93.8, trend: -9, status: "At risk" },
  { name: "mobile-app", team: "Consumer", language: "Kotlin", prs: 72, cycle: 26.8, deploys: 16, success: 98.1, trend: 5, status: "On track" },
  { name: "design-system", team: "Experience", language: "TypeScript", prs: 38, cycle: 20.4, deploys: 22, success: 99.1, trend: 14, status: "On track" },
];

const trendData = [
  { week: "Jun 3", prs: 72, cycle: 31.2 },
  { week: "Jun 10", prs: 78, cycle: 29.8 },
  { week: "Jun 17", prs: 76, cycle: 30.4 },
  { week: "Jun 24", prs: 91, cycle: 27.3 },
  { week: "Jul 1", prs: 88, cycle: 26.1 },
  { week: "Jul 8", prs: 96, cycle: 24.8 },
  { week: "Jul 15", prs: 103, cycle: 24.2 },
  { week: "Jul 22", prs: 112, cycle: 22.6 },
];

const allocationData = [
  { name: "Features", value: 48, color: "#2563eb" },
  { name: "Reliability", value: 24, color: "#14b8a6" },
  { name: "Tech debt", value: 17, color: "#f59e0b" },
  { name: "Unplanned", value: 11, color: "#94a3b8" },
];

const teamData = [
  { name: "Commerce", score: 91, change: 8 },
  { name: "Experience", score: 87, change: 12 },
  { name: "Consumer", score: 82, change: 4 },
  { name: "Core Platform", score: 75, change: -2 },
  { name: "Data", score: 66, change: -7 },
];

const statusStyles = {
  "On track": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Watch: "bg-amber-50 text-amber-700 ring-amber-600/20",
  "At risk": "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const Metric = ({
  label,
  value,
  change,
  detail,
  icon,
  inverse = false,
}: {
  label: string;
  value: string;
  change: number;
  detail: string;
  icon: React.ReactNode;
  inverse?: boolean;
}) => {
  const positive = inverse ? change < 0 : change > 0;
  return (
    <article className="metric-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-[28px] font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
        <span className="rounded-lg bg-slate-50 p-2 text-slate-500 ring-1 ring-slate-200">{icon}</span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className={`inline-flex items-center gap-0.5 font-semibold ${positive ? "text-emerald-600" : "text-rose-600"}`}>
          {change > 0 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
          {Math.abs(change)}%
        </span>
        <span className="text-slate-400">{detail}</span>
      </div>
    </article>
  );
};

export const App = () => {
  const [activeView, setActiveView] = useState("Overview");
  const [period, setPeriod] = useState("Last 8 weeks");
  const [team, setTeam] = useState("All teams");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"prs" | "cycle" | "success">("prs");
  const [mobileNav, setMobileNav] = useState(false);

  const repositories = useMemo(
    () =>
      repositoryData
        .filter((repo) => team === "All teams" || repo.team === team)
        .filter((repo) => `${repo.name} ${repo.team} ${repo.language}`.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => (sortKey === "cycle" ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey])),
    [query, sortKey, team],
  );

  const navItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Repositories", icon: Code2 },
    { label: "Teams", icon: Users },
    { label: "Quality", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-white"><Activity className="size-4" /></span>
            <span className="text-[15px] font-semibold tracking-tight text-white">Buildwise</span>
          </div>
          <button className="text-slate-400 lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X className="size-5" /></button>
        </div>
        <nav className="px-3 py-5" aria-label="Primary navigation">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Workspace</p>
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => { setActiveView(label); setMobileNav(false); }} className={`nav-item ${activeView === label ? "nav-item-active" : ""}`}>
              <Icon className="size-[18px]" /> {label}
            </button>
          ))}
          <p className="mt-7 px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Manage</p>
          <button className="nav-item"><Boxes className="size-[18px]" /> Integrations</button>
          <button className="nav-item"><Settings className="size-[18px]" /> Settings</button>
        </nav>
        <div className="absolute inset-x-3 bottom-4 rounded-lg border border-slate-700 bg-slate-800/60 p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200"><Sparkles className="size-4 text-blue-400" /> Weekly insight</div>
          <p className="mt-2 text-[11px] leading-4 text-slate-400">Review time improved 14% after the ownership rules rollout.</p>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3">
            <button className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu className="size-5" /></button>
            <div>
              <p className="text-sm font-semibold text-slate-900">Engineering</p>
              <p className="hidden text-[11px] text-slate-400 sm:block">Executive performance workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="icon-button" aria-label="Help"><CircleHelp className="size-[18px]" /></button>
            <button className="icon-button relative" aria-label="Notifications"><Bell className="size-[18px]" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-blue-600 ring-2 ring-white" /></button>
            <div className="ml-1 flex items-center gap-2 border-l border-slate-200 pl-3">
              <span className="grid size-8 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">MC</span>
              <div className="hidden sm:block"><p className="text-xs font-semibold">Maya Chen</p><p className="text-[10px] text-slate-400">VP Engineering</p></div>
              <ChevronDown className="hidden size-3.5 text-slate-400 sm:block" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-6 md:px-7 md:py-7">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-xs font-medium text-blue-600">ENGINEERING INTELLIGENCE</p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{activeView}</h1>
              <p className="mt-1 text-sm text-slate-500">Delivery health and developer flow across 6 repositories.</p>
            </div>
            <div className="flex gap-2">
              <label className="select-wrap">
                <span className="sr-only">Team</span>
                <select value={team} onChange={(event) => setTeam(event.target.value)}>
                  {["All teams", ...Array.from(new Set(repositoryData.map((repo) => repo.team)))].map((name) => <option key={name}>{name}</option>)}
                </select>
              </label>
              <label className="select-wrap">
                <span className="sr-only">Time period</span>
                <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                  <option>Last 8 weeks</option><option>Last quarter</option><option>Year to date</option>
                </select>
              </label>
            </div>
          </div>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key performance indicators">
            <Metric label="PRs merged" value={period === "Last 8 weeks" ? "716" : period === "Last quarter" ? "1,084" : "2,941"} change={12.4} detail="vs prior period" icon={<GitPullRequest className="size-[18px]" />} />
            <Metric label="Median cycle time" value="22.6h" change={-16.8} detail="6.1h faster" inverse icon={<Clock3 className="size-[18px]" />} />
            <Metric label="Deployment frequency" value="4.8/day" change={8.2} detail="across portfolio" icon={<Activity className="size-[18px]" />} />
            <Metric label="Change success rate" value="97.4%" change={1.3} detail="target 97%" icon={<ShieldCheck className="size-[18px]" />} />
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(310px,0.75fr)]">
            <article className="panel">
              <div className="panel-header">
                <div><h2>Delivery momentum</h2><p>Merged pull requests and median cycle time</p></div>
                <div className="flex items-center gap-4 text-[11px] text-slate-500"><span className="legend-dot before:bg-blue-600">PRs merged</span><span className="legend-dot before:bg-teal-500">Cycle time</span></div>
              </div>
              <div className="h-[272px] px-2 pb-3 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 8, right: 14, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="prsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} /><stop offset="100%" stopColor="#2563eb" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e8edf4" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} dy={8} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[18, 34]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 8, boxShadow: "0 6px 20px rgba(15,23,42,.08)", fontSize: 12 }} />
                    <Area yAxisId="left" type="monotone" dataKey="prs" stroke="#2563eb" strokeWidth={2.5} fill="url(#prsFill)" name="PRs merged" />
                    <Area yAxisId="right" type="monotone" dataKey="cycle" stroke="#14b8a6" strokeWidth={2} fill="transparent" strokeDasharray="4 3" name="Cycle time (h)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="panel">
              <div className="panel-header"><div><h2>Investment mix</h2><p>Share of engineering effort</p></div><button className="text-xs font-medium text-blue-600 hover:text-blue-700">Details</button></div>
              <div className="h-[185px] px-4 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allocationData} layout="vertical" margin={{ left: 4, right: 12 }}>
                    <XAxis type="number" hide domain={[0, 55]} /><YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={72} tick={{ fill: "#64748b", fontSize: 11 }} />
                    <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={10}>{allocationData.map((item) => <Cell key={item.name} fill={item.color} />)}</Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mx-5 mb-5 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-800">
                <Clock3 className="mt-0.5 size-4 shrink-0" /><span>Unplanned work is <strong>2 pts above</strong> the quarterly target.</span>
              </div>
            </article>
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(310px,0.75fr)]">
            <article className="panel overflow-hidden">
              <div className="panel-header flex-wrap gap-3">
                <div><h2>Repository performance</h2><p>{repositories.length} repositories in current view</p></div>
                <div className="flex gap-2">
                  <label className="search-field"><Search className="size-3.5" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search repositories" /></label>
                  <label className="select-wrap compact"><span className="sr-only">Sort repositories</span><select value={sortKey} onChange={(event) => setSortKey(event.target.value as typeof sortKey)}><option value="prs">PR volume</option><option value="cycle">Cycle time</option><option value="success">Success rate</option></select></label>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table>
                  <thead><tr><th>Repository</th><th>PRs merged</th><th>Cycle time</th><th>Deploys</th><th>Success</th><th>Status</th></tr></thead>
                  <tbody>
                    {repositories.map((repo) => (
                      <tr key={repo.name}>
                        <td><div className="flex items-center gap-3"><span className="repo-icon"><Code2 className="size-3.5" /></span><div><p className="font-medium text-slate-800">{repo.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{repo.team} · {repo.language}</p></div></div></td>
                        <td><span className="font-medium text-slate-700">{repo.prs}</span><span className={`ml-2 text-[10px] ${repo.trend > 0 ? "text-emerald-600" : "text-rose-600"}`}>{repo.trend > 0 ? "+" : ""}{repo.trend}%</span></td>
                        <td>{repo.cycle}h</td><td>{repo.deploys}</td><td>{repo.success}%</td>
                        <td><span className={`status ${statusStyles[repo.status]}`}><span className="size-1.5 rounded-full bg-current" />{repo.status}</span></td>
                      </tr>
                    ))}
                    {repositories.length === 0 && <tr><td colSpan={6}><div className="py-10 text-center text-sm text-slate-400">No repositories match your filters.</div></td></tr>}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="panel">
              <div className="panel-header"><div><h2>Team health</h2><p>Composite flow score</p></div><span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">Portfolio 81</span></div>
              <div className="space-y-4 p-5">
                {teamData.map((item, index) => (
                  <div key={item.name}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded bg-slate-100 text-[10px] font-semibold text-slate-500">{index + 1}</span><span className="font-medium text-slate-700">{item.name}</span></div>
                      <div><strong className="text-slate-800">{item.score}</strong><span className={`ml-2 text-[10px] ${item.change > 0 ? "text-emerald-600" : "text-rose-600"}`}>{item.change > 0 ? "+" : ""}{item.change}</span></div>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${item.score > 80 ? "bg-blue-600" : item.score > 70 ? "bg-teal-500" : "bg-amber-500"}`} style={{ width: `${item.score}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="mx-5 mb-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs"><span className="flex items-center gap-1.5 text-slate-500"><Check className="size-3.5 text-emerald-600" />4 of 5 teams improving</span><button className="font-medium text-blue-600">View teams</button></div>
            </article>
          </section>
          <p className="mt-5 text-center text-[10px] text-slate-400">Updated 12 minutes ago · Data from GitHub, Linear, and Buildkite</p>
        </main>
      </div>
      {mobileNav && <button className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation overlay" />}
    </div>
  );
};
