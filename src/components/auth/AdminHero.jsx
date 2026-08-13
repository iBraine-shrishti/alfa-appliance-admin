import {
  FiBarChart2,
  FiPackage,
  FiShoppingBag,
  FiLock,
  FiUsers,
} from "react-icons/fi";

const FEATURES = [
  { icon: FiBarChart2, label: "Real-Time Analytics" },
  { icon: FiPackage, label: "Inventory Control" },
  { icon: FiShoppingBag, label: "Order Management" },
  { icon: FiLock, label: "Secure Access" },
 
];

const AdminHero = () => {
  return (
    <div
      className="relative hidden flex-col justify-center overflow-hidden bg-navy-950 px-10 py-12 lg:flex lg:w-1/2 lg:px-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10, 14, 30, 0.82), rgba(10, 14, 30, 0.82)), url('src/assets/auth.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-semibold leading-tight text-white">
        Alfa
        <br />
        Admin Panel
      </h1>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80">
        Run the back office from one place. Track sales, manage stock across
        every appliance category, fulfil orders, and keep an eye on the
        numbers that matter — all from a single, secure dashboard built for
        the Alfa team.
      </p>

      <p className="mt-6 text-sm font-bold tracking-widest text-blue-400">
        CONTROL. INSIGHT. EFFICIENCY.
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {FEATURES.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs text-white/90 backdrop-blur-sm"
          >
            <Icon size={14} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AdminHero;
