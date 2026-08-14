// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

// const AdminLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <Sidebar />

//       <main className="flex-1 overflow-y-auto p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar - only the hamburger trigger lives here */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-navy-950"
            aria-label="Open menu"
          >
            <FiMenu size={18} />
          </button>
          <span className="text-lg font-extrabold tracking-tight text-navy-950">ALFA</span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;