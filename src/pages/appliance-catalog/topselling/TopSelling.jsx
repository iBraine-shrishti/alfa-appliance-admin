import { useState } from "react";
import { FiSearch, FiExternalLink, FiRefreshCw } from "react-icons/fi";
import PageHeader from "../../../components/PageHeader";
import TopSellingFeatured from "./TopSellingFeatured";
import TopSellingGridItem from "./TopSellingGridItem";

const INITIAL_SLOTS = [
  { spot: 1, product: { id: "tx-20m", name: 'TitanX Commercial 20QT Planetary Stand Mixer (TX-20M)', price: "1,499.00", image: "/images/products/tx-20m.png" } },
  { spot: 2, product: { id: "pf-40g", name: 'ProFry High Capacity 40lb Floor Gas Fryer with Twin Baskets (PF-40G)', price: "849.00", image: "/images/products/pf-40g.png" } },
  { spot: 3, product: { id: "as-16v", name: 'AeroSeal 16" Commercial Chamber Vacuum Sealer Machine (AS-16V)', price: "1,120.00", image: "/images/products/as-16v.png" } },
  { spot: 4, product: { id: "pc-12a", name: 'PreciCut 12" Automatic Gravity Feed Meat Slicer 1/2 HP (PC-12A)', price: "649.00", image: "/images/products/pc-12a.png" } },
  { spot: 5, product: null },
];

const TopSelling = () => {
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [dirty, setDirty] = useState(false);

  const featured = slots.find((s) => s.spot === 1);
  const gridSlots = slots.filter((s) => s.spot !== 1);

  const moveSlot = (spot, direction) => {
    setSlots((prev) => {
      const index = prev.findIndex((s) => s.spot === spot);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;

      const next = [...prev];
      [next[index].product, next[targetIndex].product] = [
        next[targetIndex].product,
        next[index].product,
      ];
      return next;
    });
    setDirty(true);
  };

  const removeSlot = (spot) => {
    setSlots((prev) => prev.map((s) => (s.spot === spot ? { ...s, product: null } : s)));
    setDirty(true);
  };

  const assignedCount = slots.filter((s) => s.product).length;

  return (
    <div className="flex flex-col gap-6 pb-20">
      <PageHeader
        eyebrow="HOMEPAGE MANAGER"
        title="Top Selling Items"
        subtitle="Control the exact appliances and order displayed in the top selling section on the storefront homepage."
        actions={
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
          >
            <FiExternalLink size={15} />
            View Storefront
          </a>
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-bold text-navy-950">Add Product to Top Selling</p>
          <span className="text-xs font-semibold text-slate-400">
            {assignedCount} Products Assigned
          </span>
        </div>
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search appliance by title or SKU to add..."
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-navy-950">Homepage Display Order</p>
            <p className="mt-1 text-xs text-slate-400">
              Position #1 is featured on the left. Positions #2–#5 appear in the 2×2 right grid.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-navy-950 hover:bg-slate-50"
          >
            <FiRefreshCw size={13} />
            Refresh List
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <TopSellingFeatured product={featured?.product} onEdit={() => {}} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gridSlots.map((s) => (
              <TopSellingGridItem
                key={s.spot}
                spot={s.spot}
                product={s.product}
                onMoveUp={() => moveSlot(s.spot, "up")}
                onMoveDown={() => moveSlot(s.spot, "down")}
                onRemove={() => removeSlot(s.spot)}
                onAssign={() => {}}
              />
            ))}
          </div>
        </div>
      </div>

      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-6 lg:pl-64">
          <div className="flex w-full max-w-xl items-center justify-between rounded-xl bg-navy-950 px-5 py-4 shadow-lg">
            <p className="text-sm text-white/80">Unsaved changes to homepage layout</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSlots(INITIAL_SLOTS);
                  setDirty(false);
                }}
                className="text-sm font-semibold text-white/60 hover:text-white"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => setDirty(false)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Save Layout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSelling;
