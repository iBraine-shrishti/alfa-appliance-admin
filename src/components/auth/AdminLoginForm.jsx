import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const AdminLoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real admin authentication.
    navigate("/admin/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-navy-950">
          Email Address
        </label>
        <input
          id="admin-email"
          type="email"
          required
          placeholder="technician@alfa.com"
          className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="admin-password" className="block text-sm font-semibold text-navy-950">
            Password
          </label>
          <button type="button" className="text-xs font-semibold text-blue-600 hover:underline">
            Forgot?
          </button>
        </div>
        <input
          id="admin-password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
        />
      </div>

      <button
        type="submit"
        className="mt-1 flex w-full items-center justify-center gap-2 rounded bg-blue-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
      >
        Sign In
        <FiArrowRight size={16} />
      </button>
    </form>
  );
};

export default AdminLoginForm;
