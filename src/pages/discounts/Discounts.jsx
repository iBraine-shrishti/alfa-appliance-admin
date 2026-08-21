import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiActivity, FiEdit2, FiPlus, FiSearch, FiTag, FiTrash2, FiZap } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";

const INITIAL_DISCOUNTS = [];
const TABS = ["All", "Active", "Scheduled", "Expired"];

const Discounts = () => {
  const [discounts, setDiscounts] = useState(INITIAL_DISCOUNTS);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filteredDiscounts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return discounts.filter((discount) => {
      const matchesSearch = !query || discount.code.toLowerCase().includes(query);
      const matchesTab = activeTab === "All" || discount.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [activeTab, discounts, search]);

  const handleDelete = (id) => {
    setDiscounts((current) => current.filter((discount) => discount.id !== id));
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        eyebrow="PROMOTIONS"
        title={<>All <span className="text-blue-600">Discounts</span></>}
        subtitle="Create focused offers and track promotional performance."
        actions={
          <Link to="/admin/discounts/create" className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-500">
            <FiPlus size={15} /> Create discount
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><FiTag size={16} /></span>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Total codes</p><p className="mt-0.5 text-lg font-extrabold text-navy-950">{discounts.length}</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><FiActivity size={16} /></span>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Active now</p><p className="mt-0.5 text-lg font-extrabold text-navy-950">{discounts.filter((discount) => discount.status === "Active").length}</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><FiZap size={16} /></span>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Total redemptions</p><p className="mt-0.5 text-lg font-extrabold text-navy-950">{discounts.reduce((sum, discount) => sum + (discount.used || 0), 0)}</p></div>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${activeTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-navy-950"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:max-w-[260px]">
            <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search discount codes..." className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Discount value</th>
                <th className="px-6 py-4">Usage</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiscounts.map((discount) => (
                <tr key={discount.id} className="border-b border-slate-50 last:border-0 hover:bg-blue-50/30">
                  <td className="px-6 py-4 font-extrabold text-navy-950">{discount.code}</td>
                  <td className="px-6 py-4 text-slate-500">{discount.status}</td>
                  <td className="px-6 py-4 font-bold text-navy-950">{discount.value}%</td>
                  <td className="px-6 py-4 text-slate-500">{discount.used} / {discount.limit || "Unlimited"}</td>
                  <td className="px-6 py-4"><div className="flex justify-end gap-2"><button type="button" className="text-slate-400 hover:text-blue-600" aria-label="Edit discount"><FiEdit2 size={15} /></button><button type="button" onClick={() => handleDelete(discount.id)} className="text-slate-400 hover:text-red-600" aria-label="Delete discount"><FiTrash2 size={15} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDiscounts.length === 0 && (
          <div className="flex min-h-[180px] flex-col items-center justify-center border-t border-slate-100 px-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><FiTag size={20} /></span>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-300">No discounts yet</p>
            <p className="mt-1 max-w-xs text-sm text-slate-400">Launch your first offer and it will appear here.</p>
            <Link to="/admin/discounts/create" className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-navy-950 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-600"><FiPlus size={13} /> Create discount</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Discounts;
