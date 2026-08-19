import {
  Activity,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Mail,
  MapPin,
  Menu,
  MoreHorizontal,
  Package,
  Pencil,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { Button } from "./components/ui/button";

type CustomerStatus = "Active" | "Lead" | "At risk";
type OrderStatus = "Processing" | "Shipped" | "Delivered";
type InvoiceStatus = "Paid" | "Open" | "Overdue";
type Section = "Customers" | "Orders" | "Invoices";
type DetailTab = "Overview" | "Orders" | "Invoices" | "Activity";

type Customer = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: CustomerStatus;
  segment: string;
  owner: string;
  joined: string;
  lastContact: string;
};

type Order = {
  id: string;
  customerId: number;
  date: string;
  status: OrderStatus;
  items: number;
  total: number;
};

type Invoice = {
  id: string;
  customerId: number;
  issued: string;
  due: string;
  status: InvoiceStatus;
  amount: number;
};

type ActivityItem = {
  id: number;
  customerId: number;
  type: "email" | "call" | "order" | "invoice" | "note";
  title: string;
  detail: string;
  date: string;
};

const initialCustomers: Customer[] = [
  { id: 1, name: "Maya Chen", company: "Northstar Labs", email: "maya@northstarlabs.co", phone: "(415) 555-0182", location: "San Francisco, CA", status: "Active", segment: "Enterprise", owner: "Erin Wallace", joined: "Mar 12, 2024", lastContact: "2 hours ago" },
  { id: 2, name: "Jon Bell", company: "Helio Works", email: "jon@helioworks.com", phone: "(512) 555-0129", location: "Austin, TX", status: "Active", segment: "Growth", owner: "Nolan Price", joined: "Jun 8, 2024", lastContact: "Yesterday" },
  { id: 3, name: "Priya Shah", company: "Meridian Health", email: "priya@meridian.health", phone: "(617) 555-0136", location: "Boston, MA", status: "At risk", segment: "Enterprise", owner: "Erin Wallace", joined: "Nov 21, 2023", lastContact: "8 days ago" },
  { id: 4, name: "Theo Martin", company: "Cedar & Stone", email: "theo@cedarstone.co", phone: "(503) 555-0164", location: "Portland, OR", status: "Lead", segment: "Small business", owner: "Nolan Price", joined: "Jan 17, 2025", lastContact: "3 days ago" },
  { id: 5, name: "Lucia Alvarez", company: "Aperture Foods", email: "lucia@aperturefoods.com", phone: "(305) 555-0173", location: "Miami, FL", status: "Active", segment: "Growth", owner: "Sam Okafor", joined: "Sep 3, 2024", lastContact: "4 hours ago" },
  { id: 6, name: "Owen Wright", company: "Fieldhouse Supply", email: "owen@fieldhouse.co", phone: "(312) 555-0191", location: "Chicago, IL", status: "Active", segment: "Small business", owner: "Sam Okafor", joined: "Feb 19, 2024", lastContact: "Monday" },
  { id: 7, name: "Amara Okafor", company: "Kora Financial", email: "amara@korafinancial.com", phone: "(646) 555-0115", location: "New York, NY", status: "At risk", segment: "Enterprise", owner: "Erin Wallace", joined: "Aug 27, 2023", lastContact: "12 days ago" },
  { id: 8, name: "Elliot Park", company: "Studio Lumen", email: "elliot@studiolumen.design", phone: "(206) 555-0148", location: "Seattle, WA", status: "Lead", segment: "Growth", owner: "Nolan Price", joined: "Feb 4, 2025", lastContact: "Yesterday" },
];

const initialOrders: Order[] = [
  { id: "ORD-4821", customerId: 1, date: "Feb 18, 2025", status: "Processing", items: 4, total: 12840 },
  { id: "ORD-4814", customerId: 5, date: "Feb 16, 2025", status: "Shipped", items: 7, total: 8620 },
  { id: "ORD-4789", customerId: 2, date: "Feb 10, 2025", status: "Delivered", items: 2, total: 4750 },
  { id: "ORD-4762", customerId: 6, date: "Feb 5, 2025", status: "Delivered", items: 11, total: 6240 },
  { id: "ORD-4711", customerId: 3, date: "Jan 22, 2025", status: "Delivered", items: 3, total: 18900 },
  { id: "ORD-4685", customerId: 1, date: "Jan 14, 2025", status: "Delivered", items: 6, total: 9220 },
];

