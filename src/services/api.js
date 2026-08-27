// API Service for Alfa Appliances Admin Panel
export const BACKEND_DOMAIN = "https://alfa-appliances-backend.onrender.com";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${BACKEND_DOMAIN}/api`;

export const formatImageUrl = (imageUrl) => {
  if (!imageUrl) return "/placeholder-appliance.png";
  if (typeof imageUrl === "string" && (imageUrl.includes("127.0.0.1:8000") || imageUrl.includes("localhost:8000"))) {
    const path = imageUrl.replace(/^https?:\/\/[^\/]+/, "");
    return `${BACKEND_DOMAIN}${path}`;
  }
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return `${BACKEND_DOMAIN}${imageUrl}`;
};

// 1. Admin Login
export const adminLoginApi = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin-login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Invalid email address or password");
    }
    return { success: true, token: data.token, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// 2. Dashboard Analytics Stats
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

// 3. Products Management (CRUD)
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
      status: p.stock_quantity === 0 ? "Out of Stock" : (p.is_sale ? "On Sale" : "Active"),
      sku: p.sku || `SKU-${p.id}`,
      modelNumber: p.model_number || "N/A",
      energyRating: p.energy_rating || "5 Star",
      image: formatImageUrl(p.image_display_url || p.image_url),
      image_display_url: formatImageUrl(p.image_display_url || p.image_url),
      created_at: p.created_at
    }));
  } catch (error) {
    console.error("Fetch products API error:", error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return await res.json();
  } catch (error) {
    console.error("Create product API error:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return true;
  } catch (error) {
    console.error("Delete product API error:", error);
    return false;
  }
};

// 4. Categories & Collections
export const fetchAdminCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error("Categories API error:", error);
    return [];
  }
};

export const fetchAdminCollections = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/collections/`);
    if (!res.ok) throw new Error("Failed to fetch collections");
    const data = await res.json();
    return data.map((c) => ({
      id: c.id,
      title: c.title,
      name: c.title,
      slug: c.slug,
      description: c.description,
      productCount: c.product_count || 0,
      image: formatImageUrl(c.image_display_url || c.image_url),
    }));
  } catch (error) {
    console.error("Collections API error:", error);
    return [];
  }
};

export const createCollection = async (collectionData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/collections/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collectionData),
    });
    if (!res.ok) throw new Error("Failed to create collection");
    return await res.json();
  } catch (error) {
    console.error("Create collection API error:", error);
    throw error;
  }
};

export const fetchCollectionDetail = async (slug) => {
  try {
    const res = await fetch(`${API_BASE_URL}/collections/${slug}/`);
    if (!res.ok) throw new Error("Failed to fetch collection");
    const data = await res.json();
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      productCount: data.product_count || 0,
      image: formatImageUrl(data.image_display_url || data.image_url),
    };
  } catch (error) {
    console.error("Collection detail API error:", error);
    return null;
  }
};

export const fetchCollectionProducts = async (slug) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/?collection=${slug}`);
    if (!res.ok) throw new Error("Failed to fetch collection products");
    const data = await res.json();
    return data.map((p) => ({
      id: p.id,
      name: p.title,
      model: p.title,
      category: p.category_name || "General",
      brand: p.brand_name || "Alfa",
      inventory: p.stock_quantity,
      stockCount: p.stock_quantity,
      price: parseFloat(p.price),
      oldPrice: p.old_price ? parseFloat(p.old_price) : null,
      status: p.stock_quantity === 0 ? "Out of Stock" : (p.is_sale ? "On Sale" : "In Stock"),
      stockStatus: p.stock_quantity === 0 ? "Out of Stock" : (p.stock_quantity <= 5 ? "Low Stock" : "In Stock"),
      sku: p.sku || `SKU-${p.id}`,
      image: formatImageUrl(p.image_display_url || p.image_url),
    }));
  } catch (error) {
    console.error("Collection products API error:", error);
    return [];
  }
};

// 5. Orders Management
export const fetchAdminOrders = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    return data.map((o) => {
      const firstItem = o.items && o.items.length > 0 ? o.items[0] : null;
      const imgUrl = firstItem?.product?.image_display_url 
        ? formatImageUrl(firstItem.product.image_display_url)
        : `${BACKEND_DOMAIN}/media/products/product1/product1.png`;
      const totalVal = parseFloat(o.total_price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return {
        id: `#ORD-${o.id}`,
        orderId: o.id,
        customerName: o.full_name || o.email || "Customer",
        customerEmail: o.email || "customer@example.co.uk",
        date: new Date(o.created_at || Date.now()).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        items: o.items ? o.items.length : 1,
        payment: o.is_paid ? "Paid" : "Pending",
        fulfillment: o.status || "Processing",
        image: imgUrl,
        total: totalVal,
        rawOrder: o
      };
    });
  } catch (error) {
    console.error("Orders API error:", error);
    return [];
  }
};

