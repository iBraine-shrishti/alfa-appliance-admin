import { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiShoppingBag,
  FiCreditCard,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import PageHeader from "../../components/PageHeader";
import OrdersTable from "./OrdersTable";
import { fetchAdminOrders } from "../../services/api";

const PAGE_SIZE = 10;

const OrderStatCard = ({
  icon: Icon,
  label,
  value,
  type = "blue",
  trend,
  status,
}) => {
  const styles = {
    blue: {
      iconBg: "bg-[#DCE6FF]",
      iconColor: "text-[#1D60FF]",
    },
    orange: {
      iconBg: "bg-[#FFE0CA]",
      iconColor: "text-[#D66A00]",
    },
    red: {
      iconBg: "bg-[#FFD6D6]",
      iconColor: "text-[#D71920]",
    },
  };

  const currentStyle = styles[type];

  return (
    <div className="w-full rounded border border-[#E0E0E0] bg-white px-6 py-6">
      <div className="flex items-start justify-between">
        <p className="pt-1 text-[12px] font-semibold uppercase tracking-wide text-[#5B5B5B]">
          {label}
        </p>

        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${currentStyle.iconBg}`}>
          <Icon size={20} strokeWidth={2} className={currentStyle.iconColor} />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[38px] font-semibold leading-none tracking-tight text-black">
          {value}
        </p>
      </div>

      <div className="mt-4 min-h-[18px]">
        {trend && (
          <div className="flex items-center gap-1 text-[12px] font-medium text-[#00A63C]">
            <FiTrendingUp size={14} strokeWidth={2} />
            <span>{trend}</span>
          </div>
        )}

        {status && (
          <div className="flex items-center gap-1 text-[12px] text-[#555555]">
            <span className="font-bold text-[#D71920]">!</span>
            <span>{status}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Orders = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    const data = await fetchAdminOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return orders;

    const q = search.toLowerCase();

    return orders.filter(
      (o) =>
        (o.id || "").toLowerCase().includes(q) ||
        (o.customer || o.customerName || "").toLowerCase().includes(q) ||
        (o.email || o.customerEmail || "").toLowerCase().includes(q)
    );
  }, [orders, search]);

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((current) => current.filter((order) => order.id !== orderId));
    }
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageOrders = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalRevenue = orders.reduce((acc, curr) => {
    const val = typeof curr.total === "number" ? curr.total : parseFloat(String(curr.total || "0").replace(/,/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  const pendingCount = orders.filter((o) => o.fulfillment === "Processing" || o.fulfillment === "Pending" || o.status === "Processing" || o.status === "Pending").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full max-w-md">
        <FiSearch
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search orders by ID, customer name or email..."
          className="w-full rounded border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
        />
      </div>

      <PageHeader
        eyebrow="ORDERS MANAGEMENT"
        title={
          <>
            Global <span className="text-blue-600">Orders</span>
          </>
        }
        subtitle={loading ? "Loading customer orders..." : "Monitor and manage customer orders and fulfillment."}
        actions={
          <>
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
              <FiDownload size={15} />
              Export
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <OrderStatCard
          icon={FiShoppingBag}
          label="TOTAL ORDERS"
          value={orders.length.toString()}
          type="blue"
          trend="+12% live orders"
        />

        <OrderStatCard
          icon={FiCreditCard}
          label="TOTAL REVENUE (£)"
          value={`£${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          type="orange"
          trend="Live sales"
        />

        <OrderStatCard
          icon={FiClock}
          label="PENDING FULFILLMENTS"
          value={pendingCount.toString()}
          type="red"
          status="Action required"
        />
      </div>

      <OrdersTable
        orders={pageOrders}
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

export default Orders;