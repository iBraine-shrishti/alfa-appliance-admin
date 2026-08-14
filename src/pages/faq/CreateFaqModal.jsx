import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const PRODUCT_OPTIONS = [
  "GLOBAL / GENERAL (Shows everywhere)",
  "ALFA-9000",
  "PRO-WASH SERIES",
  "ARCTIC FROST SERIES",
];

const emptyForm = { question: "", answer: "", product: PRODUCT_OPTIONS[0] };

const CreateFaqModal = ({ open, faq, onClose, onSave }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      setForm(
        faq
          ? { question: faq.question, answer: faq.answer, product: faq.product }
          : emptyForm
      );
    }
  }, [open, faq]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: faq?.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 px-4">
      <div className="w-full max-w-lg rounded bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-extrabold text-navy-950">
              {faq ? "Edit FAQ" : "Create New FAQ"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Add a new question and detailed explanation to the knowledge base.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-navy-950"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
              QUESTION (HELP QUERY) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              placeholder="e.g., How do I reset the main control board?"
              className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
              ANSWER (DETAILED EXPLANATION) <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={form.answer}
              onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
              placeholder="Provide step-by-step instructions or policy details here..."
              className="w-full resize-y rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
              ASSOCIATED PRODUCT (OPTIONAL)
            </label>
            <select
              value={form.product}
              onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
              className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none focus:border-blue-600"
            >
              {PRODUCT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Save FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFaqModal;
