// import { useState } from "react";
// import { FiShoppingCart, FiUsers } from "react-icons/fi";
// import Sidebar from "../../components/Sidebar";
// import DashboardHeader from "./components/DashboardHeader";
// import RevenueCard from "./components/RevenueCard";
// import StatCard from "./components/StatCard";
// import FulfillmentCard from "./components/FulfillmentCard";
// import SalesHistoryChart from "./components/SalesHistoryChart";
// import ContentDistributionChart from "./components/ContentDistributionChart";
// import TopSellingCard from "./components/TopSellingCard";



// const SALES_HISTORY = [
//   { date: "JUL 27", value: 58000 },
//   { date: "JUL 30", value: 62000 },
//   { date: "AUG 02", value: 55000 },
//   { date: "AUG 05", value: 92400 },
//   { date: "AUG 07", value: 68000 },
//   { date: "AUG 10", value: 71000 },
// ];
 
// const CONTENT_DISTRIBUTION = [
//   { label: "Washing Machines", value: 512 },
//   { label: "Refrigerators", value: 170 },
//   { label: "Ovens", value: 85 },
//   { label: "Dishwashers", value: 87 },
// ];
 
// const TOP_SELLING = [
//   {
//     rank: 1,
//     name: "Alfa ProWash 9000 Series Front Load",
//     revenue: "$45,000",
//     unitsSold: 45,
//     progress: 100,
//   },
//   {
//     rank: 2,
//     name: "Arctic Frost Multi-Door Refrigerator",
//     revenue: "$32,500",
//     unitsSold: 25,
//     progress: 65,
//   },
//   {
//     rank: 3,
//     name: "Chefmaster Built-In Convection Oven",
//     revenue: "$18,200",
//     unitsSold: 14,
//     progress: 35,
//   },
// ];
 
// const Dashboard = () => {
//   const [stats] = useState({
//     totalSales: "$124,500",
//     salesChange: "+12.5% from last month",
//     totalOrders: "1,204",
//     totalCustomers: "8,540",
//     fulfillmentRate: 98.5,
//   });
 
//   const handleRefresh = () => {
//     // TODO: refetch dashboard stats from the API.
//   };
 
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <Sidebar />
 
//       <main className="flex-1 overflow-y-auto p-8">
//         <DashboardHeader onRefresh={handleRefresh} />
 
//         <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           <RevenueCard amount={stats.totalSales} changeLabel={stats.salesChange} />
 
//           <div className="flex flex-col gap-5">
//             <StatCard icon={FiShoppingCart} label="TOTAL ORDERS" value={stats.totalOrders} />
//             <StatCard icon={FiUsers} label="TOTAL CUSTOMERS" value={stats.totalCustomers} />
//           </div>
 
//           <FulfillmentCard
//             rate={stats.fulfillmentRate}
//             note="Exceeding target by 3.5%"
//             className="sm:col-span-2 lg:col-span-1"
//           />
//         </div>
 
//         <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <SalesHistoryChart
//               data={SALES_HISTORY}
//               total="$124,500"
//               totalLabel="AGGREGATE SALES"
//             />
//           </div>
//           <ContentDistributionChart items={CONTENT_DISTRIBUTION} total={854} />
//         </div>
 
//         <div className="mt-5">
//           <p className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400">
//             <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
//             TOP SELLING APPLIANCES
//           </p>
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {TOP_SELLING.map((item) => (
//               <TopSellingCard key={item.rank} {...item} />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
 
// export default Dashboard;


import { useState } from "react";
import { FiShoppingCart, FiUsers } from "react-icons/fi";
// import Sidebar from "../../components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import RevenueCard from "./components/RevenueCard";
import StatCard from "./components/StatCard";
import FulfillmentCard from "./components/FulfillmentCard";
import SalesHistoryChart from "./components/SalesHistoryChart";
import ContentDistributionChart from "./components/ContentDistributionChart";
import TopSellingCard from "./components/TopSellingCard";


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
  },
  {
    rank: 2,
    name: "Arctic Frost Multi-Door Refrigerator",
    revenue: "$32,500",
    unitsSold: 25,
    progress: 65,
  },
  {
    rank: 3,
    name: "Chefmaster Built-In Convection Oven",
    revenue: "$18,200",
    unitsSold: 14,
    progress: 35,
  },
];

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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <RevenueCard amount={stats.totalSales} changeLabel={stats.salesChange} />

        <div className="flex h-full flex-col gap-5">
          <StatCard icon={FiShoppingCart} label="TOTAL ORDERS" value={stats.totalOrders} />
          <StatCard icon={FiUsers} label="TOTAL CUSTOMERS" value={stats.totalCustomers} />
        </div>

        <FulfillmentCard
          rate={stats.fulfillmentRate}
          note="Exceeding target by 3.5%"
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

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