import { FiSettings } from "react-icons/fi";

// Each spec field just needs a key/label/placeholder - add more here, no JSX duplication.
const SPEC_FIELDS = [
  { key: "productCode", label: "Product Code (SKU)", placeholder: "e.g. ALFA-RF-9051X" },
  { key: "type", label: "Type", placeholder: "e.g. Freestanding" },
  { key: "colourFinish", label: "Colour / Finish", placeholder: "e.g. Black Stainless Steel" },
  { key: "manufacturerGuarantee", label: "Manufacturer's guarantee", placeholder: "e.g. 5 Years" },
  { key: "energyEfficiencyRating", label: "Energy efficiency rating", placeholder: "e.g. Class C" },
  { key: "weight", label: "Weight", placeholder: "e.g. 82 kg (Unboxed) / 91 kg (Boxed)" },
  { key: "fridgeFreezerSplit", label: "Fridge / Freezer split", placeholder: "e.g. 70/30" },
  { key: "dimensions", label: "Dimensions (H x W x D)", placeholder: "e.g. 178 cm x 91.2 cm x 71.6 cm" },
  { key: "capacityVolume", label: "Capacity / Volume", placeholder: "e.g. 530 Litres (360L Fridge / 170L Freezer)" },
  { key: "noiseLevelClass", label: "Noise level & class", placeholder: "e.g. 37 dB(A), Class B" },
  { key: "powerConsumption", label: "Power & Energy consumption", placeholder: "e.g. 215 kWh/annum" },
  { key: "safetyFeatures", label: "Safety features", placeholder: "e.g. Child lock, Door open alarm" },
  { key: "smartConnectivity", label: "Smart / Connectivity", placeholder: "e.g. Wi-Fi Enabled (App Control)" },
];

const SpecificationsSection = ({ form, onChange }) => {
  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <p className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-sm font-bold text-navy-950">
        <FiSettings size={15} className="text-blue-600" />
        Specifications
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {SPEC_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
              {field.label}
            </label>
            <input
              type="text"
              value={form.specs[field.key] ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default SpecificationsSection;
