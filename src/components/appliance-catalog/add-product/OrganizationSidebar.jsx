import { FiChevronDown } from "react-icons/fi";
import { applianceCategories } from "../../../data/applianceCategories";
import { productCollectionOptions } from "../../../data/productCollectionOptions";

const OrganizationSidebar = ({ form, onChange, onToggleCollection }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="mb-5 text-sm font-bold text-navy-950">Organization</p>

      <div className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Category</label>
          <div className="relative">
            <select
              value={form.category}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none focus:border-blue-600"
            >
              {applianceCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Collections</label>
          <div className="flex flex-col gap-2 rounded-lg border border-slate-200 p-3">
            {productCollectionOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-navy-950">
                <input
                  type="checkbox"
                  checked={form.collections.includes(option)}
                  onChange={() => onToggleCollection(option)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Weight</label>
          <input
            type="text"
            value={form.weight}
            onChange={(e) => onChange("weight", e.target.value)}
            placeholder="e.g. 85kg"
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-sm font-bold text-navy-950">Sale Status</p>
            <p className="text-xs text-slate-400">Show on sale</p>
          </div>
          <button
            type="button"
            onClick={() => onChange("onSale", !form.onSale)}
            className={`relative h-6 w-11 rounded-full transition-colors ${form.onSale ? "bg-blue-600" : "bg-slate-200"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.onSale ? "translate-x-5" : "translate-x-0.5"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSidebar;
