import { FormEvent, useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowUpDown,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  MoreHorizontal,
  Package,
  Pencil,
  Phone,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

type Status = "Active" | "At risk" | "Inactive";
type Tier = "Enterprise" | "Growth" | "Starter";
type Tab = "Overview" | "Orders" | "Invoices" | "Activity";

type Order = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: "Fulfilled" | "Processing" | "Cancelled";
};

type Invoice = {
  id: string;
  issued: string;
  due: string;
  amount: number;
  status: "Paid" | "Open" | "Overdue";
};

type HistoryItem = {
  title: string;
  detail: string;
  time: string;
  kind: "order" | "invoice" | "customer" | "note";
};

type Customer = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: Status;
  tier: Tier;
  joined: string;
  spent: number;
  orders: Order[];
  invoices: Invoice[];
  history: HistoryItem[];
  notes: string;
};

const customersSeed: Customer[] = [
  {
    id: 1,
    name: "Maya Chen",
    company: "Northstar Labs",
    email: "maya@northstarlabs.co",
    phone: "+1 415 555 0182",
    location: "San Francisco, CA",
    status: "Active",
    tier: "Enterprise",
    joined: "2024-02-12",
    spent: 48620,
    notes: "Expanding their design team this quarter. Prefers email for renewals.",
    orders: [
      { id: "ORD-1048", date: "Aug 14, 2026", items: 6, total: 4890, status: "Fulfilled" },
      { id: "ORD-0982", date: "Jun 26, 2026", items: 3, total: 2240, status: "Fulfilled" },
      { id: "ORD-0911", date: "Apr 03, 2026", items: 8, total: 6120, status: "Fulfilled" },
    ],
    invoices: [
      { id: "INV-2084", issued: "Aug 14, 2026", due: "Sep 13, 2026", amount: 4890, status: "Open" },
      { id: "INV-1941", issued: "Jun 26, 2026", due: "Jul 26, 2026", amount: 2240, status: "Paid" },
      { id: "INV-1818", issued: "Apr 03, 2026", due: "May 03, 2026", amount: 6120, status: "Paid" },
    ],
    history: [
      { title: "Order ORD-1048 fulfilled", detail: "6 items shipped to San Francisco", time: "4 days ago", kind: "order" },
      { title: "Invoice INV-2084 created", detail: "$4,890 due September 13", time: "4 days ago", kind: "invoice" },
      { title: "Customer details updated", detail: "Phone number and billing address changed", time: "Jul 29", kind: "customer" },
      { title: "Account note added", detail: "Renewal planning call completed with Maya", time: "Jul 12", kind: "note" },
    ],
  },
  {
    id: 2,
    name: "Jon Bell",
    company: "Cedar & Co.",
    email: "jon@cedarandco.com",
    phone: "+1 503 555 0144",
    location: "Portland, OR",
    status: "Active",
    tier: "Growth",
    joined: "2024-06-28",
    spent: 24180,
    notes: "Seasonal purchasing peaks in October and November.",
    orders: [{ id: "ORD-1039", date: "Aug 08, 2026", items: 4, total: 1860, status: "Processing" }],
    invoices: [{ id: "INV-2071", issued: "Aug 08, 2026", due: "Sep 07, 2026", amount: 1860, status: "Open" }],
    history: [
      { title: "Order ORD-1039 placed", detail: "4 items are being prepared", time: "Aug 8", kind: "order" },
      { title: "Invoice INV-2071 sent", detail: "$1,860 due September 7", time: "Aug 8", kind: "invoice" },
    ],
  },
  {
    id: 3,
    name: "Sofia Marin",
    company: "Atelier Forma",
    email: "sofia@atelierforma.es",
    phone: "+34 91 555 0241",
    location: "Madrid, Spain",
    status: "At risk",
    tier: "Enterprise",
    joined: "2023-11-06",
    spent: 71940,
    notes: "Invoice follow-up required. Account review scheduled for August 22.",
    orders: [{ id: "ORD-0964", date: "May 19, 2026", items: 12, total: 9350, status: "Fulfilled" }],
    invoices: [{ id: "INV-1902", issued: "May 19, 2026", due: "Jun 18, 2026", amount: 9350, status: "Overdue" }],
    history: [
      { title: "Invoice INV-1902 overdue", detail: "Payment is 61 days past due", time: "Today", kind: "invoice" },
      { title: "Account flagged at risk", detail: "Payment follow-up assigned to Olivia", time: "Aug 12", kind: "customer" },
    ],
  },
  {
    id: 4,
    name: "Elijah Brooks",
    company: "Fieldwork Supply",
    email: "elijah@fieldworksupply.com",
    phone: "+1 512 555 0168",
    location: "Austin, TX",
    status: "Active",
    tier: "Growth",
    joined: "2025-01-18",
    spent: 18960,
    notes: "Interested in annual volume pricing.",
    orders: [{ id: "ORD-1051", date: "Aug 16, 2026", items: 2, total: 1280, status: "Processing" }],
    invoices: [{ id: "INV-2087", issued: "Aug 16, 2026", due: "Sep 15, 2026", amount: 1280, status: "Open" }],
    history: [{ title: "Order ORD-1051 placed", detail: "2 items are being prepared", time: "2 days ago", kind: "order" }],
  },
  {
    id: 5,
    name: "Amara Okafor",
    company: "Morrow Health",
    email: "amara@morrowhealth.com",
    phone: "+44 20 7946 0281",
    location: "London, UK",
    status: "Active",
    tier: "Enterprise",
    joined: "2023-08-22",
    spent: 96340,
    notes: "Strategic account. Procurement review begins in September.",
    orders: [{ id: "ORD-1022", date: "Jul 24, 2026", items: 18, total: 12780, status: "Fulfilled" }],
    invoices: [{ id: "INV-2034", issued: "Jul 24, 2026", due: "Aug 23, 2026", amount: 12780, status: "Paid" }],
    history: [{ title: "Payment received", detail: "Invoice INV-2034 paid in full", time: "Aug 2", kind: "invoice" }],
  },
  {
    id: 6,
    name: "Theo Laurent",
    company: "Lumen Studios",
    email: "theo@lumenstudios.fr",
    phone: "+33 1 55 55 0147",
    location: "Paris, France",
    status: "Inactive",
    tier: "Starter",
    joined: "2025-03-10",
    spent: 4380,
    notes: "Paused purchasing after studio relocation.",
    orders: [{ id: "ORD-0721", date: "Nov 11, 2025", items: 2, total: 940, status: "Fulfilled" }],
    invoices: [{ id: "INV-1518", issued: "Nov 11, 2025", due: "Dec 11, 2025", amount: 940, status: "Paid" }],
    history: [{ title: "Account marked inactive", detail: "No activity in 180 days", time: "May 10", kind: "customer" }],
  },
  {
    id: 7,
    name: "Priya Shah",
    company: "Brightline Robotics",
    email: "priya@brightlinerobotics.ai",
    phone: "+1 617 555 0199",
    location: "Boston, MA",
    status: "Active",
    tier: "Growth",
    joined: "2025-05-02",
    spent: 32750,
    notes: "Fast-growing account; evaluating Enterprise tier.",
    orders: [{ id: "ORD-1044", date: "Aug 12, 2026", items: 7, total: 5310, status: "Fulfilled" }],
    invoices: [{ id: "INV-2079", issued: "Aug 12, 2026", due: "Sep 11, 2026", amount: 5310, status: "Open" }],
    history: [{ title: "Order ORD-1044 fulfilled", detail: "7 items delivered", time: "Aug 15", kind: "order" }],
  },
  {
    id: 8,
    name: "Noah Williams",
    company: "Common Ground Cafe",
    email: "noah@commonground.cafe",
    phone: "+1 312 555 0173",
    location: "Chicago, IL",
    status: "At risk",
    tier: "Starter",
    joined: "2024-09-14",
    spent: 6920,
    notes: "Two support requests unresolved; follow up before renewal.",
    orders: [{ id: "ORD-1005", date: "Jul 02, 2026", items: 3, total: 780, status: "Cancelled" }],
    invoices: [],
    history: [{ title: "Order ORD-1005 cancelled", detail: "Customer requested cancellation", time: "Jul 3", kind: "order" }],
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

const avatarColors = ["#dbeafe", "#fef3c7", "#dcfce7", "#fce7f3", "#ede9fe", "#ffedd5"];
const statusClass = (value: string) => `pill pill-${value.toLowerCase().replace(" ", "-")}`;

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Customers", icon: Users },
  { label: "Orders", icon: ShoppingBag },
  { label: "Invoices", icon: FileText },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">N</div>
          <span>Northwind</span>
          <button className="mobile-close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${label === "Customers" ? "active" : ""}`}>
              <Icon size={18} /> {label}
              {label === "Invoices" && <span className="nav-badge">3</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><Settings size={18} /> Settings</button>
          <div className="user-chip">
            <div className="avatar small">OR</div>
            <div><strong>Olivia Reed</strong><span>Account manager</span></div>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>
    </>
  );
}

function CustomerForm({
  customer,
  onClose,
  onSave,
}: {
  customer?: Customer;
  onClose: () => void;
  onSave: (values: Pick<Customer, "name" | "company" | "email" | "phone" | "location" | "status" | "tier">) => void;
}) {
  type FormValues = Pick<Customer, "name" | "company" | "email" | "phone" | "location" | "status" | "tier">;
  const [values, setValues] = useState<FormValues>({
    name: customer?.name ?? "",
    company: customer?.company ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
    location: customer?.location ?? "",
    status: customer?.status ?? ("Active" as Status),
    tier: customer?.tier ?? ("Starter" as Tier),
  });

  const update = <K extends keyof FormValues>(field: K, value: FormValues[K]) =>
    setValues((current) => ({ ...current, [field]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSave(values);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <form className="modal" onSubmit={submit}>
        <div className="modal-header">
          <div>
            <h2>{customer ? "Edit customer" : "Create customer"}</h2>
            <p>{customer ? "Update account and contact information." : "Add a new customer to your workspace."}</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="form-grid">
          <label className="full">Full name<input required value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Lena Ortiz" /></label>
          <label className="full">Company<input required value={values.company} onChange={(e) => update("company", e.target.value)} placeholder="e.g. Atlas Works" /></label>
          <label className="full">Email address<input required type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="name@company.com" /></label>
          <label>Phone<input required value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 555 000 0000" /></label>
          <label>Location<input required value={values.location} onChange={(e) => update("location", e.target.value)} placeholder="City, region" /></label>
          <label>Status<select value={values.status} onChange={(e) => update("status", e.target.value as Status)}><option>Active</option><option>At risk</option><option>Inactive</option></select></label>
          <label>Customer tier<select value={values.tier} onChange={(e) => update("tier", e.target.value as Tier)}><option>Starter</option><option>Growth</option><option>Enterprise</option></select></label>
        </div>
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button primary"><Check size={16} /> {customer ? "Save changes" : "Create customer"}</button>
        </div>
      </form>
    </div>
  );
}

function DetailView({
  customer,
  onBack,
  onEdit,
}: {
  customer: Customer;
  onBack: () => void;
  onEdit: () => void;
}) {
  const [tab, setTab] = useState<Tab>("Overview");
  const openBalance = customer.invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  const latestOrder = customer.orders[0];

  return (
    <div className="detail-page">
      <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Back to customers</button>
      <div className="detail-heading">
        <div className="identity">
          <div className="avatar large" style={{ background: avatarColors[customer.id % avatarColors.length] }}>{initials(customer.name)}</div>
          <div>
            <div className="identity-title"><h1>{customer.name}</h1><span className={statusClass(customer.status)}>{customer.status}</span></div>
            <p>{customer.company} <span>•</span> Customer since {new Date(`${customer.joined}T00:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          </div>
        </div>
        <button className="button secondary" onClick={onEdit}><Pencil size={16} /> Edit customer</button>
      </div>

      <div className="tabs" role="tablist">
        {(["Overview", "Orders", "Invoices", "Activity"] as Tab[]).map((item) => (
          <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? "selected" : ""} onClick={() => setTab(item)}>
            {item}
            {item === "Orders" && <span>{customer.orders.length}</span>}
            {item === "Invoices" && <span>{customer.invoices.length}</span>}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <>
          <section className="metric-grid">
            <div className="metric"><div><span>Total spend</span><strong>{money(customer.spent)}</strong><small>Lifetime value</small></div><CircleDollarSign /></div>
            <div className="metric"><div><span>Total orders</span><strong>{customer.orders.length}</strong><small>{latestOrder ? `Last on ${latestOrder.date}` : "No orders yet"}</small></div><Package /></div>
            <div className="metric"><div><span>Open balance</span><strong>{money(openBalance)}</strong><small>{customer.invoices.filter((i) => i.status !== "Paid").length} unpaid invoices</small></div><FileText /></div>
          </section>
          <div className="overview-grid">
            <section className="panel">
              <div className="panel-title"><h2>Contact details</h2></div>
              <div className="contact-list">
                <div><Mail /><span><small>Email</small><a href={`mailto:${customer.email}`}>{customer.email}</a></span></div>
                <div><Phone /><span><small>Phone</small><strong>{customer.phone}</strong></span></div>
                <div><MapPin /><span><small>Location</small><strong>{customer.location}</strong></span></div>
                <div><Building2 /><span><small>Company</small><strong>{customer.company}</strong></span></div>
              </div>
            </section>
            <section className="panel">
              <div className="panel-title"><h2>Account</h2></div>
              <dl className="account-list">
                <div><dt>Customer tier</dt><dd>{customer.tier}</dd></div>
                <div><dt>Account status</dt><dd><span className={statusClass(customer.status)}>{customer.status}</span></dd></div>
                <div><dt>Account owner</dt><dd>Olivia Reed</dd></div>
                <div><dt>Customer ID</dt><dd>CUS-{String(customer.id).padStart(4, "0")}</dd></div>
              </dl>
            </section>
            <section className="panel notes-panel">
              <div className="panel-title"><h2>Internal notes</h2><button className="text-button"><Pencil size={14} /> Edit</button></div>
              <p>{customer.notes}</p>
            </section>
          </div>
        </>
      )}
      {tab === "Orders" && <RecordsTable kind="orders" customer={customer} />}
      {tab === "Invoices" && <RecordsTable kind="invoices" customer={customer} />}
      {tab === "Activity" && <ActivityHistory history={customer.history} />}
    </div>
  );
}

function RecordsTable({ kind, customer }: { kind: "orders" | "invoices"; customer: Customer }) {
  const records = kind === "orders" ? customer.orders : customer.invoices;
  return (
    <section className="panel records-panel">
      <div className="panel-title">
        <div><h2>{kind === "orders" ? "Order history" : "Invoices"}</h2><p>{records.length} records for {customer.name}</p></div>
        <button className="button primary"><Plus size={16} /> {kind === "orders" ? "New order" : "New invoice"}</button>
      </div>
      {records.length === 0 ? (
        <div className="empty-state"><FileText /><h3>No {kind} yet</h3><p>New records will appear here.</p></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr>{kind === "orders" ? <><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></> : <><th>Invoice</th><th>Issued</th><th>Due date</th><th>Amount</th><th>Status</th></>}<th /></tr></thead>
            <tbody>
              {records.map((record) => {
                const isOrder = "items" in record;
                return (
                  <tr key={record.id}>
                    <td><strong>{record.id}</strong></td>
                    <td>{isOrder ? record.date : record.issued}</td>
                    <td>{isOrder ? `${record.items} items` : record.due}</td>
                    <td><strong>{money(isOrder ? record.total : record.amount)}</strong></td>
                    <td><span className={statusClass(record.status)}>{record.status}</span></td>
                    <td><button className="icon-button" aria-label={`View ${record.id}`}><ChevronRight size={17} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function ActivityHistory({ history }: { history: HistoryItem[] }) {
  const icons = { order: Package, invoice: FileText, customer: Users, note: Activity };
  return (
    <section className="panel activity-panel">
      <div className="panel-title"><div><h2>Activity history</h2><p>Customer events and account changes</p></div></div>
      <div className="timeline">
        {history.map((item, index) => {
          const Icon = icons[item.kind];
          return (
            <div className="timeline-item" key={`${item.title}-${index}`}>
              <div className={`timeline-icon ${item.kind}`}><Icon size={16} /></div>
              <div><strong>{item.title}</strong><p>{item.detail}</p></div>
              <time>{item.time}</time>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const App = () => {
  const [customers, setCustomers] = useState(customersSeed);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [tier, setTier] = useState("All tiers");
  const [sort, setSort] = useState<"name" | "spent">("name");
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");

  const selected = customers.find((customer) => customer.id === selectedId);
  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return customers
      .filter((customer) => !query || [customer.name, customer.company, customer.email].some((value) => value.toLowerCase().includes(query)))
      .filter((customer) => status === "All statuses" || customer.status === status)
      .filter((customer) => tier === "All tiers" || customer.tier === tier)
      .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : b.spent - a.spent));
  }, [customers, search, status, tier, sort]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const saveCustomer = (values: Pick<Customer, "name" | "company" | "email" | "phone" | "location" | "status" | "tier">) => {
    if (formMode === "edit" && selected) {
      setCustomers((items) => items.map((item) =>
        item.id === selected.id
          ? { ...item, ...values, history: [{ title: "Customer details updated", detail: "Account information was edited", time: "Just now", kind: "customer" }, ...item.history] }
          : item
      ));
      notify("Customer details saved");
    } else {
      const nextId = Math.max(...customers.map((customer) => customer.id)) + 1;
      const newCustomer: Customer = {
        ...values,
        id: nextId,
        joined: new Date().toISOString().slice(0, 10),
        spent: 0,
        orders: [],
        invoices: [],
        notes: "No internal notes yet.",
        history: [{ title: "Customer created", detail: "Customer added to the workspace", time: "Just now", kind: "customer" }],
      };
      setCustomers((items) => [newCustomer, ...items]);
      notify(`${values.name} was added`);
    }
    setFormMode(null);
  };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="global-search"><Search size={17} /><span>Search anything</span><kbd>⌘ K</kbd></div>
          <button className="help-button">Help center</button>
        </header>

        {selected ? (
          <DetailView customer={selected} onBack={() => setSelectedId(null)} onEdit={() => setFormMode("edit")} />
        ) : (
          <div className="page">
            <div className="page-heading">
              <div><p className="eyebrow">Customer management</p><h1>Customers</h1><p>Manage relationships, orders, and account health.</p></div>
              <button className="button primary" onClick={() => setFormMode("create")}><Plus size={17} /> Create customer</button>
            </div>

            <section className="summary-strip">
              <div><Users /><span><small>Total customers</small><strong>{customers.length}</strong></span></div>
              <div><Activity /><span><small>Active accounts</small><strong>{customers.filter((c) => c.status === "Active").length}</strong></span></div>
              <div><Clock3 /><span><small>Needs attention</small><strong>{customers.filter((c) => c.status === "At risk").length}</strong></span></div>
              <div><CircleDollarSign /><span><small>Customer value</small><strong>{money(customers.reduce((sum, c) => sum + c.spent, 0))}</strong></span></div>
            </section>

            <section className="table-panel">
              <div className="toolbar">
                <div className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, company, or email…" />{search && <button onClick={() => setSearch("")}><X size={15} /></button>}</div>
                <div className="filters">
                  <label><span className="sr-only">Filter by status</span><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All statuses</option><option>Active</option><option>At risk</option><option>Inactive</option></select><ChevronDown size={14} /></label>
                  <label><span className="sr-only">Filter by tier</span><select value={tier} onChange={(e) => setTier(e.target.value)}><option>All tiers</option><option>Enterprise</option><option>Growth</option><option>Starter</option></select><ChevronDown size={14} /></label>
                </div>
              </div>
              <div className="results-label"><strong>{filtered.length}</strong> {filtered.length === 1 ? "customer" : "customers"}{(search || status !== "All statuses" || tier !== "All tiers") && <button onClick={() => { setSearch(""); setStatus("All statuses"); setTier("All tiers"); }}>Clear filters</button>}</div>
              <div className="table-wrap customer-table">
                <table>
                  <thead>
                    <tr>
                      <th><button onClick={() => setSort("name")}>Customer <ArrowUpDown size={13} /></button></th>
                      <th>Contact</th><th>Status</th><th>Tier</th>
                      <th><button onClick={() => setSort("spent")}>Total spent <ArrowUpDown size={13} /></button></th>
                      <th>Orders</th><th />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((customer) => (
                      <tr key={customer.id} onClick={() => setSelectedId(customer.id)}>
                        <td><div className="customer-cell"><div className="avatar" style={{ background: avatarColors[customer.id % avatarColors.length] }}>{initials(customer.name)}</div><span><strong>{customer.name}</strong><small>{customer.company}</small></span></div></td>
                        <td><div className="contact-cell"><span>{customer.email}</span><small>{customer.location}</small></div></td>
                        <td><span className={statusClass(customer.status)}>{customer.status}</span></td>
                        <td><span className="tier">{customer.tier}</span></td>
                        <td><strong>{money(customer.spent)}</strong></td>
                        <td>{customer.orders.length}</td>
                        <td><button className="icon-button" onClick={(event) => { event.stopPropagation(); setSelectedId(customer.id); }} aria-label={`View ${customer.name}`}><ChevronRight size={18} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && <div className="empty-state"><Search /><h3>No customers found</h3><p>Try changing your search or filters.</p><button className="text-button" onClick={() => { setSearch(""); setStatus("All statuses"); setTier("All tiers"); }}>Clear all filters</button></div>}
              </div>
              <div className="pagination"><span>Showing 1–{filtered.length} of {filtered.length}</span><div><button disabled>Previous</button><button disabled={filtered.length < 8}>Next</button></div></div>
            </section>
          </div>
        )}
      </main>
      {formMode && <CustomerForm customer={formMode === "edit" ? selected : undefined} onClose={() => setFormMode(null)} onSave={saveCustomer} />}
      {toast && <div className="toast"><Check size={17} /> {toast}</div>}
    </div>
  );
};
