// import { FiImage, FiTrendingUp } from "react-icons/fi";

// const RevenueCard = ({ label = "Total Sales", amount, changeLabel }) => {
//   return (
//     <div className="flex flex-col justify-between rounded bg-blue-600 p-6 text-white">
//       <div className="flex items-start justify-between">
//         <p className="text-xs font-bold tracking-wider text-white/70">
//           TOTAL REVENUE
//         </p>
//         <span className="flex h-9 w-9 items-center justify-center rounded bg-white/15">
//           <FiImage size={16} />
//         </span>
//       </div>

//       <div className="mt-3">
//         <p className="text-sm font-semibold text-white/90">{label}</p>
//         <p className="mt-1 text-4xl font-extrabold">{amount}</p>
//       </div>

//       {changeLabel && (
//         <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
//           <FiTrendingUp size={13} />
//           {changeLabel}
//         </span>
//       )}
//     </div>
//   );
// };

// export default RevenueCard;


import { FiImage, FiTrendingUp } from "react-icons/fi";

const RevenueCard = ({
  label = "Total Sales",
  amount,
  changeLabel,
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        min-h-[170px]
        w-full
        flex-col
        justify-between
        rounded-lg
        bg-[#0D55D9]
        p-5
        text-white
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/75">
          TOTAL REVENUE
        </p>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
          <FiImage size={17} />
        </span>
      </div>

      {/* Sales */}
      <div className="mt-2">
        <p className="text-[20px] font-semibold leading-tight text-white">
          {label}
        </p>

        <p className="mt-3 text-[34px] font-bold leading-none tracking-tight">
          {amount}
        </p>
      </div>

      {/* Change */}
      {changeLabel && (
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold">
          <FiTrendingUp size={12} />
          {changeLabel}
        </span>
      )}
    </div>
  );
};

export default RevenueCard;

