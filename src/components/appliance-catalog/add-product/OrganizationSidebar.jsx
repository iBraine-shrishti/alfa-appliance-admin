import { useState, useEffect, useMemo } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { applianceCategories } from "../../../data/applianceCategories";
import { productCollectionOptions } from "../../../data/productCollectionOptions";
import { fetchAdminCollections } from "../../../services/api";

const OrganizationSidebar = ({ form, onChange, onToggleCollection }) => {
  const [collectionSearch, setCollectionSearch] = useState("");
  const [allOptions, setAllOptions] = useState(productCollectionOptions);

  useEffect(() => {
    // Attempt to merge live collections from backend with default collection list
    fetchAdminCollections()
      .then((apiCols) => {
        if (apiCols && apiCols.length > 0) {
          const apiTitles = apiCols.map((c) => c.title || c.name).filter(Boolean);
          const merged = Array.from(new Set([...apiTitles, ...productCollectionOptions]));
          setAllOptions(merged);
        }
      })
      .catch(() => {
        // Fallback already set to productCollectionOptions
      });
  }, []);

  const filteredCollections = useMemo(() => {
    if (!collectionSearch.trim()) return allOptions;
    const q = collectionSearch.toLowerCase();
    return allOptions.filter((opt) => opt.toLowerCase().includes(q));
  }, [allOptions, collectionSearch]);

  const selectedCount = form.collections?.length || 0;

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <p className="mb-5 text-sm font-bold text-navy-950">Organization</p>

      <div className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Category</label>
          <div className="relative">
            <select
              value={form.category}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full appearance-none rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none focus:border-blue-600"
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
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-bold tracking-wider text-slate-500">
              Collections {selectedCount > 0 && <span className="text-blue-600 font-semibold">({selectedCount} selected)</span>}
            </label>
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={() => onChange("collections", [])}
                className="text-[11px] text-slate-400 hover:text-rose-500"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="rounded border border-slate-200 bg-white p-2.5">
            {/* Search filter for collections */}
            <div className="relative mb-2">
              <FiSearch className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                value={collectionSearch}
                onChange={(e) => setCollectionSearch(e.target.value)}
                placeholder="Search collections..."
                className="w-full rounded border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2.5 text-xs text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div className="flex max-h-56 flex-col gap-1.5 overflow-y-auto pr-1">
              {filteredCollections.length === 0 ? (
                <p className="py-2 text-center text-xs text-slate-400">No matching collections</p>
              ) : (
                filteredCollections.map((option) => {
                  const isChecked = form.collections.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 text-xs transition-colors hover:bg-slate-50 ${
                        isChecked ? "bg-blue-50/60 font-semibold text-blue-900" : "text-navy-950"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCollection(option)}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="truncate">{option}</span>
                    </label>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Weight</label>
          <input
            type="text"
            value={form.weight}
            onChange={(e) => onChange("weight", e.target.value)}
            placeholder="e.g. 85kg"
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        {/* Sales Toggle Button with corrected CSS */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-navy-950">Sale Status</p>
              {form.onSale && (
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase">
                  On Sale
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Show promotional sale badge</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={Boolean(form.onSale)}
            onClick={() => onChange("onSale", !form.onSale)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
              form.onSale ? "bg-blue-600" : "bg-slate-200"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                form.onSale ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSidebar;

