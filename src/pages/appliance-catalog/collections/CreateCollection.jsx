import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSave, FiLayers, FiImage, FiSearch, FiExternalLink, FiChevronDown } from "react-icons/fi";
import { applianceCategories } from "../../../data/applianceCategories";
import { createCollection } from "../../../services/api";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const CreateCollection = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", category: applianceCategories[0] || "Washing Machines", description: "" });
  const [saving, setSaving] = useState(false);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!form.title) {
      alert("Please provide a title for the collection.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: slugify(form.title),
        description: form.description,
        image: null
      };

      await createCollection(payload);
      alert("Collection successfully created in PostgreSQL database!");
      navigate("/admin/appliance-catalog/collections");
    } catch (error) {
      console.error("Create collection error:", error);
      alert("Error creating collection. Check network connection.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/appliance-catalog/collections")}
            className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50"
            aria-label="Back"
          >
            <FiArrowLeft size={16} />
          </button>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              NEW COLLECTION
            </p>
            <h1 className="text-2xl font-extrabold text-navy-950">Create Collection</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/appliance-catalog/collections")}
            className="rounded border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="flex items-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
          >
            <FiSave size={15} />
            {saving ? "Saving..." : "Save Collection"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded border border-slate-200 bg-white p-6 lg:col-span-2">
          <p className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-sm font-bold text-navy-950">
            <FiLayers size={15} className="text-blue-600" />
            Collection Details
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g., Energy Efficient Cooling"
                className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
                Appliance Category
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
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
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500">
                <FiImage size={13} />
                Collection Image
              </label>
              <div className="flex items-center gap-4 rounded border border-slate-200 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded border border-dashed border-slate-200 text-slate-300">
                  <FiImage size={20} />
                </div>
                <div>
                  <button
                    type="button"
                    className="rounded border border-slate-200 px-4 py-2 text-xs font-bold tracking-wider text-navy-950 hover:bg-slate-50"
                  >
                    CHOOSE IMAGE FILE
                  </button>
                  <p className="mt-1.5 text-xs text-slate-400">Max size: 5MB (JPG/PNG/WEBP)</p>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Enter collection description..."
                className="w-full resize-y rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-6">
          <p className="mb-5 text-sm font-bold text-navy-950">Products in Collection</p>

          <div className="relative mb-4">
            <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            <FiExternalLink size={15} />
            See Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
