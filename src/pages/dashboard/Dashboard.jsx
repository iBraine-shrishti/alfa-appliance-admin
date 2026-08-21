
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUsers, FiBox, FiList, FiTag, FiRss, FiHelpCircle, FiArrowUpRight } from "react-icons/fi";
// import Sidebar from "../../components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import RevenueCard from "./components/RevenueCard";
import StatCard from "./components/StatCard";
import FulfillmentCard from "./components/FulfillmentCard";
import SalesHistoryChart from "./components/SalesHistoryChart";
import ContentDistributionChart from "./components/ContentDistributionChart";
import TopSellingCard from "./components/TopSellingCard";
import { adminProducts } from "../../data/adminProducts";
import { adminCollections } from "../../data/adminCollections";
import product1Image from "../../assets/products/product1/product1.png";
import product2Image from "../../assets/products/product2/product2.png";
import product3Image from "../../assets/products/product3/product3.png";


const SALES_HISTORY = [
  { date: "JUL 27", value: 58000 },
  { date: "JUL 30", value: 62000 },
  { date: "AUG 02", value: 55000 },
  { date: "AUG 05", value: 92400 },
  { date: "AUG 07", value: 68000 },
  { date: "AUG 10", value: 71000 },
];

const CONTENT_DISTRIBUTION = [
  { label: "Washing Machines", value: 512 },
  { label: "Refrigerators", value: 170 },
  { label: "Ovens", value: 85 },
  { label: "Dishwashers", value: 87 },
];

const TOP_SELLING = [
  {
    rank: 1,
    name: "Alfa ProWash 9000 Series Front Load",
    revenue: "$45,000",
    unitsSold: 45,
    progress: 100,
    image: product1Image,
  },
  {
    rank: 2,
    name: "Arctic Frost Multi-Door Refrigerator",
    revenue: "$32,500",
    unitsSold: 25,
    progress: 65,
    image: product2Image,
  },
  {
    rank: 3,
    name: "Chefmaster Built-In Convection Oven",
    revenue: "$18,200",
    unitsSold: 14,
    progress: 35,
    image: product3Image,
  },
];

const QUICK_LINKS = [
  { label: "Products", value: adminProducts.length, icon: FiBox, tone: "red", section: "Catalog", to: "/admin/appliance-catalog/all-products" },
  { label: "Collections", value: adminCollections.length, icon: FiList, tone: "blue", section: "Catalog", to: "/admin/appliance-catalog/collections" },
  { label: "Discounts", value: 0, icon: FiTag, tone: "green", section: "Commerce" },
  { label: "Blog Posts", value: 0, icon: FiRss, tone: "orange", section: "Content" },
  { label: "FAQs", value: 3, icon: FiHelpCircle, tone: "purple", section: "Support", to: "/admin/support" },
];

const QUICK_LINK_TONES = {
  red: { icon: "bg-red-50 text-red-500", rail: "bg-red-500", glow: "group-hover:shadow-red-950/10" },
  blue: { icon: "bg-blue-50 text-blue-600", rail: "bg-blue-600", glow: "group-hover:shadow-blue-950/10" },
  green: { icon: "bg-emerald-50 text-emerald-500", rail: "bg-emerald-500", glow: "group-hover:shadow-emerald-950/10" },
  orange: { icon: "bg-orange-50 text-orange-500", rail: "bg-orange-500", glow: "group-hover:shadow-orange-950/10" },
  purple: { icon: "bg-violet-50 text-violet-500", rail: "bg-violet-500", glow: "group-hover:shadow-violet-950/10" },
};

const Dashboard = () => {
  const [stats] = useState({
    totalSales: "$124,500",
    salesChange: "+12.5% from last month",
    totalOrders: "1,204",
    totalCustomers: "8,540",
    fulfillmentRate: 98.5,
  });

  const handleRefresh = () => {
    // TODO: refetch dashboard stats from the API.
  };

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader onRefresh={handleRefresh} />

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
            Live data
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
          amount={stats.totalSales}
          changeLabel={stats.salesChange}
          className="col-span-1 min-h-[190px] sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-2"
        />

        <FulfillmentCard
          rate={stats.fulfillmentRate}
          note="Exceeding target by 3.5%"
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
            value={stats.totalOrders}
          />

          <StatCard
            icon={FiUsers}
            label="TOTAL CUSTOMERS"
            value={stats.totalCustomers}
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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {QUICK_LINKS.map(({ label, value, icon: Icon, tone, section, to }) => {
            const toneStyles = QUICK_LINK_TONES[tone];
            const card = (
              <>
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
                  {to ? <FiArrowUpRight className="text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" size={16} /> : <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">Soon</span>}
                </span>
              </>
            );

            return to ? (
              <Link
                key={label}
                to={to}
                className={`group relative flex min-h-[112px] items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-5 transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl ${toneStyles.glow}`}
              >
                {card}
              </Link>
            ) : (
              <div
                key={label}
                className="relative flex min-h-[112px] items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-5 opacity-70"
                title={`${label} management is not available yet`}
              >
                {card}
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesHistoryChart
            data={SALES_HISTORY}
            total="$124,500"
            totalLabel="AGGREGATE SALES"
          />
        </div>
        <ContentDistributionChart items={CONTENT_DISTRIBUTION} total={854} />
      </div>

      <div>
        <p className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          TOP SELLING APPLIANCES
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOP_SELLING.map((item) => (
            <TopSellingCard key={item.rank} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;