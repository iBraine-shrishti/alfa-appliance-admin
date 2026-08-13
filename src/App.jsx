import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/AdminAuth";
import Dashboard from "./pages/dashboard/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route
          path="/*" element={<Auth />}      
        />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
