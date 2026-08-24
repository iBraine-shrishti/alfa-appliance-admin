import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import FaqTable from "./FaqTable";
import CreateFaqModal from "./CreateFaqModal";
import { fetchAdminFaqs, createFaq, deleteFaq } from "../../services/api";

const FaqManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const loadFaqs = async () => {
    setLoading(true);
    const data = await fetchAdminFaqs();
    setFaqs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs;
    const q = search.toLowerCase();
    return faqs.filter((f) => (f.question || "").toLowerCase().includes(q));
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
      if (form.id) {
        await fetch(`http://127.0.0.1:8000/api/faqs/${form.id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: form.question, answer: form.answer }),
        });
        setFaqs((prev) => prev.map((f) => (f.id === form.id ? { ...f, ...form } : f)));
      } else {
        const created = await createFaq({
          question: form.question,
          answer: form.answer,
          product: null,
        });
        setFaqs((prev) => [created, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save FAQ to backend database.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      const ok = await deleteFaq(id);
      if (ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="PRODUCT HELP CENTER"
        title={<>Frequently Asked  
         <span className="text-blue-600"> Questions</span></>}
        subtitle={loading ? "Loading FAQs..." : "Manage knowledge base articles and support queries."}
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
