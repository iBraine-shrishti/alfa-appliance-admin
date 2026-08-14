import { FiRefreshCw } from "react-icons/fi";

const DashboardHeader = ({ onRefresh }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-blue-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          SYSTEM ANALYTICS
        </p>
        <h1 className="text-3xl font-extrabold text-navy-950">
          Dashboard <span className="text-blue-600">Overview</span>
        </h1>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        className="flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-slate-50"
      >
        <FiRefreshCw size={15} />
        Refresh Stats
      </button>
    </div>
  );
};

export default DashboardHeader;
