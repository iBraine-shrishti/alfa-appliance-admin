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
  category: applianceCategories[0],
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

  const handleSave = () => {
    // TODO: POST `form` to your API.
    navigate("/admin/appliance-catalog/all-products");
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
        subtitle="Create new appliance entry"
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate("/admin/appliance-catalog/all-products")}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <FiSave size={15} />
              Save Product
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
