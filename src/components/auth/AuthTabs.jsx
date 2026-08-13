const TABS = [
  { key: "login", label: "Login" },
  { key: "signup", label: "Sign Up" },
];

const AuthTabs = ({ activeTab, onChange }) => {
  return (
    <div className="flex border-b border-slate-200">
      {TABS.map(({ key, label }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`flex-1 pb-3 text-base font-bold transition-colors ${
              isActive
                ? "border-b-2 border-navy-950 text-navy-950"
                : "border-b-2 border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default AuthTabs;
