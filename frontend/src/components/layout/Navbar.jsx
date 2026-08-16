import {
  Bell,
  ChevronDown,
  User,
} from "lucide-react";

const Navbar = ({
  userRole = "Citizen",
  userName = "Bhagyashri",
}) => {
  return (
    <header className="h-16 bg-white border-b border-[#DDE3E0] sticky top-0 z-30">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* =====================================================
            MOBILE BRAND
        ===================================================== */}

        <div className="lg:hidden">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 bg-[#312F2C] !text-white flex items-center justify-center font-bold text-sm">
              G
            </div>

            <span className="font-semibold text-[#312F2C]">
              Grievance AI
            </span>

          </div>

        </div>


        {/* =====================================================
            DESKTOP SPACER
        ===================================================== */}

        <div className="hidden lg:block" />


        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-3">


          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              w-9
              h-9
              flex
              items-center
              justify-center
              text-[#69736F]
              hover:bg-[#F4F7F5]
              hover:text-[#312F2C]
              transition
            "
          >

            <Bell size={19} />

            {/* Notification dot */}

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
              DIVIDER
          ================================================= */}

          <div className="hidden sm:block h-7 w-px bg-[#DDE3E0]" />


          {/* =================================================
              USER
          ================================================= */}

          <button
            type="button"
            className="
              flex
              items-center
              gap-3
              px-2
              py-1.5
              hover:bg-[#F4F7F5]
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
                text-[#312F2C]
                flex
                items-center
                justify-center
              "
            >

              <User size={18} />

            </div>


            {/* User information */}

            <div className="hidden sm:block text-left">

              <p className="text-sm font-medium text-[#312F2C] leading-5">
                {userName}
              </p>

              <p className="text-xs text-[#7A8580] leading-4">
                {userRole}
              </p>

            </div>


            {/* Dropdown icon */}

            <ChevronDown
              size={16}
              className="hidden sm:block text-[#8A9590]"
            />

          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;