const initialInvoices: Invoice[] = [
  { id: "INV-2025-184", customerId: 1, issued: "Feb 18, 2025", due: "Mar 20, 2025", status: "Open", amount: 12840 },
  { id: "INV-2025-176", customerId: 5, issued: "Feb 16, 2025", due: "Mar 18, 2025", status: "Open", amount: 8620 },
  { id: "INV-2025-151", customerId: 2, issued: "Feb 10, 2025", due: "Mar 12, 2025", status: "Paid", amount: 4750 },
  { id: "INV-2025-118", customerId: 6, issued: "Feb 5, 2025", due: "Mar 7, 2025", status: "Paid", amount: 6240 },
  { id: "INV-2025-082", customerId: 3, issued: "Jan 22, 2025", due: "Feb 21, 2025", status: "Overdue", amount: 18900 },
  { id: "INV-2025-046", customerId: 1, issued: "Jan 14, 2025", due: "Feb 13, 2025", status: "Paid", amount: 9220 },
];

const initialActivity: ActivityItem[] = [
  { id: 1, customerId: 1, type: "order", title: "Order ORD-4821 placed", detail: "4 items totaling $12,840.00", date: "Today, 10:42 AM" },
  { id: 2, customerId: 1, type: "email", title: "Quarterly review follow-up", detail: "Erin Wallace sent an email to Maya", date: "Today, 9:15 AM" },
  { id: 3, customerId: 1, type: "call", title: "Account planning call", detail: "32 minute call with Maya Chen", date: "Feb 14, 2:30 PM" },
  { id: 4, customerId: 1, type: "invoice", title: "Invoice INV-2025-046 paid", detail: "Payment of $9,220.00 received", date: "Feb 12, 11:08 AM" },
  { id: 5, customerId: 1, type: "note", title: "Expansion opportunity", detail: "Maya is evaluating licenses for the research team.", date: "Feb 6, 4:20 PM" },
  { id: 6, customerId: 3, type: "note", title: "Account flagged at risk", detail: "No response after two renewal follow-ups.", date: "Feb 15, 3:12 PM" },
  { id: 7, customerId: 5, type: "email", title: "Shipping confirmation sent", detail: "Tracking details shared with Lucia.", date: "Feb 17, 8:40 AM" },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

const statusClass = (status: CustomerStatus | OrderStatus | InvoiceStatus) => {
  if (["Active", "Delivered", "Paid"].includes(status)) return "status status-green";
  if (["At risk", "Overdue"].includes(status)) return "status status-red";
  if (["Lead", "Open"].includes(status)) return "status status-amber";
  return "status status-blue";
};

const CustomerAvatar = ({ customer, large = false }: { customer: Customer; large?: boolean }) => (
  <span className={`avatar avatar-${(customer.id % 4) + 1} ${large ? "avatar-large" : ""}`}>{initials(customer.name)}</span>
);

type CustomerForm = Pick<Customer, "name" | "company" | "email" | "phone" | "location" | "status" | "segment" | "owner">;

const emptyForm: CustomerForm = {
  name: "", company: "", email: "", phone: "", location: "", status: "Active", segment: "Growth", owner: "Erin Wallace",
};

export const App = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [activity, setActivity] = useState(initialActivity);
  const [section, setSection] = useState<Section>("Customers");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Recent");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [detailTab, setDetailTab] = useState<DetailTab>("Overview");
  const [dialog, setDialog] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<CustomerForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  const selected = customers.find((customer) => customer.id === selectedId) ?? null;
  const customerById = (id: number) => customers.find((customer) => customer.id === id);

  const records = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (section === "Customers") {
      const matched = customers.filter((customer) => {
        const text = `${customer.name} ${customer.company} ${customer.email}`.toLowerCase();
        return text.includes(query) && (filter === "All" || customer.status === filter);
      });
      return [...matched].sort((a, b) => sort === "Name" ? a.name.localeCompare(b.name) : sort === "Company" ? a.company.localeCompare(b.company) : b.id - a.id);
    }
    if (section === "Orders") {
      return initialOrders.filter((order) => {
        const customer = customerById(order.customerId);
        return `${order.id} ${customer?.name} ${customer?.company}`.toLowerCase().includes(query) && (filter === "All" || order.status === filter);
      }).sort((a, b) => sort === "Amount" ? b.total - a.total : b.id.localeCompare(a.id));
    }
    return initialInvoices.filter((invoice) => {
      const customer = customerById(invoice.customerId);
      return `${invoice.id} ${customer?.name} ${customer?.company}`.toLowerCase().includes(query) && (filter === "All" || invoice.status === filter);
    }).sort((a, b) => sort === "Amount" ? b.amount - a.amount : b.id.localeCompare(a.id));
  }, [customers, filter, search, section, sort]);

  const switchSection = (next: Section) => {
    setSection(next);
    setSearch("");
    setFilter("All");
    setSort("Recent");
    setMobileNav(false);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setErrors({});
    setDialog("create");
  };

  const openEdit = () => {
    if (!selected) return;
    const { name, company, email, phone, location, status, segment, owner } = selected;
    setForm({ name, company, email, phone, location, status, segment, owner });
    setErrors({});
    setDialog("edit");
  };

  const submitCustomer = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Enter the customer's full name.";
    if (!form.company.trim()) nextErrors.company = "Enter a company name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid work email.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (dialog === "create") {
      const id = Math.max(...customers.map((customer) => customer.id)) + 1;
      const customer: Customer = { ...form, id, joined: "Feb 19, 2025", lastContact: "Just now" };
      setCustomers((current) => [customer, ...current]);
      setActivity((current) => [{ id: Date.now(), customerId: id, type: "note", title: "Customer profile created", detail: `${form.owner} added ${form.name} to customer records.`, date: "Just now" }, ...current]);
      setSelectedId(id);
      setSection("Customers");
      setFilter("All");
      setSearch("");
      setSort("Recent");
      setToast(`${form.name} was added successfully.`);
    } else if (selected) {
      setCustomers((current) => current.map((customer) => customer.id === selected.id ? { ...customer, ...form, lastContact: "Just now" } : customer));
      setActivity((current) => [{ id: Date.now(), customerId: selected.id, type: "note", title: "Customer profile updated", detail: `${form.owner} updated contact and account details.`, date: "Just now" }, ...current]);
      setToast(`${form.name}'s profile was updated.`);
    }
    setDialog(null);
    window.setTimeout(() => setToast(""), 3500);
  };

  const filterOptions = section === "Customers" ? ["All", "Active", "Lead", "At risk"] : section === "Orders" ? ["All", "Processing", "Shipped", "Delivered"] : ["All", "Paid", "Open", "Overdue"];
  const sortOptions = section === "Customers" ? ["Recent", "Name", "Company"] : ["Recent", "Amount"];
  const placeholder = `Search ${section.toLowerCase()}...`;
  const selectedOrders = selected ? initialOrders.filter((order) => order.customerId === selected.id) : [];
  const selectedInvoices = selected ? initialInvoices.filter((invoice) => invoice.customerId === selected.id) : [];
  const selectedActivity = selected ? activity.filter((item) => item.customerId === selected.id) : [];
  const lifetimeValue = selectedInvoices.filter((invoice) => invoice.status === "Paid").reduce((total, invoice) => total + invoice.amount, 0);

  return (
    <main data-customer-management="ready" className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand"><span className="brand-mark">F</span><span>Folio</span></div>
        <button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X /></button>
        <nav aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          <NavItem icon={<Users />} label="Customers" active={section === "Customers"} count={customers.length} onClick={() => switchSection("Customers")} />
          <NavItem icon={<Package />} label="Orders" active={section === "Orders"} count={initialOrders.length} onClick={() => switchSection("Orders")} />
          <NavItem icon={<FileText />} label="Invoices" active={section === "Invoices"} count={initialInvoices.length} onClick={() => switchSection("Invoices")} />
        </nav>
        <div className="sidebar-bottom">
          <div className="team-avatar">EW</div>
          <div><strong>Erin Wallace</strong><span>Account manager</span></div>
          <MoreHorizontal className="sidebar-more" />
        </div>
      </aside>
      {mobileNav && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}

      <section className="workspace">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu /></button>
          <div className="mobile-brand"><span className="brand-mark">F</span> Folio</div>
          <div className="topbar-actions">
            <Button onClick={openCreate}><Plus /> Add customer</Button>
          </div>
        </header>

        <div className="page">
          <div className="page-heading">
            <div>
              <p className="eyebrow">Customer operations</p>
              <h1>{section}</h1>
              <p className="page-subtitle">{section === "Customers" ? "Manage relationships and keep your team in sync." : section === "Orders" ? "Track fulfillment across every customer account." : "Monitor payment status and outstanding balances."}</p>
            </div>
            <div className="heading-stat">
              <span>{section === "Customers" ? "Active accounts" : section === "Orders" ? "Order value" : "Outstanding"}</span>
              <strong>{section === "Customers" ? customers.filter((customer) => customer.status === "Active").length : section === "Orders" ? currency.format(initialOrders.reduce((sum, order) => sum + order.total, 0)) : currency.format(initialInvoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoice.amount, 0))}</strong>
            </div>
          </div>

          <div className="toolbar">
            <label className="search-field"><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={placeholder} aria-label={placeholder} />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><X /></button>}</label>
            <div className="toolbar-select"><SlidersHorizontal /><select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter by status">{filterOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown /></div>
            <div className="toolbar-select sort-select"><span>Sort:</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort records">{sortOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown /></div>
          </div>

          <div className={`content-grid ${section !== "Customers" || !selected ? "content-grid-full" : ""}`}>
            <section className="records-panel" aria-label={`${section} list`}>
              {records.length === 0 ? (
                <div className="empty-state">
                  <Search />
                  <h2>No matching {section.toLowerCase()}</h2>
                  <p>Try another search or clear the status filter.</p>
                  <Button variant="outline" onClick={() => { setSearch(""); setFilter("All"); }}>Clear filters</Button>
                </div>
              ) : section === "Customers" ? (
                <CustomerTable customers={records as Customer[]} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setDetailTab("Overview"); }} />
              ) : section === "Orders" ? (
                <OrderTable orders={records as Order[]} customerById={customerById} onCustomer={(id) => { setSelectedId(id); switchSection("Customers"); setDetailTab("Orders"); }} />
              ) : (
                <InvoiceTable invoices={records as Invoice[]} customerById={customerById} onCustomer={(id) => { setSelectedId(id); switchSection("Customers"); setDetailTab("Invoices"); }} />
              )}
              <div className="table-footer"><span>Showing {records.length} {section.toLowerCase()}</span><span>Updated just now</span></div>
            </section>

            {section === "Customers" && selected && (
              <aside className="detail-panel">
                <div className="detail-header">
                  <button className="detail-close" onClick={() => setSelectedId(null)} aria-label="Close customer details"><X /></button>
                  <CustomerAvatar customer={selected} large />
                  <div className="detail-title">
                    <div><h2>{selected.name}</h2><span className={statusClass(selected.status)}>{selected.status}</span></div>
                    <p>{selected.company}</p>
                  </div>
                  <button className="edit-button" onClick={openEdit}><Pencil /> Edit</button>
                </div>
                <div className="detail-tabs" role="tablist">
                  {(["Overview", "Orders", "Invoices", "Activity"] as DetailTab[]).map((tab) => <button key={tab} role="tab" aria-selected={detailTab === tab} className={detailTab === tab ? "active" : ""} onClick={() => setDetailTab(tab)}>{tab}</button>)}
                </div>
                <div className="detail-content">
                  {detailTab === "Overview" && (
                    <>
                      <div className="detail-metrics">
                        <Metric label="Lifetime value" value={currency.format(lifetimeValue)} icon={<CircleDollarSign />} />
                        <Metric label="Total orders" value={String(selectedOrders.length)} icon={<ClipboardList />} />
                      </div>
                      <section className="detail-section">
                        <div className="section-heading"><h3>Contact information</h3></div>
                        <dl className="contact-list">
                          <div><dt><Mail /></dt><dd><span>Email</span><a href={`mailto:${selected.email}`}>{selected.email}</a></dd></div>
                          <div><dt><Phone /></dt><dd><span>Phone</span><strong>{selected.phone}</strong></dd></div>
                          <div><dt><MapPin /></dt><dd><span>Location</span><strong>{selected.location}</strong></dd></div>
                        </dl>
                      </section>
                      <section className="detail-section">
                        <div className="section-heading"><h3>Account details</h3></div>
                        <dl className="account-grid">
                          <div><dt>Segment</dt><dd>{selected.segment}</dd></div>
                          <div><dt>Account owner</dt><dd>{selected.owner}</dd></div>
                          <div><dt>Customer since</dt><dd>{selected.joined}</dd></div>
                          <div><dt>Last contact</dt><dd>{selected.lastContact}</dd></div>
                        </dl>
                      </section>
                      <section className="detail-section">
                        <div className="section-heading"><h3>Recent activity</h3><button onClick={() => setDetailTab("Activity")}>View all <ChevronRight /></button></div>
                        <ActivityList items={selectedActivity.slice(0, 3)} />
                      </section>
                    </>
                  )}
                  {detailTab === "Orders" && <RelatedOrders orders={selectedOrders} />}
                  {detailTab === "Invoices" && <RelatedInvoices invoices={selectedInvoices} />}
                  {detailTab === "Activity" && <ActivityList items={selectedActivity} />}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {dialog && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
          <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div className="dialog-heading">
              <div><p className="eyebrow">{dialog === "create" ? "New relationship" : "Customer profile"}</p><h2 id="dialog-title">{dialog === "create" ? "Add customer" : "Edit customer"}</h2></div>
              <button className="icon-button" onClick={() => setDialog(null)} aria-label="Close dialog"><X /></button>
            </div>
            <form onSubmit={submitCustomer}>
              <div className="form-grid">
                <Field label="Full name" error={errors.name}><input autoFocus value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Jordan Lee" /></Field>
                <Field label="Company" error={errors.company}><input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="Company name" /></Field>
                <Field label="Work email" error={errors.email}><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="name@company.com" /></Field>
                <Field label="Phone"><input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="(555) 555-0123" /></Field>
                <Field label="Location"><input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="City, State" /></Field>
                <Field label="Status"><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as CustomerStatus })}><option>Active</option><option>Lead</option><option>At risk</option></select></Field>
                <Field label="Segment"><select value={form.segment} onChange={(event) => setForm({ ...form, segment: event.target.value })}><option>Enterprise</option><option>Growth</option><option>Small business</option></select></Field>
                <Field label="Account owner"><select value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })}><option>Erin Wallace</option><option>Nolan Price</option><option>Sam Okafor</option></select></Field>
              </div>
              <div className="dialog-actions"><Button type="button" variant="outline" onClick={() => setDialog(null)}>Cancel</Button><Button type="submit" disabled={!form.name && !form.company && !form.email}>{dialog === "create" ? "Add customer" : "Save changes"}</Button></div>
            </form>
          </section>
        </div>
      )}

      {toast && <div className="toast" role="status"><span><Check /></span>{toast}</div>}
    </main>
  );
};

