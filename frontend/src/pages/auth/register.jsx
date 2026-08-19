import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, User, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { registerCitizen, getErrorMessage, login } from "../../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await registerCitizen({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      const data = await login(formData.email.trim(), formData.password);
      localStorage.setItem("userName", formData.name.trim());
      localStorage.setItem("userEmail", formData.email.trim());
      localStorage.setItem("userPhone", formData.phone.trim());
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
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#587F73] text-white flex items-center justify-center">
            <ShieldCheck size={25} />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#312F2C]">Grievance AI</h1>
          <p className="mt-1 text-sm text-[#7A8580]">Create your citizen account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[#C8D2CE] rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[#312F2C]">Create account</h2>

          {error && <div className="mt-5 rounded-lg border border-[#E5C8C4] bg-[#FBF2F1] px-3 py-2.5 text-sm text-[#8A5A55]">{error}</div>}

          <div className="space-y-4 mt-6">
            <label className="block text-sm font-medium text-[#626A67]">
              Full Name
              <div className="relative mt-2">
                <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]" />
                <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-4 py-2.5 text-sm" />
              </div>
            </label>

            <label className="block text-sm font-medium text-[#626A67]">
              Email
              <div className="relative mt-2">
                <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-4 py-2.5 text-sm" />
              </div>
            </label>

            <label className="block text-sm font-medium text-[#626A67]">
              Phone (optional)
              <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full mt-2 rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm" />
            </label>

            <label className="block text-sm font-medium text-[#626A67]">
              Password
              <div className="relative mt-2">
                <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]" />
                <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-11 py-2.5 text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9590]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              </div>
            </label>

            <label className="block text-sm font-medium text-[#626A67]">
              Confirm Password
              <div className="relative mt-2">
                <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]" />
                <input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-11 py-2.5 text-sm" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9590]">{showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              </div>
            </label>

            <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#587F73] text-white px-4 py-2.5 text-sm font-semibold disabled:opacity-60">
              <UserPlus size={17} />
              {loading ? "Creating..." : "Create account"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-[#7A8580]">
            Already have an account? <Link to="/login" className="font-semibold text-[#587F73]">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
