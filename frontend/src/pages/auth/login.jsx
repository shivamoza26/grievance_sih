import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("citizen");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    // Temporary frontend login
    // Backend authentication will replace this later.

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);

    // Navigate according to selected role
    if (role === "citizen") {
      navigate("/citizen/dashboard");
    } else if (role === "officer") {
      navigate("/officer/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="text-center mb-8">

          <div className="mx-auto w-12 h-12 rounded-xl bg-[#587F73] text-white flex items-center justify-center shadow-sm">
            <ShieldCheck size={25} />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-[#312F2C]">
            Grievance AI
          </h1>

          <p className="mt-1 text-sm text-[#7A8580]">
            Public Service Grievance Platform
          </p>

        </div>


        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <div className="bg-white border border-[#C8D2CE] rounded-xl shadow-sm p-6 sm:p-8">

          {/* Heading */}

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-[#312F2C]">
              Sign in
            </h2>

            <p className="mt-1 text-sm text-[#7A8580]">
              Access your grievance portal.
            </p>

          </div>


          {/* =================================================
              FORM AREA
          ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                ROLE
            ================================================= */}

            <div>

              <label
                htmlFor="role"
                className="block text-sm font-medium text-[#626A67] mb-2"
              >
                Login as
              </label>

              <select
                id="role"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-[#C8D2CE]
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-[#312F2C]
                  outline-none
                  transition
                  focus:border-[#587F73]
                  focus:ring-2
                  focus:ring-[#ABD1C6]/50
                "
              >

                <option value="citizen">
                  Citizen
                </option>

                <option value="officer">
                  Officer
                </option>

                <option value="admin">
                  Administrator
                </option>

              </select>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div>

              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#626A67] mb-2"
              >
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[#8A9590]
                  "
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-[#C8D2CE]
                    bg-white
                    pl-10
                    pr-4
                    py-2.5
                    text-sm
                    text-[#312F2C]
                    placeholder:text-[#9AA39F]
                    outline-none
                    transition
                    focus:border-[#587F73]
                    focus:ring-2
                    focus:ring-[#ABD1C6]/50
                  "
                />

              </div>

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#626A67] mb-2"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[#8A9590]
                  "
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-[#C8D2CE]
                    bg-white
                    pl-10
                    pr-11
                    py-2.5
                    text-sm
                    text-[#312F2C]
                    placeholder:text-[#9AA39F]
                    outline-none
                    transition
                    focus:border-[#587F73]
                    focus:ring-2
                    focus:ring-[#ABD1C6]/50
                  "
                />

                {/* Show / Hide Password */}

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#8A9590]
                    hover:text-[#587F73]
                    transition
                  "
                >

                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}

                </button>

              </div>

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={handleLogin}
              className="
                w-full
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#587F73]
                !text-white
                px-4
                py-2.5
                text-sm
                font-semibold
                hover:bg-[#4B6D63]
                active:bg-[#405E55]
                transition
                cursor-pointer
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#587F73]
                focus-visible:ring-offset-2
              "
            >

              <LogIn size={17} />

              <span>
                Sign in
              </span>

            </button>

          </div>


          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="mt-6 pt-6 border-t border-[#E5EBE8] text-center">

            <p className="text-sm text-[#7A8580]">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="
                inline-block
                mt-1
                text-sm
                font-semibold
                !text-[#587F73]
                hover:!text-[#4B6D63]
                transition
              "
            >
              Create a citizen account
            </Link>

          </div>

        </div>


        {/* =====================================================
            BACK TO HOME
        ===================================================== */}

        <div className="text-center mt-6">

          <Link
            to="/"
            className="
              text-sm
              !text-[#7A8580]
              hover:!text-[#587F73]
              transition
            "
          >
            ← Back to home
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;