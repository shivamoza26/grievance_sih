import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Check,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: localStorage.getItem("userName") || "Bhagyashri",
    email: "",
    phone: "",
  });

  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] =
    useState("");

  const [passwordSuccess, setPasswordSuccess] =
    useState(false);

  // =====================================================
  // PROFILE
  // =====================================================

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSaveProfile = () => {
    localStorage.setItem(
      "userName",
      profile.name
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  // =====================================================
  // PASSWORD
  // =====================================================

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setPasswordError("");
    setPasswordSuccess(false);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordError("");
    setPasswordSuccess(false);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordData;

    if (!currentPassword) {
      setPasswordError(
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      setPasswordError(
        "Please enter a new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New passwords do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "New password must be different from the current password."
      );
      return;
    }

    // Temporary frontend implementation.
    // This will be replaced by backend API later.
    localStorage.setItem(
      "demoPassword",
      newPassword
    );

    setPasswordSuccess(true);

    setTimeout(() => {
      closePasswordModal();
    }, 1500);
  };

  return (
    <DashboardLayout
      role="citizen"
      userName={profile.name}
    >
      <div className="max-w-5xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <p className="text-sm font-medium text-[#587F73]">
            Account Settings
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#312F2C]">
            Settings
          </h1>

          <p className="mt-2 text-[#7A8580]">
            Manage your profile, notifications and security.
          </p>
        </div>


        {/* =================================================
            PROFILE
        ================================================= */}

        <Card className="mb-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-[#E8F2EF] text-[#587F73] flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#312F2C]">
                Profile Information
              </h2>

              <p className="text-sm text-[#7A8580] mt-1">
                Update your personal information.
              </p>
            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-5">

            {/* Name */}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#626A67] mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full rounded-lg border border-[#C8D2CE] bg-white px-3 py-2.5 text-sm text-[#312F2C] outline-none focus:border-[#587F73] focus:ring-2 focus:ring-[#ABD1C6]/40"
              />
            </div>


            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#626A67] mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-[#C8D2CE] bg-white px-3 py-2.5 text-sm text-[#312F2C] placeholder:text-[#9AA39F] outline-none focus:border-[#587F73] focus:ring-2 focus:ring-[#ABD1C6]/40"
              />
            </div>


            {/* Phone */}

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#626A67] mb-2"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleProfileChange}
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-[#C8D2CE] bg-white px-3 py-2.5 text-sm text-[#312F2C] placeholder:text-[#9AA39F] outline-none focus:border-[#587F73] focus:ring-2 focus:ring-[#ABD1C6]/40"
              />
            </div>

          </div>

        </Card>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <Card className="mb-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-[#E8F2EF] text-[#587F73] flex items-center justify-center">
              <Bell size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#312F2C]">
                Notifications
              </h2>

              <p className="text-sm text-[#7A8580] mt-1">
                Manage your notification preferences.
              </p>
            </div>

          </div>


          {/* Notification toggle */}

          <div className="flex items-center justify-between gap-4 py-3">

            <div>
              <p className="text-sm font-medium text-[#312F2C]">
                Grievance notifications
              </p>

              <p className="text-xs text-[#7A8580] mt-1">
                Receive updates when your grievance status changes.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setNotifications(
                  (previous) => !previous
                )
              }
              className={`relative w-11 h-6 rounded-full transition ${
                notifications
                  ? "bg-[#587F73]"
                  : "bg-[#C8D2CE]"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition ${
                  notifications
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>


          {/* Email toggle */}

          <div className="flex items-center justify-between gap-4 py-3 border-t border-[#E5EBE8]">

            <div>
              <p className="text-sm font-medium text-[#312F2C]">
                Email updates
              </p>

              <p className="text-xs text-[#7A8580] mt-1">
                Receive important updates through email.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setEmailUpdates(
                  (previous) => !previous
                )
              }
              className={`relative w-11 h-6 rounded-full transition ${
                emailUpdates
                  ? "bg-[#587F73]"
                  : "bg-[#C8D2CE]"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition ${
                  emailUpdates
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

        </Card>


        {/* =================================================
            SECURITY
        ================================================= */}

        <Card className="mb-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-[#E8F2EF] text-[#587F73] flex items-center justify-center">
              <Shield size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#312F2C]">
                Security
              </h2>

              <p className="text-sm text-[#7A8580] mt-1">
                Manage your account security.
              </p>
            </div>

          </div>


          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg bg-[#F4F8F6] border border-[#E5EBE8]">

            <div>
              <p className="text-sm font-medium text-[#312F2C]">
                Password
              </p>

              <p className="text-xs text-[#7A8580] mt-1">
                Change your account password.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowPasswordModal(true)
              }
              className="px-4 py-2.5 rounded-lg border border-[#C8D2CE] bg-white !text-[#587F73] text-sm font-semibold hover:bg-[#F0F5F3] transition"
            >
              Change Password
            </button>

          </div>

        </Card>


        {/* =================================================
            APPEARANCE
        ================================================= */}

        <Card className="mb-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-[#E8F2EF] text-[#587F73] flex items-center justify-center">
              <Palette size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#312F2C]">
                Appearance
              </h2>

              <p className="text-sm text-[#7A8580] mt-1">
                Current interface theme.
              </p>
            </div>

          </div>


          <div className="flex items-center gap-4 p-4 rounded-lg border border-[#ABD1C6] bg-[#F4F8F6]">

            <div className="w-10 h-10 rounded-lg bg-[#312F2C] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#ABD1C6]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#312F2C]">
                Jade & Jet
              </p>

              <p className="text-xs text-[#7A8580] mt-1">
                Official Grievance AI theme
              </p>
            </div>

          </div>

        </Card>


        {/* =================================================
            SAVE
        ================================================= */}

        <div className="flex justify-end pb-8">

          <button
            type="button"
            onClick={handleSaveProfile}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#587F73] !text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#4B6D63] transition"
          >

            {saved ? (
              <>
                <Check size={17} />
                Saved
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}

          </button>

        </div>

      </div>


      {/* =====================================================
          CHANGE PASSWORD MODAL
      ===================================================== */}

      {showPasswordModal && (

        <div className="fixed inset-0 z-[100] bg-[#312F2C]/50 flex items-center justify-center px-4">

          <div className="w-full max-w-md bg-white rounded-xl border border-[#C8D2CE] shadow-xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5EBE8]">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-[#E8F2EF] text-[#587F73] flex items-center justify-center">
                  <Lock size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#312F2C]">
                    Change Password
                  </h2>

                  <p className="text-xs text-[#7A8580] mt-1">
                    Update your account password.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={closePasswordModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A9590] hover:bg-[#F0F5F3] hover:text-[#587F73]"
              >
                ×
              </button>

            </div>


            {/* Form */}

            <form
              onSubmit={handleChangePassword}
              className="p-6 space-y-5"
            >

              {passwordError && (
                <div className="rounded-lg border border-[#E5C8C4] bg-[#FBF2F1] px-3 py-2.5 text-sm text-[#8A5A55]">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="flex items-center gap-2 rounded-lg border border-[#ABD1C6] bg-[#E8F2EF] px-3 py-2.5 text-sm font-medium text-[#405E55]">
                  <Check size={16} />
                  Password changed successfully.
                </div>
              )}


              {/* Current password */}

              <div>

                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-[#626A67] mb-2"
                >
                  Current Password
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]"
                  />

                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      passwordData.currentPassword
                    }
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className="w-full rounded-lg border border-[#C8D2CE] bg-white pl-10 pr-11 py-2.5 text-sm text-[#312F2C] outline-none focus:border-[#587F73] focus:ring-2 focus:ring-[#ABD1C6]/40"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9590] hover:text-[#587F73]"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>


              {/* New password */}

              <div>

                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-[#626A67] mb-2"
                >
                  New Password
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]"
                  />

                  <input
                    id="newPassword"
                    name="newPassword"
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      passwordData.newPassword
                    }
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full rounded-lg border border-[#C8D2CE] bg-white pl-10 pr-11 py-2.5 text-sm text-[#312F2C] outline-none focus:border-[#587F73] focus:ring-2 focus:ring-[#ABD1C6]/40"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9590] hover:text-[#587F73]"
                  >
                    {showNewPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>


              {/* Confirm password */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#626A67] mb-2"
                >
                  Confirm New Password
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      passwordData.confirmPassword
                    }
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className="w-full rounded-lg border border-[#C8D2CE] bg-white pl-10 pr-11 py-2.5 text-sm text-[#312F2C] outline-none focus:border-[#587F73] focus:ring-2 focus:ring-[#ABD1C6]/40"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9590] hover:text-[#587F73]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>


              {/* Buttons */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={closePasswordModal}
                  className="px-4 py-2.5 rounded-lg border border-[#C8D2CE] bg-white !text-[#626A67] text-sm font-semibold hover:bg-[#F4F7F5] transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#587F73] !text-white text-sm font-semibold hover:bg-[#4B6D63] transition"
                >
                  Change Password
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
};

export default Settings;