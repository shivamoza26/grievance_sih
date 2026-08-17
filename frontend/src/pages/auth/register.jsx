import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name || !email || !phone) {
      setError("Please fill in all required fields.");
      return;
    }

    if (phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    // =====================================================
    // TEMPORARY FRONTEND REGISTRATION
    // Backend registration will replace this later.
    // =====================================================

    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    localStorage.setItem(
      "userRole",
      "citizen"
    );

    localStorage.setItem(
      "userName",
      name
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    localStorage.setItem(
      "userPhone",
      phone
    );

    setSuccess(true);

    // Small delay so user sees success message.
    setTimeout(() => {
      navigate("/citizen/dashboard");
    }, 700);
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#F4F7F5]
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >

      <div className="w-full max-w-md">

        {/* =================================================
            BRAND
        ================================================= */}

        <div className="text-center mb-8">

          <div
            className="
              mx-auto
              w-12
              h-12
              rounded-xl
              bg-[#587F73]
              text-white
              flex
              items-center
              justify-center
              shadow-sm
            "
          >
            <ShieldCheck size={25} />
          </div>

          <h1
            className="
              mt-4
              text-2xl
              font-bold
              text-[#312F2C]
            "
          >
            Grievance AI
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-[#7A8580]
            "
          >
            Public Service Grievance Platform
          </p>

        </div>


        {/* =================================================
            REGISTER CARD
        ================================================= */}

        <div
          className="
            bg-white
            border
            border-[#C8D2CE]
            rounded-xl
            shadow-sm
            p-6
            sm:p-8
          "
        >

          <div className="mb-6">

            <h2
              className="
                text-xl
                font-semibold
                text-[#312F2C]
              "
            >
              Create account
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#7A8580]
              "
            >
              Register as a citizen to submit grievances.
            </p>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="
                mb-5
                rounded-lg
                border
                border-[#E5C8C4]
                bg-[#FBF2F1]
                px-3
                py-2.5
                text-sm
                text-[#8A5A55]
              "
            >
              {error}
            </div>
          )}


          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <div
              className="
                mb-5
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-[#C4DED4]
                bg-[#E4F0EB]
                px-3
                py-2.5
                text-sm
                font-medium
                text-[#4B6D63]
              "
            >
              <CheckCircle2 size={16} />

              Account created successfully.
            </div>
          )}


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label
                htmlFor="name"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#626A67]
                  mb-2
                "
              >
                Full name
              </label>

              <div className="relative">

                <User
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
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
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


            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#626A67]
                  mb-2
                "
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
                  required
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


            {/* PHONE */}

            <div>

              <label
                htmlFor="phone"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#626A67]
                  mb-2
                "
              >
                Phone number
              </label>

              <div className="relative">

                <Phone
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
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  autoComplete="tel"
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


            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#626A67]
                  mb-2
                "
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
                  placeholder="Create a password"
                  required
                  autoComplete="new-password"
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


            {/* CONFIRM PASSWORD */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#626A67]
                  mb-2
                "
              >
                Confirm password
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
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
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

                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() =>
                    setShowConfirmPassword(
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
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>


            {/* =================================================
                REGISTER BUTTON
            ================================================= */}

            <button
              type="submit"
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
              "
            >
              <UserPlus size={17} />

              <span className="!text-white">
                Create account
              </span>
            </button>

          </form>


          {/* =================================================
              LOGIN LINK
          ================================================= */}

          <div
            className="
              mt-6
              pt-6
              border-t
              border-[#E5EBE8]
              text-center
            "
          >

            <p className="text-sm text-[#7A8580]">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="
                inline-block
                mt-1
                text-sm
                font-semibold
                !text-[#587F73]
                hover:!text-[#4B6D63]
              "
            >
              Sign in
            </Link>

          </div>

        </div>


        {/* =================================================
            BACK TO HOME
        ================================================= */}

        <div className="text-center mt-6">

          <Link
            to="/"
            className="
              text-sm
              !text-[#7A8580]
              hover:!text-[#587F73]
            "
          >
            ← Back to home
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;