const NavItem = ({ icon, label, count, active, onClick }: { icon: React.ReactNode; label: string; count: number; active: boolean; onClick: () => void }) => (
  <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>{icon}<span>{label}</span><small>{count}</small></button>
);

const CustomerTable = ({ customers, selectedId, onSelect }: { customers: Customer[]; selectedId: number | null; onSelect: (id: number) => void }) => (
  <div className="table-wrap">
    <table>
      <thead><tr><th>Customer</th><th>Status</th><th>Segment</th><th>Last contact</th><th aria-label="Actions" /></tr></thead>
      <tbody>{customers.map((customer) => (
        <tr key={customer.id} className={selectedId === customer.id ? "selected" : ""} onClick={() => onSelect(customer.id)}>
          <td><div className="customer-cell"><CustomerAvatar customer={customer} /><div><strong>{customer.name}</strong><span>{customer.company}</span></div></div></td>
          <td><span className={statusClass(customer.status)}>{customer.status}</span></td>
          <td>{customer.segment}</td><td>{customer.lastContact}</td><td><ChevronRight /></td>
        </tr>
      ))}</tbody>
    </table>
  </div>
);

const OrderTable = ({ orders, customerById, onCustomer }: { orders: Order[]; customerById: (id: number) => Customer | undefined; onCustomer: (id: number) => void }) => (
  <div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Status</th><th>Items</th><th className="align-right">Total</th></tr></thead><tbody>{orders.map((order) => {
    const customer = customerById(order.customerId);
    return <tr key={order.id}><td><strong>{order.id}</strong></td><td><button className="customer-link" onClick={() => onCustomer(order.customerId)}>{customer?.name}<span>{customer?.company}</span></button></td><td>{order.date}</td><td><span className={statusClass(order.status)}>{order.status}</span></td><td>{order.items}</td><td className="align-right"><strong>{currency.format(order.total)}</strong></td></tr>;
  })}</tbody></table></div>
);

