import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({
  children,
  role = "citizen",
  userName = "Bhagyashri",
}) => {
  const roleName =
    role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="min-h-screen bg-[#F4F7F5]">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar role={role} />


      {/* =================================================
          MAIN APPLICATION AREA
      ================================================= */}

      <div className="lg:ml-64 min-h-screen">

        {/* =================================================
            TOP NAVIGATION
        ================================================= */}

        <Navbar
          userRole={roleName}
          userName={userName}
        />


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          className="
            w-full
            px-4
            py-6
            sm:px-6
            lg:px-8
            max-w-[1600px]
            mx-auto
          "
        >
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;