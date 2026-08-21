// API Service for Alfa Appliances Admin Panel
export const API_BASE_URL = "http://127.0.0.1:8000/api";

// 1. Dashboard Analytics Stats
export const adminLoginApi = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin-login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Invalid admin credentials");
    }
    return { success: true, token: data.token, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const fetchAdminDashboardStats = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard-stats/`);
    if (!res.ok) throw new Error("Failed to fetch dashboard stats");
    return await res.json();
  } catch (error) {
    console.error("Dashboard stats API error:", error);
    return null;
  }
};

// 2. Product Management (CRUD)
export const fetchAdminProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products/${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.map((p) => ({
      id: p.id,
      name: p.title,
      category: p.category_name || "General",
      brand: p.brand_name || "Alfa",
      inventory: p.stock_quantity,
      price: parseFloat(p.price),
      oldPrice: p.old_price ? parseFloat(p.old_price) : null,
      status: p.is_sale ? "On Sale" : "Active",
      sku: p.sku || `SKU-${p.id}`,
      modelNumber: p.model_number,
      energyRating: p.energy_rating,
      image_display_url: p.image_display_url || p.image_url,
    }));
  } catch (error) {
    console.error("Fetch products API error:", error);
    return [];
  }
};

export const createProduct = async (productData) => {
  const res = await fetch(`${API_BASE_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return await res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return await res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return true;
};

// 3. Category & Brand Management
export const fetchAdminCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error("Fetch categories API error:", error);
    return [];
  }
};

export const createCategory = async (categoryData) => {
  const res = await fetch(`${API_BASE_URL}/categories/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });
  return await res.json();
};

export const fetchAdminBrands = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/brands/`);
    if (!res.ok) throw new Error("Failed to fetch brands");
    return await res.json();
  } catch (error) {
    console.error("Fetch brands API error:", error);
    return [];
  }
};

// 4. Collection Management
export const fetchAdminCollections = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/collections/`);
    if (!res.ok) throw new Error("Failed to fetch collections");
    return await res.json();
  } catch (error) {
    console.error("Fetch collections API error:", error);
    return [];
  }
};

export const createCollection = async (collectionData) => {
  const res = await fetch(`${API_BASE_URL}/collections/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collectionData),
  });
  return await res.json();
};

// 5. Orders Management
export const fetchAdminOrders = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    return data.map((o) => ({
      id: `#ORD-${o.id}`,
      rawId: o.id,
      date: new Date(o.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      customerName: o.full_name,
      customerEmail: o.email,
      payment: o.is_paid ? "Paid" : "Pending",
      fulfillment: o.status,
      items: o.items ? o.items.length : 1,
      total: parseFloat(o.total_price).toFixed(2),
    }));
  } catch (error) {
    console.error("Fetch orders API error:", error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return await res.json();
};

// 6. Customers Management
export const fetchAdminCustomers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/customers/`);
    if (!res.ok) throw new Error("Failed to fetch customers");
    return await res.json();
  } catch (error) {
    console.error("Fetch customers API error:", error);
    return [];
  }
};

// 7. Support & FAQ Management
export const fetchAdminFaqs = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs/`);
    if (!res.ok) throw new Error("Failed to fetch FAQs");
    return await res.json();
  } catch (error) {
    console.error("Fetch FAQs API error:", error);
    return [];
  }
};

export const createFaq = async (faqData) => {
  const res = await fetch(`${API_BASE_URL}/faqs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(faqData),
  });
  return await res.json();
};

export const deleteFaq = async (faqId) => {
  const res = await fetch(`${API_BASE_URL}/faqs/${faqId}/`, {
    method: "DELETE",
  });
  return res.ok;
};
