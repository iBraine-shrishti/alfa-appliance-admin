import { useMemo, useState } from "react";
import { FiCheck, FiSearch, FiSave, FiAlertTriangle, FiActivity, FiBox } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import Pagination from "../../components/Pagination";
import { adminProducts } from "../../data/adminProducts";

const LOW_STOCK_LIMIT = 5;
const PAGE_SIZE = 10;

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(adminProducts.map((product) => [product.id, String(product.inventory)])),
  );
  const [savedIds, setSavedIds] = useState([]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return adminProducts.filter(
      (product) =>
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.id.toLowerCase().includes(normalizedSearch),
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const pageProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateQuantity = (id, value) => {
    setQuantities((current) => ({ ...current, [id]: value.replace(/[^0-9]/g, "") }));
    setSavedIds((current) => current.filter((savedId) => savedId !== id));
  };

  const saveQuantity = (id) => {
    setSavedIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  const totalUnits = Object.values(quantities).reduce((total, quantity) => total + Number(quantity || 0), 0);
  const outOfStock = Object.values(quantities).filter((quantity) => Number(quantity || 0) === 0).length;
  const lowStock = Object.values(quantities).filter(
    (quantity) => Number(quantity || 0) > 0 && Number(quantity || 0) <= LOW_STOCK_LIMIT,
  ).length;
  const healthyProducts = adminProducts.length - outOfStock - lowStock;
  const stockHealth = Math.round((healthyProducts / adminProducts.length) * 100);
  const stockSegments = [
    { label: "Healthy", value: healthyProducts, color: "bg-blue-600" },
    { label: "Low stock", value: lowStock, color: "bg-amber-400" },
    { label: "Out of stock", value: outOfStock, color: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="STOCK MANAGEMENT"
        title={<>Product <span className="text-blue-600">Inventory</span></>}
        subtitle={`Managing stock quantities across ${adminProducts.length} products`}
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_1.85fr]">
        <div className="relative overflow-hidden rounded border border-navy-950 bg-navy-900 p-6 text-white">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[18px] border-blue-500/20" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                <FiActivity size={14} />
                Stock health
              </div>
              <p className="mt-5 text-4xl font-extrabold tracking-tight">{totalUnits}</p>
              <p className="mt-1 text-sm text-slate-300">Total units across your catalog</p>
            </div>
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(#3b82f6 ${stockHealth}%, rgba(255,255,255,0.12) 0)` }}
              aria-label={`${stockHealth}% of products are healthy`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-950 text-sm font-extrabold">
                {stockHealth}%
              </div>
            </div>
          </div>
          <div className="relative mt-7 flex h-2 overflow-hidden rounded-full bg-white/10">
            {stockSegments.map((segment) => (
              <div
                key={segment.label}
                className={segment.color}
                style={{ width: `${(segment.value / adminProducts.length) * 100}%` }}
              />
            ))}
          </div>
          <div className="relative mt-3 flex justify-between text-[11px] font-semibold text-slate-300">
            {stockSegments.map((segment) => (
              <span key={segment.label} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${segment.color}`} />
                {segment.label} {segment.value}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded border border-slate-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-50 text-blue-600"><FiBox size={17} /></div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Product lines</p>
            <p className="mt-1 text-3xl font-extrabold text-navy-950">{adminProducts.length}</p>
            <p className="mt-1 text-xs text-slate-400">Being tracked</p>
          </div>
          <div className="rounded border border-slate-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-amber-50 text-amber-600"><FiAlertTriangle size={17} /></div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Low stock</p>
            <p className="mt-1 text-3xl font-extrabold text-amber-600">{lowStock}</p>
            <p className="mt-1 text-xs text-slate-400">Needs attention</p>
          </div>
          <div className="rounded border border-slate-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-red-50 text-red-600"><FiAlertTriangle size={17} /></div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Out of stock</p>
            <p className="mt-1 text-3xl font-extrabold text-red-600">{outOfStock}</p>
            <p className="mt-1 text-xs text-slate-400">Requires replenishment</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search by product name or ID..."
          className="w-full rounded border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
        />
      </div>

      <div className="overflow-hidden rounded border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                <th className="px-5 py-4">Image</th>
                <th className="px-5 py-4">Product Name</th>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4 text-center">Update Stock</th>
                <th className="px-5 py-4 text-center">In Stock</th>
                <th className="px-5 py-4 text-center">Save</th>
              </tr>
            </thead>
            <tbody>
              {pageProducts.map((product) => {
                const quantity = Number(quantities[product.id] || 0);
                const isSaved = savedIds.includes(product.id);
                const isOut = quantity === 0;
                const isLow = quantity > 0 && quantity <= LOW_STOCK_LIMIT;

                return (
                  <tr key={product.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-5 py-4">
                     <div className="flex h-30 w-30 items-center justify-center overflow-hidden rounded border border-slate-200 bg-slate-50"><img src={product.image} alt={product.name} className="h-full w-full object-cover p-1" /></div>

                    </td>
                    <td className="max-w-[380px] px-5 py-4">
                      <p className="font-bold text-navy-950">{product.name}</p>
                      <p className="mt-1 truncate text-xs font-semibold uppercase tracking-wider text-slate-400">/{product.id}</p>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs font-semibold text-slate-500">ID-{product.id.slice(0, 6).toUpperCase()}</td>
                    <td className="px-5 py-4 text-center">
                      <input
                        type="number"
                        min="0"
                        value={quantities[product.id]}
                        onChange={(event) => updateQuantity(product.id, event.target.value)}
                        aria-label={`Update stock for ${product.name}`}
                        className="w-24 rounded border border-slate-200 bg-white px-3 py-2.5 text-center font-bold text-navy-950 outline-none focus:border-blue-600"
                      />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 font-bold ${isOut || isLow ? "text-red-600" : "text-blue-600"}`}>
                        {isOut && <FiAlertTriangle size={13} />}
                        {quantity} {quantity === 1 ? "item" : "items"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => saveQuantity(product.id)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded border ${isSaved ? "border-green-200 bg-green-50 text-green-600" : "border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-600"}`}
                        aria-label={`Save stock for ${product.name}`}
                        title={isSaved ? "Stock saved" : "Save stock"}
                      >
                        {isSaved ? <FiCheck size={16} /> : <FiSave size={15} />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && <p className="px-5 py-12 text-center text-sm text-slate-400">No products match your search.</p>}
        {filteredProducts.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            totalEntries={filteredProducts.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;