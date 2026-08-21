import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiArrowUpRight, FiLayers } from "react-icons/fi";

const COLORS = ["#155eef", "#20b8d8", "#7c5cff", "#f59e0b"];

const ContentDistributionChart = ({ items, total, totalLabel = "TOTAL ITEMS" }) => {
  return (
    <section className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FiLayers size={14} />
            </span>
            Content distribution
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-500">Catalog mix by category</p>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
          <FiArrowUpRight size={15} />
        </span>
      </div>

      <div className="relative mx-auto mt-2 h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="label"
              innerRadius={62}
              outerRadius={88}
              paddingAngle={3}
              stroke="none"
            >
              {items.map((entry, index) => (
                <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-extrabold tracking-tight text-navy-950">{total}</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {totalLabel}
          </p>
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-1 gap-2">
        {items.map((item, index) => (
          <li
            key={item.label}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-sm transition-colors hover:bg-blue-50/60"
          >
            <span className="flex min-w-0 items-center gap-2.5 font-semibold text-navy-950">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-white"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="truncate">{item.label}</span>
            </span>
            <span className="ml-3 flex shrink-0 items-baseline gap-2">
              <span className="font-extrabold text-navy-950">{item.value}</span>
              <span className="text-[10px] font-bold text-slate-400">{total ? Math.round((item.value / total) * 100) : 0}%</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContentDistributionChart;
