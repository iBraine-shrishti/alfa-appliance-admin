// const StatCard = ({ icon: Icon, label, value }) => {
//   return (
//     <div className="flex items-center gap-4 rounded border border-slate-200 bg-white p-5">
//       <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600">
//         <Icon size={18} />
//       </span>
//       <div>
//         <p className="text-xs font-bold tracking-wider text-slate-400">
//           {label}
//         </p>
//         <p className="mt-1 text-2xl font-extrabold text-navy-950">{value}</p>
//       </div>
//     </div>
//   );
// };

// export default StatCard;



const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div
      className="
        flex
        min-h-[78px]
        w-full
        items-center
        gap-3
        rounded-lg
        border
        border-slate-200
        bg-white
        px-4
        py-3
      "
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF] text-[#1D60FF]">
        <Icon size={17} />
      </span>

      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.08em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-[18px] font-extrabold leading-none text-navy-950">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;

