import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#1d4ed8", "#60a5fa", "#bfdbfe", "#e0e7ff"];

const ContentDistributionChart = ({ items, total, totalLabel = "TOTAL ITEMS" }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        CONTENT DISTRIBUTION
      </p>

      <div className="relative mx-auto mt-4 h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="label"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {items.map((entry, index) => (
                <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-extrabold text-navy-950">{total}</p>
          <p className="text-[10px] font-bold tracking-wider text-slate-400">
            {totalLabel}
          </p>
        </div>
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {items.map((item, index) => (
          <li
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 font-semibold text-navy-950">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.label}
            </span>
            <span className="font-bold text-slate-500">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentDistributionChart;
