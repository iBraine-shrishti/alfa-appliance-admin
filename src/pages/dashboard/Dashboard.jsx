import { useEffect, useState } from "react";
import { FiShoppingCart, FiUsers } from "react-icons/fi";
import DashboardHeader from "./components/DashboardHeader";
import RevenueCard from "./components/RevenueCard";
import StatCard from "./components/StatCard";
import FulfillmentCard from "./components/FulfillmentCard";
import SalesHistoryChart from "./components/SalesHistoryChart";
import ContentDistributionChart from "./components/ContentDistributionChart";
import TopSellingCard from "./components/TopSellingCard";
import { fetchAdminDashboardStats } from "../../services/api";

const INITIAL_SALES_HISTORY = [
  { date: "AUG 15", value: 450 },
  { date: "AUG 17", value: 890 },
  { date: "AUG 19", value: 1200 },
  { date: "AUG 21", value: 1598 },
];

const INITIAL_TOP_SELLING = [
  {
    rank: 1,
    name: "Samsung 8.0 Kg Series 5 AI EcoBubble Front Load Washer",
    revenue: "£449.00",
    unitsSold: 12,
    progress: 100,
  },
  {
    rank: 2,
    name: "Miele Built-in Induction Hob, 4 Zone",
    revenue: "£609.00",
    unitsSold: 8,
    progress: 70,
  },
  {
    rank: 3,
    name: "LG 343L Frost-Free Smart Inverter Refrigerator",
    revenue: "£599.00",
    unitsSold: 5,
    progress: 45,
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: "£1,598.00",
    salesChange: "+14.2% from last month",
    totalOrders: "2",
    totalCustomers: "6",
    fulfillmentRate: 100,
  });

  const [categoriesDistribution, setCategoriesDistribution] = useState([
    { label: "Washing Machines", value: 4 },
    { label: "Fridge Freezers", value: 3 },
    { label: "Ovens", value: 2 },
    { label: "Dishwashers", value: 2 },
  ]);

  const loadStats = async () => {
    const data = await fetchAdminDashboardStats();
    if (data) {
      setStats({
        totalSales: `£${data.total_sales.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`,
        salesChange: "+14.2% from last month",
        totalOrders: data.total_orders.toString(),
        totalCustomers: data.total_customers.toString(),
        fulfillmentRate: 98.5,
      });

      if (data.categories && data.categories.length > 0) {
        setCategoriesDistribution(
          data.categories.map((c) => ({ label: c.name, value: c.count }))
        );
      }
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader onRefresh={loadStats} />

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.7fr)_220px_minmax(0,1fr)] lg:grid-rows-[84px_84px]">
        <RevenueCard
          amount={stats.totalSales}
          changeLabel={stats.salesChange}
          className="col-span-1 lg:col-start-1 lg:row-span-2"
        />

        <FulfillmentCard
          rate={stats.fulfillmentRate}
          note="Exceeding target by 3.5%"
          className="col-span-1 lg:col-start-3 lg:row-span-2"
        />

        <div className="col-span-2 grid grid-cols-2 gap-4 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:grid-cols-1 lg:gap-5">
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

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesHistoryChart
            data={INITIAL_SALES_HISTORY}
            total={stats.totalSales}
            totalLabel="AGGREGATE REVENUE (£)"
          />
        </div>
        <ContentDistributionChart items={categoriesDistribution} total={categoriesDistribution.reduce((a, b) => a + b.value, 0)} />
      </div>

      <div>
        <p className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          TOP SELLING APPLIANCES
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INITIAL_TOP_SELLING.map((item) => (
            <TopSellingCard key={item.rank} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;