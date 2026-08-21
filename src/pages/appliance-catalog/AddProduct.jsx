import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import ProductDetailsSection from "../../components/appliance-catalog/add-product/ProductDetailsSection";
import MediaSection from "../../components/appliance-catalog/add-product/MediaSection";
import SpecificationsSection from "../../components/appliance-catalog/add-product/SpecificationsSection";
import OrganizationSidebar from "../../components/appliance-catalog/add-product/OrganizationSidebar";
import PricingSidebar from "../../components/appliance-catalog/add-product/PricingSidebar";
import { applianceCategories } from "../../data/applianceCategories";
import { createProduct } from "../../services/api";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const INITIAL_FORM = {
  title: "",
  slug: "",
  description: "",
  bigDescription: "",
  instagramReel: "",
  category: applianceCategories[0] || "Washing Machines",
  collections: [],
  weight: "",
  onSale: false,
  price: "",
  oldPrice: "",
  specs: {},
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "title" ? { slug: slugify(value) } : {}),
    }));
  };

  const updateSpec = (key, value) => {
    setForm((prev) => ({ ...prev, specs: { ...prev.specs, [key]: value } }));
  };

  const toggleCollection = (option) => {
    setForm((prev) => ({
      ...prev,
      collections: prev.collections.includes(option)
        ? prev.collections.filter((c) => c !== option)
        : [...prev.collections, option],
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.price) {
      alert("Please provide at least a title and price for the appliance.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        description: form.description,
        long_description: form.bigDescription,
        instagram_reel: form.instagramReel,
        category: 1, // Default or mapped ID
        brand: 1, // Default or mapped ID
        price: parseFloat(form.price) || 0,
        old_price: form.oldPrice ? parseFloat(form.oldPrice) : null,
        is_sale: form.onSale,
        weight: form.weight,
        model_number: form.specs.modelNumber || "",
        capacity: form.specs.capacity || "",
        energy_rating: form.specs.energyClass || "5 Star",
        voltage_frequency: form.specs.voltageFrequency || "",
        noise_level: form.specs.noiseLevel || "",
        dimensions: form.specs.dimensions || "",
        sku: `SKU-${Date.now().toString().slice(-6)}`,
        stock_quantity: 10,
        image_url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80"
      };

      await createProduct(payload);
      alert("Appliance product successfully saved to backend database!");
      navigate("/admin/appliance-catalog/all-products");
    } catch (error) {
      console.error("Save product error:", error);
      alert("Error saving product to backend. Check network console.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="INVENTORY MANAGEMENT"
        title={
          <>
            Add <span className="text-blue-600">Product</span>
          </>
        }
        subtitle="Create new appliance entry in database"
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate("/admin/appliance-catalog/all-products")}
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
              {saving ? "Saving..." : "Save Product"}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ProductDetailsSection form={form} onChange={updateField} />
          <MediaSection form={form} onChange={updateField} />
          <SpecificationsSection form={form} onChange={updateSpec} />
        </div>

        <div className="flex flex-col gap-6">
          <OrganizationSidebar form={form} onChange={updateField} onToggleCollection={toggleCollection} />
          <PricingSidebar form={form} onChange={updateField} />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
