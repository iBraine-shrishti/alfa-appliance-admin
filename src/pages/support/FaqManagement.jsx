import { useMemo, useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import FaqTable from "./FaqTable";
import CreateFaqModal from "./CreateFaqModal";

// TODO: replace with real API data.
const INITIAL_FAQS = [
  {
    id: 1,
    question: "How do I calibrate the ALFA-9000 sensor?",
    answer: "Ensure the unit is powered off before connecting the calibration probe to port A...",
    product: "ALFA-9000",
  },
  {
    id: 2,
    question: "What is the warranty period for commercial units?",
    answer: "All commercial appliances come with a standard 24-month parts and labour warranty...",
    product: "GLOBAL / GENERAL (Shows everywhere)",
  },
  {
    id: 3,
    question: "Error Code E-45 Troubleshooting",
    answer: "E-45 indicates a pressure valve failure. Please check the inlet hose for blockages...",
    product: "PRO-WASH SERIES",
  },
];

const FaqManagement = () => {
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs;
    const q = search.toLowerCase();
    return faqs.filter((f) => f.question.toLowerCase().includes(q));
  }, [faqs, search]);

  const openCreate = () => {
    setEditingFaq(null);
    setModalOpen(true);
  };

  const openEdit = (faq) => {
    setEditingFaq(faq);
    setModalOpen(true);
  };

  const handleSave = (form) => {
    if (form.id) {
      setFaqs((prev) => prev.map((f) => (f.id === form.id ? { ...f, ...form } : f)));
    } else {
      setFaqs((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="PRODUCT HELP CENTER"
        title={<>Frequently Asked  
         <span className="text-blue-600"> Questions</span></>}
        subtitle="Manage knowledge base articles and support queries."
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            <FiPlus size={15} />
            Create FAQ
          </button>
        }
      />

      <div className="rounded border border-slate-200 bg-white p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-sm font-bold text-navy-950">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Active Questions ({filtered.length})
          </p>

          <div className="relative w-full sm:max-w-xs">
            <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full rounded border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>
        </div>

        <FaqTable faqs={filtered} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      <CreateFaqModal
        open={modalOpen}
        faq={editingFaq}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default FaqManagement;
