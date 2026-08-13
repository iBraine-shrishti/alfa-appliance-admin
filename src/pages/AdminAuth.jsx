import { FiShield } from "react-icons/fi";
import AdminHero from "../components/auth/AdminHero";
import AdminLoginForm from "../components/auth/AdminLoginForm";
import Logo from "../components/logo/Logo";

const AdminAuth = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 lg:min-h-[calc(100vh-2.75rem)]">
      <AdminHero />

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex justify-center">
            {/* <span className="text-2xl font-extrabold tracking-tight text-navy-950">
              ALFA
              <span className="ml-1 block text-center text-[10px] font-semibold tracking-[0.3em] text-blue-600">
                APPLIANCES
              </span>
            </span> */}
             <Logo />
          </div>

          <div className="flex items-center justify-center gap-2 border-b border-slate-200 pb-3">
            <FiShield size={16} className="text-navy-950" />
            <span className="text-base font-bold text-navy-950">
              Admin Login
            </span>
          </div>

          <div className="mt-6">
            <AdminLoginForm />
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Not an admin?{" "}
            <a href="/login" className="font-semibold text-blue-600 hover:underline">
              Go to customer login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
