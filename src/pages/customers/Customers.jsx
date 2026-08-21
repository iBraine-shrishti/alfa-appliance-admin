import { useMemo, useState } from "react";
import { FiSearch, FiFilter, FiArrowUp, FiDownload, FiUserPlus, FiUsers, FiCreditCard, FiCheckCircle, FiChevronDown, FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import CustomersTable from "./CustomersTable";
import { adminCustomers } from "../../data/adminCustomers";

const PAGE_SIZE = 10;

const Customers = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [customers, setCustomers] = useState(adminCustomers);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return customers
      .filter((c) => !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || String(c.id).includes(q))
      .filter((c) => statusFilter === "All" || c.status === statusFilter)
      .sort((a, b) => sortBy === "orders" ? b.orders - a.orders : sortBy === "spent" ? Number(b.totalSpent) - Number(a.totalSpent) : a.name.localeCompare(b.name));
  }, [customers, search, sortBy, statusFilter]);

  const handleDelete = (id) => setCustomers((current) => current.filter((customer) => customer.id !== id));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageCustomers = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="USER MANAGEMENT"
        title={
          <>
            Global <span className="text-blue-600">Customers</span>
          </>
        }
        subtitle={`Overseeing ${customers.length} customers`}
        actions={
          <>
            <button
              type="button"
              className="flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
            >
              <FiDownload size={15} />
              Export Data
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <FiUserPlus size={15} />
              Add Customer
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: FiUsers, label: "Total customers", value: "3,492", note: "Active users", tone: "blue" },
          { icon: FiCreditCard, label: "Total lifetime value", value: "$1.2M", note: "Customer revenue", tone: "cyan" },
          { icon: FiCheckCircle, label: "Active subscribers", value: "1,824", note: "Marketing opt-in", tone: "green" },
        ].map(({ icon: Icon, label, value, note, tone }) => {
          const tones = {
            blue: { rail: "bg-blue-600", icon: "bg-blue-50 text-blue-600", note: "text-blue-600" },
            cyan: { rail: "bg-cyan-500", icon: "bg-cyan-50 text-cyan-600", note: "text-cyan-600" },
            green: { rail: "bg-emerald-500", icon: "bg-emerald-50 text-emerald-600", note: "text-emerald-600" },
          }[tone];

          return (
            <div key={label} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
              <span className={`absolute inset-x-0 top-0 h-1 ${tones.rail}`} />
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-2 text-3xl font-extrabold leading-none tracking-tight text-navy-950">{value}</p></div>
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones.icon}`}><Icon size={18} /></span>
              </div>
              <div className="mt-5 flex items-center justify-between"><span className={`text-[10px] font-bold uppercase tracking-wider ${tones.note}`}>{note}</span><FiArrowUpRight className="text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={15} /></div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, or ID..."
            className="w-full rounded border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative"><FiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" size={14} /><select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm font-semibold text-navy-950 outline-none focus:border-blue-600" aria-label="Filter customers by status"><option>All</option><option>Subscribed</option><option>Guest</option></select><FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} /></div>
          <div className="relative"><FiArrowUp className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" size={14} /><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm font-semibold text-navy-950 outline-none focus:border-blue-600" aria-label="Sort customers"><option value="name">Name</option><option value="orders">Orders</option><option value="spent">Total spent</option></select><FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} /></div>
        </div>
      </div>

      <CustomersTable
        customers={pageCustomers}
        page={page}
        totalPages={totalPages}
        totalEntries={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Customers;
