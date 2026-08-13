import { FiImage, FiTrendingUp } from "react-icons/fi";

const RevenueCard = ({ label = "Total Sales", amount, changeLabel }) => {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-blue-600 p-6 text-white">
      <div className="flex items-start justify-between">
        <p className="text-xs font-bold tracking-wider text-white/70">
          TOTAL REVENUE
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
          <FiImage size={16} />
        </span>
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold text-white/90">{label}</p>
        <p className="mt-1 text-4xl font-extrabold">{amount}</p>
      </div>

      {changeLabel && (
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          <FiTrendingUp size={13} />
          {changeLabel}
        </span>
      )}
    </div>
  );
};

export default RevenueCard;
