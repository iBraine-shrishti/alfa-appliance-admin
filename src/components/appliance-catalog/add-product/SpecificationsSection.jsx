import { FiSettings } from "react-icons/fi";

// Each spec field just needs a key/label/placeholder - add more here, no JSX duplication.
const SPEC_FIELDS = [
  { key: "voltageFrequency", label: "Voltage / Frequency", placeholder: "e.g. 220-240V / 50Hz" },
  { key: "energyClass", label: "Energy Efficiency Class", placeholder: "e.g. A+++, A, B" },
  { key: "dimensions", label: "Dimensions (W x H x D)", placeholder: "e.g. 60cm x 85cm x 60cm" },
  { key: "manufacturer", label: "Manufacturer", placeholder: "e.g. Alfa, Samsung, Bosch" },
  { key: "modelNumber", label: "Model Number", placeholder: "e.g. 31004" },
  { key: "noiseLevel", label: "Noise Level (dB)", placeholder: "e.g. 45dB" },
];

const SpecificationsSection = ({ form, onChange }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
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
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Technical Capacity / Load
          </label>
          <textarea
            rows={3}
            value={form.specs.capacity ?? ""}
            onChange={(e) => onChange("capacity", e.target.value)}
            placeholder="e.g. 9kg capacity, 1400 RPM spin"
            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificationsSection;
