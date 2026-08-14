import { FiImage, FiUploadCloud, FiPlus } from "react-icons/fi";

const MediaSection = ({ form, onChange }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-sm font-bold text-navy-950">
        <FiImage size={15} className="text-blue-600" />
        Media
      </p>

      <div className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Main Image</label>
          <button
            type="button"
            className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 py-14 text-slate-400 hover:border-blue-300 hover:text-blue-500"
          >
            <FiUploadCloud size={22} />
            <span className="text-xs font-bold tracking-wider">UPLOAD IMAGE</span>
          </button>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Product Gallery (drag to rearrange)
          </label>
          <button
            type="button"
            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500"
          >
            <FiPlus size={16} />
            <span className="text-[10px] font-bold tracking-wider">ADD</span>
          </button>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Instagram Reel Link
          </label>
          <input
            type="text"
            value={form.instagramReel}
            onChange={(e) => onChange("instagramReel", e.target.value)}
            placeholder="e.g. https://www.instagram.com/reel/..."
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaSection;
