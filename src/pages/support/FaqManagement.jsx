import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import FaqTable from "./FaqTable";
import CreateFaqModal from "./CreateFaqModal";
import { fetchAdminFaqs, createFaq, deleteFaq } from "../../services/api";

const INITIAL_FAQS = [
  {
    id: 1,
    question: "Does delivery include removal of old appliance in the UK?",
    answer: "Yes, Alfa Appliances UK offers optional eco-recycle removal of your old appliance upon delivery.",
    product: "GLOBAL / GENERAL",
  },
  {
    id: 2,
    question: "What is the warranty period for commercial units?",
    answer: "All commercial appliances come with a standard 24-month parts and labour warranty...",
    product: "GLOBAL / GENERAL",
  },
];

const FaqManagement = () => {
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadFaqs = async () => {
    setLoading(true);
    const data = await fetchAdminFaqs();
    if (data && data.length > 0) {
      setFaqs(
        data.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
          product: f.product ? `Product ID #${f.product}` : "GLOBAL / GENERAL",
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

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

  const handleSave = async (form) => {
    try {
      await createFaq({
        question: form.question,
        answer: form.answer,
        product: null
      });
      loadFaqs();
      setModalOpen(false);
    } catch (error) {
      console.error("Save FAQ error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      await deleteFaq(id);
      loadFaqs();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="PRODUCT HELP CENTER"
        title={<>Frequently Asked  
         <span className="text-blue-600"> Questions</span></>}
        subtitle={loading ? "Loading FAQs..." : "Manage knowledge base articles live in PostgreSQL database."}
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

        {loading ? (
          <div className="p-8 text-center text-sm font-semibold text-slate-500 bg-white rounded border border-slate-200">
            Loading knowledge base FAQs...
          </div>
        ) : (
          <FaqTable faqs={filtered} onEdit={openEdit} onDelete={handleDelete} />
        )}
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
