import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { login, getErrorMessage } from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("citizen");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const data = await login(formData.email, formData.password);

      if (data.role !== role) {
        localStorage.clear();
        throw new Error(`This account is registered as ${data.role}, not ${role}.`);
      }

      navigate(`/${data.role}/dashboard`);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#587F73] text-white flex items-center justify-center shadow-sm">
            <ShieldCheck size={25} />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#312F2C]">Grievance AI</h1>
          <p className="mt-1 text-sm text-[#7A8580]">Public Service Grievance Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[#C8D2CE] rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[#312F2C]">Sign in</h2>
          <p className="mt-1 text-sm text-[#7A8580]">Access your grievance portal.</p>

          {error && (
            <div className="mt-5 rounded-lg border border-[#E5C8C4] bg-[#FBF2F1] px-3 py-2.5 text-sm text-[#8A5A55]">
              {error}
            </div>
          )}

          <div className="space-y-5 mt-6">
            <div>
              <label className="block text-sm font-medium text-[#626A67] mb-2">Login as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"
              >
                <option value="citizen">Citizen</option>
                <option value="officer">Officer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#626A67] mb-2">Email address</label>
              <div className="relative">
                <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-4 py-2.5 text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#626A67] mb-2">Password</label>
              <div className="relative">
                <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-11 py-2.5 text-sm"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9590]">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#587F73] text-white px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              <LogIn size={17} />
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E5EBE8] text-center">
            <p className="text-sm text-[#7A8580]">Don't have an account?</p>
            <Link to="/register" className="inline-block mt-1 text-sm font-semibold text-[#587F73]">
              Create a citizen account
            </Link>
          </div>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-[#7A8580]">← Back to home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
