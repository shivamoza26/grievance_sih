import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  Settings,
  LogOut,
  ClipboardList,
  Users,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ role = "citizen" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navigation = {
    citizen: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/citizen/dashboard",
      },
      {
        label: "My Grievances",
        icon: FileText,
        path: "/citizen/grievances",
      },
      {
        label: "Submit Grievance",
        icon: PlusCircle,
        path: "/citizen/submit",
      },
    ],

    officer: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/officer/dashboard",
      },
      {
        label: "Assigned Grievances",
        icon: ClipboardList,
        path: "/officer/grievances",
      },
      {
        label: "Priority Queue",
        icon: FileText,
        path: "/officer/priority",
      },
    ],

    admin: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
      {
        label: "Grievances",
        icon: FileText,
        path: "/admin/grievances",
      },
      {
        label: "Analytics",
        icon: BarChart3,
        path: "/admin/analytics",
      },
      {
        label: "Departments",
        icon: Users,
        path: "/admin/departments",
      },
    ],
  };

  const items = navigation[role] || navigation.citizen;

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="h-16 px-6 flex items-center border-b border-[#4A4744]">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center font-bold">
            G
          </div>

          <div>

            <h1 className="font-semibold tracking-tight !text-white">
              Grievance AI
            </h1>

            <p className="text-[10px] text-[#A1C6B9] uppercase tracking-wider">
              Public Service Platform
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="flex-1 px-3 py-6">

        <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#939C98]">
          Workspace
        </p>

        <div className="space-y-1">

          {items.map((item) => {

            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`
                  flex items-center gap-3
                  px-3 py-2.5
                  text-sm
                  transition
                  ${
                    active
                      ? "bg-[#ABD1C6] !text-[#312F2C] font-semibold"
                      : "!text-[#C8CFCC] hover:bg-[#403D3A] hover:!text-white"
                  }
                `}
              >

                <Icon
                  size={18}
                  className={
                    active
                      ? "!text-[#312F2C]"
                      : "!text-[#A1C6B9]"
                  }
                />

                <span
                  className={
                    active
                      ? "!text-[#312F2C]"
                      : "!text-[#C8CFCC]"
                  }
                >
                  {item.label}
                </span>

              </Link>
            );

          })}

        </div>

      </nav>


      {/* =====================================================
          BOTTOM ACTIONS
      ===================================================== */}

      <div className="p-3 border-t border-[#4A4744]">

        {/* Settings */}

        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm !text-[#AEB7B3] hover:bg-[#403D3A] hover:!text-white transition"
        >

          <Settings size={18} />

          <span>Settings</span>

        </button>


        {/* Logout */}

        <button
          type="button"
          className="w-full mt-1 flex items-center gap-3 px-3 py-2.5 text-sm !text-[#AEB7B3] hover:bg-[#493B38] hover:!text-white transition"
        >

          <LogOut size={18} />

          <span>Logout</span>

        </button>

      </div>
    </>
  );


  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden lg:flex w-64 bg-[#312F2C] !text-white min-h-screen flex-col fixed left-0 top-0 z-40">

        {sidebarContent}

      </aside>


      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        className="lg:hidden fixed left-4 top-3.5 z-50 w-9 h-9 bg-[#312F2C] !text-white flex items-center justify-center shadow-md hover:bg-[#211F1D] transition"
      >

        <Menu
          size={19}
          className="!text-white"
        />

      </button>


      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#312F2C]/50 backdrop-blur-[2px]"
          onClick={closeMobileMenu}
        />
      )}


      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}

      <aside
        className={`
          lg:hidden
          fixed
          left-0
          top-0
          bottom-0
          z-[60]
          w-72
          bg-[#312F2C]
          !text-white
          flex
          flex-col
          transform
          transition-transform
          duration-300
          ease-out
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Mobile close button */}

        <button
          type="button"
          onClick={closeMobileMenu}
          aria-label="Close navigation menu"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center !text-[#AEB7B3] hover:bg-[#403D3A] hover:!text-white transition"
        >

          <X
            size={19}
            className="!text-current"
          />

        </button>


        {sidebarContent}

      </aside>

    </>
  );
};

export default Sidebar;