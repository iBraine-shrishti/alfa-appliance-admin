import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { adminLoginApi } from "../../services/api";

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@alfaappliances.co.uk");
  const [password, setPassword] = useState("admin123");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const result = await adminLoginApi(email, password);
    setLoading(false);

    if (result.success) {
      localStorage.setItem("adminToken", result.token);
      localStorage.setItem("adminUser", JSON.stringify(result.user));
      navigate("/admin/dashboard");
    } else {
      setErrorMsg(result.error || "Authentication failed. Check admin credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {errorMsg && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-navy-950">
          Email Address
        </label>
        <input
          id="admin-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@alfaappliances.co.uk"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-950 outline-none placeholder:text-slate-400 focus:border-blue-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded bg-blue-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
        <FiArrowRight size={16} />
      </button>
    </form>
  );
};

export default AdminLoginForm;
