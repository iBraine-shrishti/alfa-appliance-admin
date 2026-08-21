import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [openKey, setOpenKey] = useState(
    () =>
      adminNavLinks.find((item) =>
        item.children?.some((child) => pathname.startsWith(child.to))
      )?.key ?? null
  );

  const toggleGroup = (key) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* Backdrop - mobile only, shown while drawer is open */}
      <div
        className={`fixed inset-0 z-40 bg-navy-950/40 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Logo />
          {/* Close button - mobile only */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-slate-500 lg:hidden"
            aria-label="Close menu"
          >
            <FiX size={16} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <ul className="space-y-1">
            {adminNavLinks.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isGroupOpen = openKey === item.key;
              const isGroupActive = item.children?.some((child) =>
                pathname.startsWith(child.to)
              );
              const IconComp = item.icon;

              return (
                <li key={item.key}>
                  {hasChildren ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleGroup(item.key)}
                        className={`flex w-full items-center justify-between rounded px-3 py-2.5 text-sm font-semibold transition-colors ${
                          isGroupActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-500 hover:bg-slate-50 hover:text-navy-950"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {IconComp && <IconComp size={18} />}
                          <span>{item.label}</span>
                        </div>
                        <FiChevronDown
                          size={14}
                          className={`transition-transform ${
                            isGroupOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isGroupOpen && (
                        <ul className="ml-8 mt-1 space-y-1 border-l border-slate-100 pl-3">
                          {item.children.map((child) => (
                            <li key={child.to}>
                              <NavLink
                                to={child.to}
                                onClick={onClose}
                                className={({ isActive }) =>
                                  `block rounded px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                                    isActive
                                      ? "text-blue-600 font-bold"
                                      : "text-slate-500 hover:text-navy-950"
                                  }`
                                }
                              >
                                {child.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={linkClasses}
                    >
                      {IconComp && <IconComp size={18} />}
                      <span>{item.label}</span>
                    </NavLink>
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
            onClick={handleLogout}
            className="text-slate-400 hover:text-navy-950 p-2 rounded transition-colors hover:bg-slate-100"
            aria-label="Log out"
            title="Log out"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;