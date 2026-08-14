import { useMemo, useState } from "react";
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

// TODO: replace with real API data.
const ALL_ORDERS = [
  {
    id: "#ORD-9021",
    date: "Oct 24, 2023",
    customerName: "Eleanor Rigby",
    customerEmail: "e.rigby@example.com",
    payment: "Paid",
    fulfillment: "Processing",
    items: 3,
    total: "1,450.00",
  },
  {
    id: "#ORD-9020",
    date: "Oct 23, 2023",
    customerName: "Marcus Johnson",
    customerEmail: "mjohnson@industrial.co.uk",
    payment: "Paid",
    fulfillment: "Delivered",
    items: 12,
    total: "8,200.50",
  },
  {
    id: "#ORD-9019",
    date: "Oct 23, 2023",
    customerName: "Sarah Connor",
    customerEmail: "s.connor@techsys.com",
    payment: "Failed",
    fulfillment: "Cancelled",
    items: 1,
    total: "450.00",
  },
  {
    id: "#ORD-9018",
    date: "Oct 22, 2023",
    customerName: "David Bowman",
    customerEmail: "d.bowman@discovery.org",
    payment: "Pending",
    fulfillment: "Unfulfilled",
    items: 5,
    total: "2,100.00",
  },
  {
    id: "#ORD-9017",
    date: "Oct 21, 2023",
    customerName: "Ellen Ripley",
    customerEmail: "ripley@weyland.corp",
    payment: "Paid",
    fulfillment: "Processing",
    items: 8,
    total: "5,600.75",
  },
];

const PAGE_SIZE = 5;

/* -------------------------------------------------------
   ORDERS-SPECIFIC STAT CARD
------------------------------------------------------- */

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
    <div
      className="
        w-full
        rounded-lg
        border
        border-[#E0E0E0]
        bg-white
        px-6
        py-6
      "
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <p className="pt-1 text-[12px] font-semibold uppercase tracking-wide text-[#5B5B5B]">
          {label}
        </p>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${currentStyle.iconBg}`}
        >
          <Icon
            size={20}
            strokeWidth={2}
            className={currentStyle.iconColor}
          />
        </div>
      </div>

      {/* Value */}
      <div className="mt-5">
        <p className="text-[38px] font-semibold leading-none tracking-tight text-black">
          {value}
        </p>
      </div>

      {/* Bottom information */}
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

/* -------------------------------------------------------
   ORDERS PAGE
------------------------------------------------------- */

const Orders = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return ALL_ORDERS;

    const q = search.toLowerCase();

    return ALL_ORDERS.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const pageOrders = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="flex flex-col gap-6">

      {/* Search */}
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
          placeholder="Search orders..."
          className="
            w-full
            rounded-lg
            border
            border-slate-200
            bg-white
            py-2.5
            pl-10
            pr-4
            text-sm
            text-navy-950
            outline-none
            placeholder:text-slate-400
            focus:border-blue-600
          "
        />
      </div>

      {/* Page Header */}
      <PageHeader
        title="Orders Management"
        subtitle="Monitor and manage customer orders and fulfillment."
        actions={
          <>
            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-navy-950
                hover:bg-slate-50
              "
            >
              <FiFilter size={15} />
              Filter
            </button>

            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-navy-950
                hover:bg-slate-50
              "
            >
              <FiDownload size={15} />
              Export
            </button>
          </>
        }
      />

      {/* Orders Stats */}
      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        <OrderStatCard
          icon={FiShoppingBag}
          label="TOTAL ORDERS"
          value="1,248"
          type="blue"
          trend="+12% this week"
        />

        <OrderStatCard
          icon={FiCreditCard}
          label="TOTAL REVENUE (£)"
          value="£342.5k"
          type="orange"
          trend="+8.4% this week"
        />

        <OrderStatCard
          icon={FiClock}
          label="PENDING FULFILLMENTS"
          value="42"
          type="red"
          status="Action required"
        />
      </div>

      {/* Orders Table */}
      <OrdersTable
        orders={pageOrders}
        page={page}
        totalPages={totalPages}
        totalEntries={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Orders;