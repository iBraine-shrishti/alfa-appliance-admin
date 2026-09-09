import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AdminAuth from "./pages/AdminAuth";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import OrderDetail from "./pages/orders/OrderDetail";
import Customers from "./pages/customers/Customers";
import CustomerDetail from "./pages/customers/CustomerDetail";
import Discounts from "./pages/discounts/Discounts";
import CreateDiscount from "./pages/discounts/CreateDiscount";
import FaqManagement from "./pages/support/FaqManagement";
import TopSelling from "./pages/appliance-catalog/topselling/TopSelling";
import AllProducts from "./pages/appliance-catalog/AllProducts";
import Inventory from "./pages/appliance-catalog/Inventory";
import AddProduct from "./pages/appliance-catalog/AddProduct";
import AllCollections from "./pages/appliance-catalog/collections/AllCollections";
import CreateCollection from "./pages/appliance-catalog/collections/CreateCollection";
import CollectionDetail from "./pages/appliance-catalog/collections/CollectionDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Auth Route --- */}
        <Route path="/" element={<AdminAuth />} />

        {/* --- Protected Admin Routes --- */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:customerId" element={<CustomerDetail />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="discounts/create" element={<CreateDiscount />} />
            <Route path="support" element={<FaqManagement />} />
            <Route path="appliance-catalog/top-selling" element={<TopSelling />} />
            <Route path="appliance-catalog/all-products" element={<AllProducts />} />
            <Route path="appliance-catalog/inventory" element={<Inventory />} />
            <Route path="appliance-catalog/add-product" element={<AddProduct />} />
            <Route path="appliance-catalog/edit-product/:productId" element={<AddProduct />} />
            <Route path="appliance-catalog/collections" element={<AllCollections />} />
            <Route path="appliance-catalog/collections/create" element={<CreateCollection />} />
            <Route path="appliance-catalog/collections/:slug" element={<CollectionDetail />} />
          </Route>
        </Route>

        {/* --- Catch all redirect to root login --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
