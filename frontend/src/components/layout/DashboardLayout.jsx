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

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main application area */}
      <div className="lg:ml-64 min-h-screen">

        {/* Top navigation */}
        <Navbar
          userRole={roleName}
          userName={userName}
        />

        {/* Page content */}
        <main className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;