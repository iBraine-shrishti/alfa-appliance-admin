import { useEffect, useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { applianceCategories as fallbackCategories } from "../../../data/applianceCategories";
import { fetchAdminCategories } from "../../../services/api";

const PRODUCT_STATUSES = ["On Sale", "Active"];

const ProductFilters = ({ search, onSearchChange, category, onCategoryChange, status, onStatusChange }) => {
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    const loadCats = async () => {
      const catData = await fetchAdminCategories();
      if (catData && catData.length > 0) {
        setCategories(catData.map((c) => c.name));
      }
    };
    loadCats();
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
        />
      </div>

      <div className="relative">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none rounded border border-slate-200 bg-white py-2.5 pl-4 pr-9 text-sm font-semibold text-navy-950 outline-none focus:border-blue-600"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
      </div>

      <div className="relative">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none rounded border border-slate-200 bg-white py-2.5 pl-4 pr-9 text-sm font-semibold text-navy-950 outline-none focus:border-blue-600"
        >
          <option value="">All Status</option>
          {PRODUCT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
      </div>
    </div>
  );
};

export default ProductFilters;
