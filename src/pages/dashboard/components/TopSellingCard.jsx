import { FiArrowUpRight, FiDollarSign, FiShoppingBag, FiTrendingUp } from "react-icons/fi";

const TopSellingCard = ({ rank, name, revenue, unitsSold, progress, image: productImage }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-950 text-lg font-extrabold text-white shadow-lg shadow-navy-950/15">
            {String(rank).padStart(2, "0")}
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
              <FiTrendingUp size={12} />
              Rank #{rank}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Top performer</p>
          </div>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <FiArrowUpRight size={15} />
        </span>
      </div>

      {productImage && <div className="mt-4 flex h-24 items-center justify-center rounded-xl bg-slate-50"><img src={productImage} alt={name} className="h-full w-full object-contain p-2" /></div>}
      <h3 className="mt-6 min-h-[44px] text-base font-extrabold leading-snug text-navy-950">
        {name}
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <FiDollarSign size={12} className="text-blue-600" />
            Revenue
          </p>
          <p className="mt-2 text-lg font-extrabold text-navy-950">{revenue}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <FiShoppingBag size={12} className="text-blue-600" />
            Units sold
          </p>
          <p className="mt-2 text-lg font-extrabold text-navy-950">{unitsSold}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>Sales contribution</span>
        <span className="text-blue-600">{progress}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </article>
  );
};

export default TopSellingCard;
