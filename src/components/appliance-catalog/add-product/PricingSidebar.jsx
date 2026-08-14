import { FiTag } from "react-icons/fi";

const PricingSidebar = ({ form, onChange }) => {
  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <p className="mb-5 flex items-center gap-2 text-sm font-bold text-navy-950">
        <FiTag size={15} className="text-red-500" />
        Pricing
      </p>

      <div className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Price (£)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => onChange("price", e.target.value)}
            placeholder="0.00"
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Old Price (£)</label>
          <input
            type="number"
            value={form.oldPrice}
            onChange={(e) => onChange("oldPrice", e.target.value)}
            placeholder="0.00"
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingSidebar;
