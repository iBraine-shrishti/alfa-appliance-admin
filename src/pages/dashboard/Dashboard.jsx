import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUsers, FiBox, FiList, FiTag, FiHelpCircle, FiArrowUpRight } from "react-icons/fi";
import DashboardHeader from "./components/DashboardHeader";
import RevenueCard from "./components/RevenueCard";
import StatCard from "./components/StatCard";
import FulfillmentCard from "./components/FulfillmentCard";
import SalesHistoryChart from "./components/SalesHistoryChart";
import ContentDistributionChart from "./components/ContentDistributionChart";
import TopSellingCard from "./components/TopSellingCard";
import { fetchAdminDashboardStats } from "../../services/api";

const DEFAULT_SALES_HISTORY = [
  { date: "AUG 18", value: 4800 },
  { date: "AUG 19", value: 6200 },
  { date: "AUG 20", value: 5500 },
  { date: "AUG 21", value: 9240 },
  { date: "AUG 22", value: 6800 },
  { date: "AUG 23", value: 7100 },
];

const QUICK_LINK_TONES = {
  red: { icon: "bg-red-50 text-red-500", rail: "bg-red-500", glow: "group-hover:shadow-red-950/10" },
  blue: { icon: "bg-blue-50 text-blue-600", rail: "bg-blue-600", glow: "group-hover:shadow-blue-950/10" },
  green: { icon: "bg-emerald-50 text-emerald-500", rail: "bg-emerald-500", glow: "group-hover:shadow-emerald-950/10" },
  purple: { icon: "bg-violet-50 text-violet-500", rail: "bg-violet-500", glow: "group-hover:shadow-violet-950/10" },
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashData, setDashData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminDashboardStats();
    if (data) {
      setDashData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalSalesVal = dashData ? `£${dashData.total_sales.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "£2,299.00";
  const totalOrdersVal = dashData ? dashData.total_orders.toString() : "2";
  const totalCustomersVal = dashData ? dashData.total_customers.toString() : "8";
  const totalProductsCount = dashData ? dashData.total_products : 17;
  const categoriesList = dashData?.categories || [
    { name: "Washing Machines", count: 5 },
    { name: "Fridge Freezers", count: 4 },
    { name: "Ovens", count: 3 },
    { name: "Dishwashers", count: 2 },
  ];

  const quickLinks = [
    { label: "Products", value: totalProductsCount, icon: FiBox, tone: "red", section: "Catalog", to: "/admin/appliance-catalog/all-products" },
    { label: "Collections", value: 18, icon: FiList, tone: "blue", section: "Catalog", to: "/admin/appliance-catalog/collections" },
    { label: "Discounts", value: 2, icon: FiTag, tone: "green", section: "Commerce", to: "/admin/discounts" },
    { label: "FAQs", value: 5, icon: FiHelpCircle, tone: "purple", section: "Support", to: "/admin/support" },
  ];

  const contentDistribution = categoriesList.map((c) => ({
    label: c.name,
    value: c.count,
  }));
  const totalDistCount = contentDistribution.reduce((acc, curr) => acc + curr.value, 0);

  const recentOrdersList = dashData?.recent_orders || [];
  const topSellingList = recentOrdersList.length > 0 ? recentOrdersList.map((o, idx) => ({
    rank: idx + 1,
    name: o.items?.[0]?.product?.title || "Samsung 480L Double Door Refrigerator",
    revenue: `£${o.total_price}`,
    unitsSold: o.items?.[0]?.quantity || 1,
    progress: Math.max(30, 100 - idx * 25),
    image: o.items?.[0]?.product?.image_display_url || "http://127.0.0.1:8000/media/products/product1/product1.png"
  })) : [
    {
      rank: 1,
      name: "Samsung 480L Frost Free Double Door Refrigerator",
      revenue: "£1,498.00",
      unitsSold: 2,
      progress: 100,
      image: "http://127.0.0.1:8000/media/products/product1/product1.png",
    },
    {
      rank: 2,
      name: "Bosch 9kg Front Load Washing Machine",
      revenue: "£890.00",
      unitsSold: 2,
      progress: 75,
      image: "http://127.0.0.1:8000/media/products/product2/product2.png",
    },
    {
      rank: 3,
      name: "Miele Built-in Induction Hob, 4 Zone",
      revenue: "£609.00",
      unitsSold: 1,
      progress: 50,
      image: "http://127.0.0.1:8000/media/products/product3/product3.png",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader onRefresh={loadData} />

      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Business overview
            </p>
            <p className="mt-1 text-sm text-slate-500">A live snapshot of your appliance operation</p>
          </div>
          <span className="hidden rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700 sm:inline-flex sm:items-center sm:gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {loading ? "Refreshing..." : "Live data"}
          </span>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-[minmax(0,1.7fr)_220px_minmax(0,1fr)]
            lg:grid-rows-[84px_84px]
          "
        >
          <RevenueCard
            amount={totalSalesVal}
            changeLabel="+12.5% live sales"
            className="col-span-1 min-h-[190px] sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-2"
          />

          <FulfillmentCard
            rate={98.5}
            note="Exceeding UK fulfillment target"
            className="col-span-1 min-h-[190px] sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2"
          />

          <div
            className="
              col-span-1
              grid
              grid-cols-2
              gap-4
              sm:col-span-2
              lg:col-span-1
              lg:col-start-2
              lg:row-span-2
              lg:row-start-1
              lg:grid-cols-1
              lg:gap-5
            "
          >
            <StatCard
              icon={FiShoppingCart}
              label="TOTAL ORDERS"
              value={totalOrdersVal}
            />

            <StatCard
              icon={FiUsers}
              label="TOTAL CUSTOMERS"
              value={totalCustomersVal}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-navy-950">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Inventory &amp; content quick links
          </p>
          <span className="text-[11px] font-semibold text-slate-400">Manage your workspace</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map(({ label, value, icon: Icon, tone, section, to }) => {
            const toneStyles = QUICK_LINK_TONES[tone];
            return (
              <Link
                key={label}
                to={to}
                className={`group relative flex min-h-[112px] items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-5 transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl ${toneStyles.glow}`}
              >
                <span className={`absolute inset-x-0 top-0 h-1 ${toneStyles.rail}`} />
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${toneStyles.icon}`}>
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{section}</span>
                    <span className="mt-1 block truncate text-sm font-bold text-navy-950">{label}</span>
                  </span>
                </span>
                <span className="flex flex-col items-end gap-2 self-stretch">
                  <span className="text-2xl font-extrabold leading-none text-navy-950">{value}</span>
                  <FiArrowUpRight className="text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesHistoryChart
            data={DEFAULT_SALES_HISTORY}
            total={totalSalesVal}
            totalLabel="AGGREGATE SALES"
          />
        </div>
        <ContentDistributionChart items={contentDistribution} total={totalDistCount} />
      </div>

      <div>
        <p className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          TOP SELLING APPLIANCES
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topSellingList.map((item) => (
            <TopSellingCard key={item.rank} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;