import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiCheckCircle, FiCode, FiSave, FiTag } from "react-icons/fi";
import { createDiscount } from "../../services/api";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ code: "", percentage: "10", minimum: "0", startDate: "", endDate: "" });

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const generateCode = () => update("code", `ALFA${Math.random().toString(36).slice(2, 8).toUpperCase()}`);

  const handleSave = async () => {
    if (!form.code.trim()) {
      alert("Please enter or generate a discount code.");
      return;
    }
    setLoading(true);
    try {
      await createDiscount({
        code: form.code.trim().toUpperCase(),
        discount_percentage: parseInt(form.percentage || "10", 10),
        minimum_purchase_amount: parseFloat(form.minimum || "0"),
        active: true,
        valid_from: form.startDate ? new Date(form.startDate).toISOString() : new Date().toISOString(),
        valid_to: form.endDate ? new Date(form.endDate).toISOString() : new Date(Date.now() + 365*86400000).toISOString(),
      });
      navigate("/admin/discounts");
    } catch (err) {
      alert("Failed to create discount code. Make sure the code is unique.");
      setLoading(false);
    }
  };

  const summary = useMemo(() => ({
    code: form.code || "No code set",
    value: form.percentage ? `${form.percentage}% off` : "No value set",
    dates: form.startDate && form.endDate ? `${form.startDate} to ${form.endDate}` : "Active immediately",
  }), [form]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate("/admin/discounts")} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-navy-950 hover:bg-blue-50 hover:text-blue-600" aria-label="Back to discounts"><FiArrowLeft size={17} /></button>
          <div><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> New discount</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy-950">Create <span className="text-blue-600">Discount</span></h1></div>
        </div>
        <button type="button" disabled={loading} onClick={handleSave} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-50"><FiSave size={15} /> {loading ? "Saving..." : "Save discount"}</button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)]">
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="flex items-center gap-2 border-b border-slate-100 pb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-navy-950"><FiTag className="text-blue-600" size={16} /> Coupon details</h2>
            <div className="mt-6">
              <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Discount code</label>
              <div className="mt-2 flex gap-2"><input value={form.code} onChange={(event) => update("code", event.target.value.toUpperCase())} placeholder="E.G. SUMMER2024" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600" /><button type="button" onClick={generateCode} className="rounded-xl bg-blue-50 px-4 text-xs font-bold uppercase tracking-wider text-blue-600 hover:bg-blue-100"><FiCode className="mr-1 inline" size={14} /> Generate</button></div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2"><label className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Discount percentage (%)<div className="relative mt-2"><input type="number" min="1" max="100" value={form.percentage} onChange={(event) => update("percentage", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm font-bold text-navy-950 outline-none focus:border-blue-600" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">%</span></div></label><label className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Minimum purchase (£)<input type="number" min="0" value={form.minimum} onChange={(event) => update("minimum", event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-navy-950 outline-none focus:border-blue-600" /></label></div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><h2 className="flex items-center gap-2 border-b border-slate-100 pb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-navy-950"><FiCalendar className="text-blue-600" size={16} /> Active dates</h2><div className="mt-6 grid gap-5 sm:grid-cols-2"><label className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Start date<input type="date" value={form.startDate} onChange={(event) => update("startDate", event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-navy-950 outline-none focus:border-blue-600" /></label><label className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">End date<input type="date" value={form.endDate} onChange={(event) => update("endDate", event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-navy-950 outline-none focus:border-blue-600" /></label></div></section>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-navy-950">Summary</h2><div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">Coupon code</p><p className="mt-3 text-2xl font-extrabold tracking-tight text-navy-950">{summary.code}</p><p className="mt-2 text-sm font-bold text-blue-600">{summary.value}</p></div><div className="mt-6 space-y-4 text-sm"><p className="flex items-center gap-2 font-semibold text-slate-600"><FiCheckCircle className="text-emerald-500" size={15} /> {summary.value}</p><p className="flex items-center gap-2 font-semibold text-slate-600"><FiCheckCircle className="text-emerald-500" size={15} /> Global order application</p><p className="flex items-center gap-2 font-semibold text-slate-600"><FiCheckCircle className="text-emerald-500" size={15} /> {form.minimum && Number(form.minimum) > 0 ? `Minimum purchase £${form.minimum}` : "No minimum"}</p><p className="border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400">{summary.dates}</p></div></aside>
      </div>
    </div>
  );
};

export default CreateDiscount;
