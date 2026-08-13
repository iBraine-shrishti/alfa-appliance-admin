const TopSellingCard = ({ rank, name, revenue, unitsSold, progress }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold tracking-wider text-blue-600">
        RANK #{rank}
      </p>
      <h3 className="mt-2 text-sm font-extrabold uppercase leading-snug text-navy-950">
        {name}
      </h3>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-400">Total Revenue</span>
        <span className="font-bold text-navy-950">{revenue}</span>
      </div>
      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="text-slate-400">Units Sold</span>
        <span className="font-bold text-navy-950">{unitsSold}</span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default TopSellingCard;