const InvoiceTable = ({ invoices, customerById, onCustomer }: { invoices: Invoice[]; customerById: (id: number) => Customer | undefined; onCustomer: (id: number) => void }) => (
  <div className="table-wrap"><table><thead><tr><th>Invoice</th><th>Customer</th><th>Issued</th><th>Due</th><th>Status</th><th className="align-right">Amount</th></tr></thead><tbody>{invoices.map((invoice) => {
    const customer = customerById(invoice.customerId);
    return <tr key={invoice.id}><td><strong>{invoice.id}</strong></td><td><button className="customer-link" onClick={() => onCustomer(invoice.customerId)}>{customer?.name}<span>{customer?.company}</span></button></td><td>{invoice.issued}</td><td>{invoice.due}</td><td><span className={statusClass(invoice.status)}>{invoice.status}</span></td><td className="align-right"><strong>{currency.format(invoice.amount)}</strong></td></tr>;
  })}</tbody></table></div>
);

const Metric = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => <div className="metric"><span>{icon}</span><div><small>{label}</small><strong>{value}</strong></div></div>;

const ActivityList = ({ items }: { items: ActivityItem[] }) => items.length ? (
  <ol className="activity-list">{items.map((item) => <li key={item.id}><span className={`activity-icon activity-${item.type}`}>{item.type === "email" ? <Mail /> : item.type === "call" ? <Phone /> : item.type === "order" ? <Package /> : item.type === "invoice" ? <FileText /> : <Activity />}</span><div><strong>{item.title}</strong><p>{item.detail}</p><time>{item.date}</time></div></li>)}</ol>
) : <div className="inline-empty"><Activity /><p>No activity recorded yet.</p></div>;

const RelatedOrders = ({ orders }: { orders: Order[] }) => orders.length ? <div className="related-list">{orders.map((order) => <article key={order.id}><div><span className="record-icon"><Package /></span><div><strong>{order.id}</strong><p>{order.date} · {order.items} items</p></div></div><div><strong>{currency.format(order.total)}</strong><span className={statusClass(order.status)}>{order.status}</span></div></article>)}</div> : <div className="inline-empty"><Package /><p>No orders for this customer.</p></div>;

const RelatedInvoices = ({ invoices }: { invoices: Invoice[] }) => invoices.length ? <div className="related-list">{invoices.map((invoice) => <article key={invoice.id}><div><span className="record-icon"><FileText /></span><div><strong>{invoice.id}</strong><p>Due {invoice.due}</p></div></div><div><strong>{currency.format(invoice.amount)}</strong><span className={statusClass(invoice.status)}>{invoice.status}</span></div></article>)}</div> : <div className="inline-empty"><FileText /><p>No invoices for this customer.</p></div>;

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => <label className={`field ${error ? "field-error" : ""}`}><span>{label}</span>{children}{error && <small>{error}</small>}</label>;
