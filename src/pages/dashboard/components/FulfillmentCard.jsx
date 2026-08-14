// import { FiTruck } from "react-icons/fi";

// const FulfillmentCard = ({
//   rate = 98.5,
//   note,
//   deliveryLabel = "ON-TIME DELIVERY",
//   className = "",
// }) => {
//   return (
//     <div className={`rounded border border-slate-200 bg-white p-5 ${className}`}>
//       <p className="text-xs font-bold tracking-wider text-slate-400">
//         FULFILLMENT RATE
//       </p>
//       <p className="mt-1 text-3xl font-extrabold text-navy-950">{rate}%</p>

//       <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
//         <div
//           className="h-full rounded-full bg-blue-600"
//           style={{ width: `${Math.min(rate, 100)}%` }}
//         />
//       </div>

//       {note && <p className="mt-2 text-xs text-slate-400">{note}</p>}

//       <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-blue-600">
//         <FiTruck size={13} />
//         {deliveryLabel}
//       </p>
//     </div>
//   );
// };

// export default FulfillmentCard;

import { FiTruck } from "react-icons/fi";

const FulfillmentCard = ({
  rate = 98.5,
  note,
  deliveryLabel = "ON-TIME DELIVERY",
  className = "",
}) => {
  return (
    <div
      className={`
        relative
        row-span-2
        flex
        min-h-[170px]
        w-full
        flex-col
        overflow-hidden
        rounded-lg
        border
        border-slate-200
        bg-white
        p-5
        ${className}
      `}
    >
      {/* Subtle top-right shape */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#F0F3FF]" />

      <p className="relative text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
        FULFILLMENT RATE
      </p>

      <p className="relative mt-2 text-[30px] font-extrabold leading-none text-navy-950">
        {rate}%
      </p>

      <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#1D60FF]"
          style={{
            width: `${Math.min(rate, 100)}%`,
          }}
        />
      </div>

      {note && (
        <p className="relative mt-2 text-[9px] text-slate-500">
          {note}
        </p>
      )}

      <p className="relative mt-auto flex items-center gap-1.5 pt-4 text-[9px] font-bold text-[#1D60FF]">
        <FiTruck size={12} />
        {deliveryLabel}
      </p>
    </div>
  );
};

export default FulfillmentCard;