import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiArrowUpRight, FiCalendar, FiChevronLeft, FiChevronRight, FiTrendingUp, FiX } from "react-icons/fi";

const PERIOD_OPTIONS = [
  { value: "today", label: "Today", step: "day" },
  { value: "week", label: "This week", step: "week" },
  { value: "month", label: "1 month", step: "month" },
  { value: "quarter", label: "3 months", step: "quarter" },
  { value: "half-year", label: "6 months", step: "half-year" },
  { value: "year", label: "Yearly", step: "year" },
];

const addMonths = (date, months) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
};

const formatDay = (date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
const formatMonth = (date) => date.toLocaleDateString("en-US", { month: "short" });

const getPeriodRange = (period, offset) => {
  const today = new Date();
  const anchor = new Date(today);

  if (period === "today") {
    anchor.setDate(anchor.getDate() + offset);
    return { button: offset === 0 ? "Today" : formatDay(anchor), detail: `${formatDay(anchor)}, ${anchor.getFullYear()}` };
  }

  if (period === "week") {
    anchor.setDate(anchor.getDate() + offset * 7);
    const start = new Date(anchor);
    start.setDate(start.getDate() - 6);
    return { button: `${formatDay(start)} - ${formatDay(anchor)}`, detail: `${formatDay(start)} - ${formatDay(anchor)}, ${anchor.getFullYear()}` };
  }

  if (period === "month") {
    const start = addMonths(anchor, offset - 1);
    return { button: `${formatDay(start)} - ${formatDay(anchor)}`, detail: `${formatDay(start)} - ${formatDay(anchor)}, ${anchor.getFullYear()}` };
  }

  if (period === "quarter" || period === "half-year") {
    const monthCount = period === "quarter" ? 3 : 6;
    const start = addMonths(anchor, offset * monthCount - (monthCount - 1));
    const sameYear = start.getFullYear() === anchor.getFullYear();
    const button = sameYear
      ? `${formatMonth(start)} - ${formatMonth(anchor)} ${anchor.getFullYear()}`
      : `${formatMonth(start)} ${start.getFullYear()} - ${formatMonth(anchor)} ${anchor.getFullYear()}`;
    return { button, detail: button };
  }

  const year = anchor.getFullYear() + offset;
  return { button: String(year), detail: `January - December ${year}` };
};

const SalesHistoryChart = ({ data, totalLabel, total }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [periodOffset, setPeriodOffset] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const change = firstValue ? (((lastValue - firstValue) / firstValue) * 100).toFixed(1) : "0.0";
  const selectedPeriodLabel = PERIOD_OPTIONS.find((option) => option.value === selectedPeriod)?.label;
  const periodRange = getPeriodRange(selectedPeriod, periodOffset);

  const movePeriod = (direction) => {
    setPeriodOffset((current) => current + direction);
  };

  const choosePeriod = (value) => {
    setSelectedPeriod(value);
    setPeriodOffset(0);
    setPickerOpen(true);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FiTrendingUp size={14} />
            </span>
            Sales performance
          </p>
          <h2 className="mt-4 text-xl font-extrabold tracking-tight text-navy-950">Total sales history</h2>
          <p className="mt-1 text-sm text-slate-400">Order sales breakdown by date</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <div className="group relative min-w-[168px] overflow-hidden rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md hover:shadow-blue-950/10 sm:text-right">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">{totalLabel}</p>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FiTrendingUp size={14} />
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-600">
                <FiArrowUpRight size={11} />
                {change}% <span className="font-semibold text-slate-400">vs first period</span>
              </span>
              <p className="text-[24px] font-extrabold leading-none tracking-tight text-navy-950">{total}</p>
            </div>
          </div>

          <div className="relative flex items-center gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => movePeriod(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy-950 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            aria-label="Previous period"
          >
            <FiChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={() => setPickerOpen((current) => !current)}
            className="flex h-9 min-w-[140px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-navy-950 transition-colors hover:border-blue-300 hover:bg-blue-50"
            aria-expanded={pickerOpen}
            aria-label="Open date range picker"
          >
            <FiCalendar size={15} className="text-blue-600" />
            {periodRange.button}
          </button>

          <button
            type="button"
            onClick={() => movePeriod(1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy-950 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            aria-label="Next period"
          >
            <FiChevronRight size={17} />
          </button>

          {pickerOpen && (
            <div className="absolute right-0 top-12 z-20 w-[min(360px,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-2xl shadow-navy-950/15">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Date range</p>
                  <p className="mt-1 text-sm font-extrabold text-navy-950">{periodRange.detail}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPickerOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-navy-950"
                  aria-label="Close date range picker"
                >
                  <FiX size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2">
                <div className="border-r border-slate-100 bg-slate-50 p-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Presets</p>
                  <div className="flex flex-col gap-0.5">
                    {PERIOD_OPTIONS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => choosePeriod(preset.value)}
                        className={`rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-colors ${selectedPeriod === preset.value ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected period</p>
                  <p className="text-lg font-extrabold text-navy-950">{selectedPeriodLabel}</p>
                  <p className="text-xs leading-relaxed text-slate-500">Use the arrows to move through each {selectedPeriod === "year" ? "year" : "period"}.</p>
                  <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">{periodRange.detail}</div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      </div>

      <div className="h-72 w-full px-2 pb-4 pt-5 sm:px-5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="salesFillModern" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="65%" stopColor="#22d3ee" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#eef1f6" strokeDasharray="4 4" />
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
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 12,
                boxShadow: "0 12px 30px rgba(15, 27, 46, 0.12)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#salesFillModern)"
              dot={{ r: 3, fill: "#ffffff", stroke: "#2563eb", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#2563eb", stroke: "#ffffff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SalesHistoryChart;
