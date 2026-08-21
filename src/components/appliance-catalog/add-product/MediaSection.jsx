import { useRef } from "react";
import { FiImage, FiUploadCloud, FiPlus, FiX } from "react-icons/fi";

const MediaSection = ({ form, onChange }) => {
  const mainInput = useRef(null);
  const galleryInput = useRef(null);

  const handleMainImage = (event) => {
    const file = event.target.files?.[0];
    if (file) onChange("mainImage", URL.createObjectURL(file));
  };

  const handleGallery = (event) => {
    const files = Array.from(event.target.files || []);
    onChange("gallery", [...(form.gallery || []), ...files.map((file) => URL.createObjectURL(file))]);
  };

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <p className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-sm font-bold text-navy-950">
        <FiImage size={15} className="text-blue-600" />
        Media
      </p>

      <div className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">Main Image</label>
          <input ref={mainInput} type="file" accept="image/*" onChange={handleMainImage} className="hidden" />
          <button
            type="button"
            onClick={() => mainInput.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-slate-200 py-14 text-slate-400 hover:border-blue-300 hover:text-blue-500"
          >
            {form.mainImage ? <img src={form.mainImage} alt="Main product preview" className="h-28 max-w-full object-contain" /> : <><FiUploadCloud size={22} /><span className="text-xs font-bold tracking-wider">UPLOAD IMAGE</span></>}
          </button>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Product Gallery (drag to rearrange)
          </label>
          <input ref={galleryInput} type="file" accept="image/*" multiple onChange={handleGallery} className="hidden" />
          <button
            type="button"
            onClick={() => galleryInput.current?.click()}
            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500"
          >
            <FiPlus size={16} />
            <span className="text-[10px] font-bold tracking-wider">ADD</span>
          </button>
          {!!form.gallery?.length && <div className="mt-3 flex flex-wrap gap-2">{form.gallery.map((image, index) => <div key={`${image}-${index}`} className="relative h-20 w-20 overflow-hidden rounded-lg border border-slate-200"><img src={image} alt={`Gallery preview ${index + 1}`} className="h-full w-full object-cover" /><button type="button" onClick={() => onChange("gallery", form.gallery.filter((_, imageIndex) => imageIndex !== index))} className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy-950/70 text-white" aria-label="Remove image"><FiX size={11} /></button></div>)}</div>}
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
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaSection;
