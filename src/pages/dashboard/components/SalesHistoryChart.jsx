import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesHistoryChart = ({ data, totalLabel, total }) => {
  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            TOTAL SALES HISTORY
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Order Sales Breakdown by Date
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-extrabold text-navy-950">{total}</p>
          <p className="text-xs font-bold tracking-wider text-blue-600">
            {totalLabel}
          </p>
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#eef1f6" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(v) => `${v / 1000}K`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Net Sales"]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#salesFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesHistoryChart;
