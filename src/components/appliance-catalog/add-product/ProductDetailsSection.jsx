import { FiInfo } from "react-icons/fi";
import RichTextField from "./RichTextField";

const ProductDetailsSection = ({ form, onChange }) => {
  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <p className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-sm font-bold text-navy-950">
        <FiInfo size={15} className="text-blue-600" />
        Product Details
      </p>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Enter product title..."
              className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Slug</label>
            <input
              type="text"
              value={form.slug}
              readOnly
              placeholder="auto-generated"
              className="w-full rounded border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-500 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <RichTextField
          label="Description"
          placeholder="Enter product description with rich text, bold, tables..."
          toolbar={["B", "I", "U", "S"]}
          value={form.description}
          onChange={(v) => onChange("description", v)}
        />

        <RichTextField
          label="Big Description (Specs Section)"
          placeholder="Enter detailed long description, formatting, tables..."
          toolbar={["B", "I"]}
          value={form.bigDescription}
          onChange={(v) => onChange("bigDescription", v)}
        />
      </div>
    </div>
  );
};

export default ProductDetailsSection;
