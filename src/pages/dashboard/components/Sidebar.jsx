import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiArchive,
  FiShoppingCart,
  FiTag,
  FiBox,
  FiLogOut,
} from "react-icons/fi";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/admin/appliance-catalog", label: "Appliance Catalog", icon: FiArchive },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingCart },
  { to: "/admin/brands", label: "Brands", icon: FiTag },
  { to: "/admin/stock", label: "Stock", icon: FiBox },
];

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-6 py-6">
        <FiGrid className="text-blue-600" size={22} />
        <span className="text-xl font-extrabold tracking-tight text-navy-950">
          ALFA
        </span>
      </div>

      <nav className="flex-1 px-4">
        <p className="mb-2 px-2 text-[11px] font-bold tracking-wider text-slate-400">
          MAIN MENU
        </p>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-navy-950"
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3 border-t border-slate-100 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
          AD
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-navy-950">Admin User</p>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Active Now
          </p>
        </div>
        <button
          type="button"
          className="text-slate-400 hover:text-navy-950"
          aria-label="Log out"
        >
          <FiLogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
