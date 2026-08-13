import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AdminAuth from "./pages/AdminAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import FaqManagement from "./pages/support/FaqManagement";
import TopSelling from "./pages/appliance-catalog/topselling/TopSelling";
// import AllProducts from "./pages/catalog/AllProducts";
// import AddProduct from "./pages/catalog/AddProduct";
// import CatalogCollections from "./pages/catalog/CatalogCollections";



function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route
          path="/*"
          element={<AdminAuth />} 
        />

        {/* <Route path="/login" element={<Auth />} /> */}
        {/* <Route path="/admin/login" element={<AdminAuth />} /> */}
 
       
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="support" element={<FaqManagement />} />
          <Route path="appliance-catalog/top-selling" element={<TopSelling />} />
          {/* <Route path="appliance-catalog/all-products" element={<AllProducts />} /> */}
          {/* <Route path="appliance-catalog/add-product" element={<AddProduct />} /> */}
          {/* <Route path="appliance-catalog/collections" element={<CatalogCollections />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
 
