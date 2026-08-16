import { Link } from "react-router-dom";
import {
  FileText,
  Clock3,
  CheckCircle2,
  ArrowRight,
  Plus,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";

import { mockGrievances } from "../../mocks/grievances";

const CitizenDashboard = () => {
  const total = mockGrievances.length;

  const pending = mockGrievances.filter(
    (item) => item.status === "PENDING"
  ).length;

  const inProgress = mockGrievances.filter(
    (item) => item.status === "IN_PROGRESS"
  ).length;

  const resolved = mockGrievances.filter(
    (item) => item.status === "RESOLVED"
  ).length;

  const stats = [
    {
      label: "Total Grievances",
      value: total,
      icon: FileText,
      iconClass: "bg-blue-50 text-blue-700",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
      iconClass: "bg-amber-50 text-amber-700",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock3,
      iconClass: "bg-indigo-50 text-indigo-700",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      iconClass: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <DashboardLayout
      role="citizen"
      userName="Bhagyashri"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-700">
            Citizen Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Good evening, Bhagyashri 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's an overview of your submitted grievances.
          </p>
        </div>

        <Link
          href="/citizen/submit"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition"
        >
          <Plus size={18} />
          Submit Grievance
        </Link>
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
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconClass}`}
                >
                  <Icon size={20} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent grievances */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Grievances
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Track the latest complaints you've submitted.
            </p>
          </div>

          <Link
            to="/citizen/grievances"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <Card padding={false}>
          <div className="divide-y divide-slate-100">
            {mockGrievances.map((grievance) => (
              <Link
                key={grievance.id}
                to={`/citizen/grievances/${grievance.id}`}
                className="block p-5 hover:bg-slate-50 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-semibold text-slate-400">
                        {grievance.id}
                      </span>

                      <StatusBadge
                        status={grievance.status}
                      />
                    </div>

                    <h3 className="mt-2 font-medium text-slate-900">
                      {grievance.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                      {grievance.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-6 text-sm">
                    <div>
                      <p className="text-xs text-slate-400">
                        Department
                      </p>

                      <p className="mt-1 text-slate-700">
                        {grievance.department}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-slate-400"
                    />
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

    </DashboardLayout>
  );
};

export default CitizenDashboard;