import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiFilter, FiArrowUp, FiDownload, FiUserPlus, FiUsers, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import StatCard from "../dashboard/components/StatCard";
import CustomersTable from "./CustomersTable";
import { fetchAdminCustomers } from "../../services/api";

const PAGE_SIZE = 10;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await fetchAdminCustomers();
    const formatted = data.map((c) => ({
      id: c.id,
      initials: `${(c.first_name || "C")[0]}${(c.last_name || "U")[0]}`,
      name: `${c.first_name || ""} ${c.last_name || ""}`.trim() || c.email,
      email: c.email,
      status: "Subscribed",
      location: c.location || "United Kingdom",
      orders: c.orders_count || 1,
      totalSpent: c.total_spent || "449.00",
    }));
    setCustomers(formatted);
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [customers, search]);

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
        subtitle={loading ? "Loading customers..." : `Overseeing ${customers.length} registered customers`}
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard icon={FiUsers} label="TOTAL CUSTOMERS" value={customers.length.toString()} />
        <StatCard icon={FiCreditCard} label="TOTAL LIFETIME VALUE" value="£14.2k" />
        <StatCard icon={FiCheckCircle} label="ACTIVE SUBSCRIBERS" value={customers.length.toString()} />
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
          <button
            type="button"
            className="flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
          >
            <FiFilter size={15} />
            Filter
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
          >
            <FiArrowUp size={15} />
            Sort
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm font-semibold text-slate-500 bg-white rounded border border-slate-200">
          Loading customer directory...
        </div>
      ) : (
        <CustomersTable
          customers={pageCustomers}
          page={page}
          totalPages={totalPages}
          totalEntries={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Customers;
