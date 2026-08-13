import {
  FiGrid,
  FiArchive,
  FiShoppingCart,
  FiUsers,
  FiLifeBuoy,
} from "react-icons/fi";

// Sidebar nav config for the admin dashboard.
// Items with a `children` array render as an expandable group;
// items with a `to` render as a direct link.
export const adminNavLinks = [
  {
    key: "dashboard",
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: FiGrid,
  },
  {
    key: "appliance-catalog",
    label: "Appliance Catalog",
    icon: FiArchive,
    children: [
      { to: "/admin/appliance-catalog/all-products", label: "All Products" },
      { to: "/admin/appliance-catalog/add-product", label: "Add Product" },
      { to: "/admin/appliance-catalog/collections", label: "Collections" },
      { to: "/admin/appliance-catalog/top-selling", label: "Top Selling" },
    ],
  },
  {
    key: "orders",
    to: "/admin/orders",
    label: "Orders",
    icon: FiShoppingCart,
  },
  {
    key: "customers",
    to: "/admin/customers",
    label: "Customers",
    icon: FiUsers,
  },
  {
    key: "support",
    to: "/admin/support",
    label: "Support",
    icon: FiLifeBuoy,
  },
];
