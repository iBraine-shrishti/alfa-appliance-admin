import { useState, useEffect } from "react";
import { FiSettings, FiChevronDown, FiEdit2 } from "react-icons/fi";
import { adminCollections } from "../../../data/adminCollections";
import {
  COLLECTION_CAPACITIES,
  DEFAULT_COMMON_CAPACITIES,
} from "../../../data/collectionCapacities";

const collectionTypes = adminCollections.map((c) => c.title);

const SpecificationsSection = ({ form, onChange }) => {
  const selectedType = form.specs?.type || "";
  const currentCapacity = form.specs?.capacityVolume ?? form.specs?.capacity ?? "";

  const availableCapacities = selectedType && COLLECTION_CAPACITIES[selectedType]
    ? COLLECTION_CAPACITIES[selectedType]
    : DEFAULT_COMMON_CAPACITIES;

  const isPredefined = availableCapacities.includes(currentCapacity);
  const [isManualInput, setIsManualInput] = useState(
    !isPredefined && Boolean(currentCapacity)
  );

  // Sync manual input state if currentCapacity changes externally
  useEffect(() => {
    if (currentCapacity && !availableCapacities.includes(currentCapacity)) {
      setIsManualInput(true);
    }
  }, [currentCapacity, availableCapacities]);

  const handleCapacitySelectChange = (e) => {
    const val = e.target.value;
    if (val === "__manual__") {
      setIsManualInput(true);
    } else {
      setIsManualInput(false);
      onChange("capacityVolume", val);
    }
  };

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <p className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-sm font-bold text-navy-950">
        <FiSettings size={15} className="text-blue-600" />
        Specifications
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* 1. Product Code (SKU) */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Product Code (SKU)
          </label>
          <input
            type="text"
            value={form.specs?.productCode ?? ""}
            onChange={(e) => onChange("productCode", e.target.value)}
            placeholder="e.g. ALFA-RF-9051X"
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        {/* 2. Type (Dropdown of collections from collection page) */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Type
          </label>
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => onChange("type", e.target.value)}
              className="w-full appearance-none rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none focus:border-blue-600"
            >
              <option value="">-- Select Appliance Type --</option>
              {collectionTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <FiChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
          </div>
        </div>

        {/* 3. Capacity / Volume (Dynamic dropdown mapped to Type with Manual Option) */}
        <div className="sm:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-bold tracking-wider text-slate-500">
              Capacity / Volume{" "}
              {selectedType && (
                <span className="font-normal text-blue-600">
                  (Common {selectedType} capacities)
                </span>
              )}
            </label>
            {!isManualInput ? (
              <button
                type="button"
                onClick={() => setIsManualInput(true)}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
              >
                <FiEdit2 size={11} />
                Enter manually
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsManualInput(false);
                  if (availableCapacities.length > 0) {
                    onChange("capacityVolume", availableCapacities[0]);
                  }
                }}
                className="text-[11px] font-semibold text-slate-500 hover:text-blue-600"
              >
                Choose from presets
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="relative">
              <select
                value={isManualInput ? "__manual__" : currentCapacity}
                onChange={handleCapacitySelectChange}
                className="w-full appearance-none rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none focus:border-blue-600"
              >
                <option value="">-- Select Common Capacity / Volume --</option>
                {availableCapacities.map((cap) => (
                  <option key={cap} value={cap}>
                    {cap}
                  </option>
                ))}
                <option value="__manual__">Other (Enter Manually)</option>
              </select>
              <FiChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
            </div>

            {isManualInput && (
              <div className="rounded border border-blue-100 bg-blue-50/40 p-3">
                <label className="mb-1.5 block text-[11px] font-semibold text-blue-900">
                  Custom Capacity / Volume:
                </label>
                <input
                  type="text"
                  value={currentCapacity}
                  onChange={(e) => onChange("capacityVolume", e.target.value)}
                  placeholder="e.g. 8.5 kg, 340 Litres, 14 Place Settings, etc."
                  className="w-full rounded border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>

        {/* 4. Colour / Finish */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Colour / Finish
          </label>
          <input
            type="text"
            value={form.specs?.colourFinish ?? ""}
            onChange={(e) => onChange("colourFinish", e.target.value)}
            placeholder="e.g. Inox Steel, Graphite Grey, White"
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        {/* 5. Manufacturer's guarantee */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Manufacturer&apos;s guarantee
          </label>
          <input
            type="text"
            value={form.specs?.manufacturerGuarantee ?? ""}
            onChange={(e) => onChange("manufacturerGuarantee", e.target.value)}
            placeholder="e.g. 2 Years Parts & Labour, 5 Years"
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        {/* 6. Weight */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Weight
          </label>
          <input
            type="text"
            value={form.specs?.weight ?? form.weight ?? ""}
            onChange={(e) => onChange("weight", e.target.value)}
            placeholder="e.g. 68 kg"
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>

        {/* 7. Dimensions (H x W x D) */}
        <div>
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
            Dimensions (H x W x D)
          </label>
          <input
            type="text"
            value={form.specs?.dimensions ?? ""}
            onChange={(e) => onChange("dimensions", e.target.value)}
            placeholder="e.g. 85 x 60 x 55 cm"
            className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificationsSection;