export const fetchOrderDetail = async (id) => {
  try {
    const cleanId = id.toString().replace('#ORD-', '').replace('#', '');
    const res = await fetch(`${API_BASE_URL}/orders/${cleanId}/`);
    if (!res.ok) throw new Error("Failed to fetch order detail");
    return await res.json();
  } catch (error) {
    console.error("Order detail API error:", error);
    return null;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const cleanId = id.toString().replace('#ORD-', '').replace('#', '');
    const res = await fetch(`${API_BASE_URL}/orders/${cleanId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update order status");
    return await res.json();
  } catch (error) {
    console.error("Update order status API error:", error);
    return null;
  }
};

// 6. Customers Directory
export const fetchAdminCustomers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/customers/`);
    if (!res.ok) throw new Error("Failed to fetch customers");
    const data = await res.json();
    return data
      .filter((u) => !u.is_staff && !u.is_superuser && u.username !== "admin")
      .map((u) => {
      const name = `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username;
      const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : "AU";
      const totalSpentFormatted = (u.total_spent !== undefined && u.total_spent !== null)
        ? parseFloat(u.total_spent).toFixed(2)
        : (u.orders_count ? (u.orders_count * 249.99).toFixed(2) : "249.99");
      return {
        id: u.id,
        name: name,
        initials: initials,
        email: u.email,
        status: "Subscribed",
        location: "London, UK",
        orders: u.orders_count || 1,
        totalSpent: totalSpentFormatted,
        spent: parseFloat(totalSpentFormatted),
        joined: new Date(u.date_joined || Date.now()).toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
        rawUser: u
      };
    });
  } catch (error) {
    console.error("Customers API error:", error);
    return [];
  }
};

export const fetchCustomerDetail = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/customers/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch customer detail");
    return await res.json();
  } catch (error) {
    console.error("Customer detail API error:", error);
    return null;
  }
};

// 7. Discounts / Coupons Management
export const fetchAdminDiscounts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/coupons/`);
    if (!res.ok) throw new Error("Failed to fetch discounts");
    const data = await res.json();
    return data.map((c) => ({
      id: c.id,
      code: c.code,
      discount: `${c.discount_percentage}%`,
      discountPercentage: c.discount_percentage,
      minPurchase: c.minimum_purchase_amount,
      status: c.active ? "Active" : "Expired",
      validFrom: c.valid_from ? new Date(c.valid_from).toLocaleDateString("en-GB") : "N/A",
      validTo: c.valid_to ? new Date(c.valid_to).toLocaleDateString("en-GB") : "N/A",
    }));
  } catch (error) {
    console.error("Discounts API error:", error);
    return [];
  }
};

export const createDiscount = async (discountData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/coupons/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discountData),
    });
    if (!res.ok) throw new Error("Failed to create discount coupon");
    return await res.json();
  } catch (error) {
    console.error("Create discount API error:", error);
    throw error;
  }
};

export const deleteDiscount = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/coupons/${id}/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete coupon");
    return true;
  } catch (error) {
    console.error("Delete coupon API error:", error);
    return false;
  }
};

// 8. FAQ Management
export const fetchAdminFaqs = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs/`);
    if (!res.ok) throw new Error("Failed to fetch FAQs");
    return await res.json();
  } catch (error) {
    console.error("FAQs API error:", error);
    return [];
  }
};

export const createFaq = async (faqData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faqData),
    });
    if (!res.ok) throw new Error("Failed to create FAQ");
    return await res.json();
  } catch (error) {
    console.error("Create FAQ API error:", error);
    throw error;
  }
};

export const deleteFaq = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs/${id}/`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete FAQ");
    return true;
  } catch (error) {
    console.error("Delete FAQ API error:", error);
    return false;
  }
};
