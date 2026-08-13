import { useMemo, useState } from "react";
import { FiSearch, FiFilter, FiArrowUp, FiDownload, FiUserPlus, FiUsers, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import PageHeader from "../dashboard/components/PageHeader";
import StatCard from "../dashboard/components/StatCard";
import CustomersTable from "./CustomersTable";

// TODO: replace with real API data.
const ALL_CUSTOMERS = [
  { id: 1, initials: "RP", name: "Ritesh Pandey", email: "pandeyritesh276@gmail.com", status: "Subscribed", location: "Thane Maharashtra, India", orders: 1, totalSpent: "850.00" },
  { id: 2, initials: "PR", name: "Pratik Rane", email: "pratikrane0412@gmail.com", status: "Guest", location: "Mumbai Maharashtra, India", orders: 1, totalSpent: "699.00" },
  { id: 3, initials: "SA", name: "System Admin", email: "admin@alfaappliances.com", status: "Subscribed", location: null, orders: 0, totalSpent: "0.00" },
];

const PAGE_SIZE = 10;

const Customers = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return ALL_CUSTOMERS;
    const q = search.toLowerCase();
    return ALL_CUSTOMERS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [search]);

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
        subtitle="Overseeing 3,492 customers"
        actions={
          <>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
            >
              <FiDownload size={15} />
              Export Data
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <FiUserPlus size={15} />
              Add Customer
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard icon={FiUsers} label="TOTAL CUSTOMERS" value="3,492" />
        <StatCard icon={FiCreditCard} label="TOTAL LIFETIME VALUE" value="$1.2M" />
        <StatCard icon={FiCheckCircle} label="ACTIVE SUBSCRIBERS" value="1,824" />
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
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
          >
            <FiFilter size={15} />
            Filter
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
          >
            <FiArrowUp size={15} />
            Sort
          </button>
        </div>
      </div>

      <CustomersTable
        customers={pageCustomers}
        page={page}
        totalPages={totalPages}
        totalEntries={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Customers;
