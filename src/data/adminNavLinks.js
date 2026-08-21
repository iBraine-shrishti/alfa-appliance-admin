import {
  FiGrid,
  FiArchive,
  FiShoppingCart,
  FiUsers,
  FiLifeBuoy,
  FiTag,
} from "react-icons/fi";


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
      { to: "/admin/appliance-catalog/inventory", label: "Inventory" },
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
    key: "discounts",
    to: "/admin/discounts",
    label: "Discounts",
    icon: FiTag,
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
