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
      iconClass: "bg-blue-50 text-blue-700",
    },
    {
      label: "Pending",
      value: adminStats.pending,
      icon: Clock3,
      iconClass: "bg-amber-50 text-amber-700",
    },
    {
      label: "In Progress",
      value: adminStats.inProgress,
      icon: AlertTriangle,
      iconClass: "bg-indigo-50 text-indigo-700",
    },
    {
      label: "Resolved",
      value: adminStats.resolved,
      icon: CheckCircle2,
      iconClass: "bg-emerald-50 text-emerald-700",
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
          <p className="text-sm font-medium text-blue-700">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            System Overview
          </h1>

          <p className="mt-2 text-slate-500">
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
                    <p className="text-sm text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
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
              <p className="text-sm font-medium text-slate-900">
                Resolution Rate
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Percentage of grievances successfully resolved.
              </p>
            </div>

            <p className="text-3xl font-bold text-emerald-600">
              {adminStats.resolutionRate}%
            </p>

          </div>

          <div className="mt-4 h-2.5 rounded-full bg-slate-100 overflow-hidden">

            <div
              className="h-full rounded-full bg-emerald-500"
              style={{
                width: `${adminStats.resolutionRate}%`,
              }}
            />

          </div>

        </Card>

        {/* Main sections */}
        <div className="grid xl:grid-cols-2 gap-6 mt-6">

          {/* Categories */}
          <Card>

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Top Categories
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Most frequently reported grievance categories.
                </p>
              </div>

              <ArrowRight
                size={18}
                className="text-slate-300"
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

                      <span className="font-medium text-slate-700">
                        {category.name}
                      </span>

                      <span className="text-slate-500">
                        {category.value}
                      </span>

                    </div>

                    <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">

                      <div
                        className="h-full rounded-full bg-blue-600"
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

          {/* Departments */}
          <Card>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Department Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current workload across departments.
              </p>
            </div>

            <div className="mt-6 space-y-4">

              {departmentData.map((department) => (

                <div
                  key={department.department}
                  className="flex items-center justify-between gap-4"
                >

                  <div className="min-w-0">

                    <p className="text-sm font-medium text-slate-800 truncate">
                      {department.department}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {department.assigned} assigned
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-semibold text-emerald-600">
                      {department.resolved} resolved
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
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