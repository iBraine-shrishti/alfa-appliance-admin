const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs font-bold tracking-wider text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-2xl font-extrabold text-navy-950">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
