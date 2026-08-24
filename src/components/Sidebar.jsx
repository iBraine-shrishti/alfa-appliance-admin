import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiX } from "react-icons/fi";
import { adminNavLinks } from "../pages/dashboard/components/adminNavLinks";
import Logo from "../components/logo/Logo";

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded px-3 py-2.5 text-sm font-semibold transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-600"
      : "text-slate-500 hover:bg-slate-50 hover:text-navy-950"
  }`;

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const [openKey, setOpenKey] = useState(
    () =>
      adminNavLinks.find((item) =>
        item.children?.some((child) => pathname.startsWith(child.to))
      )?.key ?? null
  );

  const toggleGroup = (key) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  return (
    <>
     
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-navy-950/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-6">
          <span className="text-xl font-extrabold tracking-tight text-navy-950">
            <Logo />
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-navy-950 lg:hidden"
            aria-label="Close menu"
          >
            <FiX size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4">
          <p className="mb-2 px-2 text-[11px] font-bold tracking-wider text-slate-400">
            MAIN MENU
          </p>
          <ul className="flex flex-col gap-1">
            {adminNavLinks.map((item) => {
              const Icon = item.icon;

              if (!item.children) {
                return (
                  <li key={item.key}>
                    <NavLink to={item.to} className={linkClasses} onClick={onClose}>
                      <Icon size={17} />
                      {item.label}
                    </NavLink>
                  </li>
                );
              }

              const isOpenGroup = openKey === item.key;
              const isGroupActive = item.children.some((child) =>
                pathname.startsWith(child.to)
              );

              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.key)}
                    className={`flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isGroupActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-navy-950"
                    }`}
                  >
                    <Icon size={17} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <FiChevronDown
                      size={15}
                      className={`transition-transform ${isOpenGroup ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpenGroup && (
                    <ul className="mt-1 flex flex-col gap-1 border-l border-slate-100 pl-4">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `block rounded px-3 py-2 text-sm font-medium transition-colors ${
                                isActive
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-slate-500 hover:bg-slate-50 hover:text-navy-950"
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
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
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminUser");
              window.location.href = "/";
            }}
            className="text-slate-400 hover:text-navy-950"
            aria-label="Log out"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;