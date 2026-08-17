import {
  FileText,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";

import {
  adminStats,
  categoryData,
  departmentData,
} from "../../mocks/adminAnalytics";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Grievances",
      value: adminStats.total,
      icon: FileText,
      iconClass: "bg-[#E4F0EB] text-[#587F73]",
    },
    {
      label: "Pending",
      value: adminStats.pending,
      icon: Clock3,
      iconClass: "bg-[#F8F1E5] text-[#9A7435]",
    },
    {
      label: "In Progress",
      value: adminStats.inProgress,
      icon: AlertTriangle,
      iconClass: "bg-[#F0F6F3] text-[#587F73]",
    },
    {
      label: "Resolved",
      value: adminStats.resolved,
      icon: CheckCircle2,
      iconClass: "bg-[#E4F0EB] text-[#4B6D63]",
    },
  ];

  const topCategories = [...categoryData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <DashboardLayout
      role="admin"
      userName="Admin"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-[#587F73]">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#312F2C]">
            System Overview
          </h1>

          <p className="mt-2 text-[#626A67]">
            Monitor grievance activity and department performance.
          </p>
        </div>


        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.label}>

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm text-[#7A8580]">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#312F2C]">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`
                      w-10 h-10 rounded-lg
                      flex items-center justify-center
                      ${stat.iconClass}
                    `}
                  >
                    <Icon size={20} />
                  </div>

                </div>

              </Card>
            );
          })}

        </div>


        {/* Resolution Rate */}
        <Card className="mt-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <p className="text-sm font-medium text-[#312F2C]">
                Resolution Rate
              </p>

              <p className="mt-1 text-sm text-[#7A8580]">
                Percentage of grievances successfully resolved.
              </p>

            </div>

            <p className="text-3xl font-bold text-[#587F73]">
              {adminStats.resolutionRate}%
            </p>

          </div>


          <div className="mt-4 h-2.5 rounded-full bg-[#EEF1EF] overflow-hidden">

            <div
              className="h-full rounded-full bg-[#587F73]"
              style={{
                width: `${adminStats.resolutionRate}%`,
              }}
            />

          </div>

        </Card>


        {/* Main sections */}
        <div className="grid xl:grid-cols-2 gap-6 mt-6">


          {/* =================================================
              CATEGORIES
          ================================================= */}

          <Card>

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold text-[#312F2C]">
                  Top Categories
                </h2>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Most frequently reported grievance categories.
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-[#8A9590]"
              />

            </div>


            <div className="mt-6 space-y-5">

              {topCategories.map((category) => {

                const percentage =
                  (category.value / categoryData[0].value) *
                  100;

                return (
                  <div key={category.name}>

                    <div className="flex items-center justify-between text-sm">

                      <span className="font-medium text-[#626A67]">
                        {category.name}
                      </span>

                      <span className="text-[#7A8580]">
                        {category.value}
                      </span>

                    </div>


                    <div className="mt-2 h-2 rounded-full bg-[#EEF1EF] overflow-hidden">

                      <div
                        className="h-full rounded-full bg-[#587F73]"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

          </Card>


          {/* =================================================
              DEPARTMENTS
          ================================================= */}

          <Card>

            <div>

              <h2 className="text-lg font-semibold text-[#312F2C]">
                Department Performance
              </h2>

              <p className="mt-1 text-sm text-[#7A8580]">
                Current workload across departments.
              </p>

            </div>


            <div className="mt-6 space-y-4">

              {departmentData.map((department) => (

                <div
                  key={department.department}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-lg
                    px-3
                    py-3
                    hover:bg-[#F4F7F5]
                    transition
                  "
                >

                  <div className="min-w-0">

                    <p className="text-sm font-medium text-[#312F2C] truncate">
                      {department.department}
                    </p>

                    <p className="mt-1 text-xs text-[#8A9590]">
                      {department.assigned} assigned
                    </p>

                  </div>


                  <div className="text-right">

                    <p className="text-sm font-semibold text-[#587F73]">
                      {department.resolved} resolved
                    </p>

                    <p className="mt-1 text-xs text-[#8A9590]">
                      {department.pending} pending
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;