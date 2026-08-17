import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  userRole = "Citizen",
  userName = "Bhagyashri",
}) => {
  const navigate = useNavigate();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // =====================================================
  // CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =====================================================
  // SETTINGS
  // =====================================================

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");

    setProfileOpen(false);
    setNotificationOpen(false);

    navigate("/login");
  };

  // =====================================================
  // NOTIFICATION CLICK
  // =====================================================

  const handleNotificationClick = (path) => {
    setNotificationOpen(false);

    if (path) {
      navigate(path);
    }
  };

  return (
    <header
      className="
        h-16
        bg-white
        border-b
        border-[#DCE4E0]
        sticky
        top-0
        z-30
      "
    >
      <div
        className="
          h-full
          px-4
          sm:px-6
          lg:px-8
          flex
          items-center
          justify-between
        "
      >

        {/* =====================================================
            MOBILE BRAND
        ===================================================== */}

        <div className="lg:hidden">

          <div className="flex items-center gap-2">

            <div
              className="
                w-8
                h-8
                rounded-lg
                bg-[#587F73]
                text-white
                flex
                items-center
                justify-center
                font-bold
                text-sm
              "
            >
              G
            </div>

            <span
              className="
                font-semibold
                text-[#312F2C]
              "
            >
              Grievance AI
            </span>

          </div>

        </div>


        {/* =====================================================
            DESKTOP SPACER
        ===================================================== */}

        <div className="hidden lg:block" />


        {/* =====================================================
            RIGHT SECTION
        ===================================================== */}

        <div className="flex items-center gap-3">

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div
            ref={notificationRef}
            className="relative"
          >

            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationOpen}
              onClick={() => {
                setNotificationOpen(
                  (previous) => !previous
                );

                setProfileOpen(false);
              }}
              className="
                relative
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                text-[#626A67]
                hover:bg-[#F0F5F3]
                hover:text-[#587F73]
                transition
              "
            >

              <Bell size={19} />

              {/* Notification indicator */}

              <span
                className="
                  absolute
                  top-2
                  right-2
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-[#587F73]
                "
              />

            </button>


            {/* =================================================
                NOTIFICATION DROPDOWN
            ================================================= */}

            {notificationOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-12
                  w-80
                  max-w-[calc(100vw-2rem)]
                  bg-white
                  border
                  border-[#DCE4E0]
                  rounded-xl
                  shadow-lg
                  overflow-hidden
                  z-50
                "
              >

                {/* Header */}

                <div
                  className="
                    px-4
                    py-3
                    border-b
                    border-[#E5EBE8]
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-[#312F2C]
                      "
                    >
                      Notifications
                    </h3>

                    <p
                      className="
                        text-xs
                        text-[#7A8580]
                        mt-0.5
                      "
                    >
                      Recent updates
                    </p>

                  </div>

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      bg-[#ABD1C6]
                      text-[#405E55]
                      px-2
                      py-1
                      rounded-full
                    "
                  >
                    2 New
                  </span>

                </div>


                {/* =================================================
                    NOTIFICATION 1
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleNotificationClick(
                      "/citizen/grievances/GRV-1047"
                    )
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    border-b
                    border-[#E5EBE8]
                    hover:bg-[#F7FAF9]
                    transition
                    text-left
                  "
                >

                  <div className="flex gap-3">

                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-[#E8F2EF]
                        text-[#587F73]
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                      "
                    >
                      <CheckCircle2 size={16} />
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          text-sm
                          font-medium
                          text-[#312F2C]
                        "
                      >
                        Grievance update
                      </p>

                      <p
                        className="
                          text-xs
                          text-[#7A8580]
                          mt-1
                          leading-5
                        "
                      >
                        Your grievance GRV-1047 has been resolved.
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-[#9AA39F]
                          mt-1
                        "
                      >
                        Recently
                      </p>

                    </div>

                  </div>

                </button>


                {/* =================================================
                    NOTIFICATION 2
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleNotificationClick(
                      "/citizen/grievances/GRV-1048"
                    )
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    hover:bg-[#F7FAF9]
                    transition
                    text-left
                  "
                >

                  <div className="flex gap-3">

                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-[#F5EFE2]
                        text-[#98753A]
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                      "
                    >
                      <Clock3 size={16} />
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          text-sm
                          font-medium
                          text-[#312F2C]
                        "
                      >
                        Grievance in progress
                      </p>

                      <p
                        className="
                          text-xs
                          text-[#7A8580]
                          mt-1
                          leading-5
                        "
                      >
                        GRV-1048 is currently being reviewed.
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-[#9AA39F]
                          mt-1
                        "
                      >
                        Recently
                      </p>

                    </div>

                  </div>

                </button>


                {/* =================================================
                    NOTIFICATION FOOTER
                ================================================= */}

                <div
                  className="
                    px-4
                    py-2.5
                    border-t
                    border-[#E5EBE8]
                    text-center
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(false)
                    }
                    className="
                      text-xs
                      font-semibold
                      !text-[#587F73]
                      hover:!text-[#405E55]
                      transition
                    "
                  >
                    View all notifications
                  </button>

                </div>

              </div>

            )}

          </div>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              hidden
              sm:block
              h-7
              w-px
              bg-[#DCE4E0]
            "
          />


          {/* =================================================
              PROFILE
          ================================================= */}

          <div
            ref={profileRef}
            className="relative"
          >

            <button
              type="button"
              aria-expanded={profileOpen}
              onClick={() => {
                setProfileOpen(
                  (previous) => !previous
                );

                setNotificationOpen(false);
              }}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-2
                py-1.5
                hover:bg-[#F5F8F7]
                transition
              "
            >

              {/* Avatar */}

              <div
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-[#ABD1C6]
                  text-[#405E55]
                  flex
                  items-center
                  justify-center
                "
              >
                <User size={18} />
              </div>


              {/* User information */}

              <div
                className="
                  hidden
                  sm:block
                  text-left
                "
              >

                <p
                  className="
                    text-sm
                    font-medium
                    text-[#312F2C]
                    leading-5
                  "
                >
                  {userName}
                </p>

                <p
                  className="
                    text-xs
                    text-[#7A8580]
                    leading-4
                  "
                >
                  {userRole}
                </p>

              </div>


              {/* Chevron */}

              <ChevronDown
                size={16}
                className={`
                  hidden
                  sm:block
                  text-[#7A8580]
                  transition-transform
                  duration-200
                  ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />

            </button>


            {/* =================================================
                PROFILE DROPDOWN
            ================================================= */}

            {profileOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-12
                  w-64
                  bg-white
                  border
                  border-[#DCE4E0]
                  rounded-xl
                  shadow-lg
                  overflow-hidden
                  z-50
                "
              >

                {/* Profile header */}

                <div
                  className="
                    px-4
                    py-4
                    bg-[#F4F8F6]
                    border-b
                    border-[#E5EBE8]
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-[#ABD1C6]
                        text-[#405E55]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <User size={19} />
                    </div>

                    <div>

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-[#312F2C]
                        "
                      >
                        {userName}
                      </p>

                      <p
                        className="
                          text-xs
                          text-[#7A8580]
                          mt-0.5
                        "
                      >
                        {userRole}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Profile options */}

                <div className="p-2">

                  {/* Settings */}

                  <button
                    type="button"
                    onClick={handleSettings}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-lg
                      text-sm
                      !text-[#626A67]
                      hover:bg-[#F0F5F3]
                      hover:!text-[#587F73]
                      transition
                      text-left
                    "
                  >

                    <Settings size={17} />

                    <span>
                      Settings
                    </span>

                  </button>


                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-lg
                      text-sm
                      !text-[#8A5A55]
                      hover:bg-[#FBF2F1]
                      hover:!text-[#A65F58]
                      transition
                      text-left
                    "
                  >

                    <LogOut size={17} />

                    <span>
                      Logout
                    </span>

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;