import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import ProductDetailsSection from "../../components/appliance-catalog/add-product/ProductDetailsSection";
import MediaSection from "../../components/appliance-catalog/add-product/MediaSection";
import SpecificationsSection from "../../components/appliance-catalog/add-product/SpecificationsSection";
import OrganizationSidebar from "../../components/appliance-catalog/add-product/OrganizationSidebar";
import PricingSidebar from "../../components/appliance-catalog/add-product/PricingSidebar";
import { applianceCategories } from "../../data/applianceCategories";
import { createProduct, formatImageUrl, API_BASE_URL, BACKEND_DOMAIN } from "../../services/api";

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
  mainImage: "",
  gallery: [],
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
  const { productId } = useParams();
  const isEditMode = Boolean(productId);

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      const fetchProductDetails = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/products/${productId}/`);
          if (res.ok) {
            const data = await res.json();
            setForm({
              title: data.title || "",
              slug: data.slug || slugify(data.title || ""),
              description: data.description || "",
              bigDescription: data.description || "",
              instagramReel: data.instagram_reel || "",
              mainImage: formatImageUrl(data.image_display_url || data.image_url),
              gallery: data.images ? data.images.map(img => formatImageUrl(img.url)) : [],
              category: data.category_name || applianceCategories[0],
              collections: [],
              weight: data.weight || "",
              onSale: Boolean(data.is_sale),
              price: data.price ? String(data.price) : "",
              oldPrice: data.old_price ? String(data.old_price) : "",
              specs: {
                modelNumber: data.model_number || "",
                capacity: data.capacity || "",
                energyRating: data.energy_rating || "",
              },
            });
          }
        } catch (err) {
          console.error("Error fetching product for edit:", err);
        } finally {
          setInitialLoading(false);
        }
      };
      fetchProductDetails();
    }
  }, [productId, isEditMode]);

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
    if (!form.title.trim() || !form.price) {
      alert("Please enter a product title and price.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        price: parseFloat(form.price),
        old_price: form.oldPrice ? parseFloat(form.oldPrice) : null,
        is_sale: form.onSale || false,
        description: form.description || form.bigDescription || "High performance home appliance.",
        image_url: form.mainImage || `${BACKEND_DOMAIN}/media/products/product1/product1.png`,
        model_number: form.specs?.modelNumber || "ALFA-2026",
        capacity: form.specs?.capacity || "Standard Capacity",
        energy_rating: form.specs?.energyRating || "5 Star",
        inverter_technology: true
      };

      if (isEditMode) {
        const res = await fetch(`${API_BASE_URL}/products/${productId}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update product");
      } else {
        await createProduct({ ...payload, stock_quantity: 15, sku: `SKU-${Date.now()}` });
      }

      navigate("/admin/appliance-catalog/all-products");
    } catch (err) {
      console.error(err);
      alert(`Error ${isEditMode ? "updating" : "saving"} product in backend API.`);
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm font-semibold text-slate-500">
        Loading product #{productId} details from database...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="INVENTORY MANAGEMENT"
        title={
          <>
            {isEditMode ? "Edit" : "Add"} <span className="text-blue-600">Product</span>
          </>
        }
        subtitle={isEditMode ? `Updating product #${productId} details` : "Create new appliance entry"}
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
              disabled={loading}
              onClick={handleSave}
              className="flex items-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
            >
              <FiSave size={15} />
              {loading ? "Saving..." : isEditMode ? "Update Product" : "Save Product"}
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
