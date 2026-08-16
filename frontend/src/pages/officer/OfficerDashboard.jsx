import {
  ClipboardList,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";

import { officerGrievances } from "../../mocks/officerGrievances";

const OfficerDashboard = () => {
  const total = officerGrievances.length;

  const pending = officerGrievances.filter(
    (item) => item.status === "PENDING"
  ).length;

  const highPriority = officerGrievances.filter(
    (item) => item.priority === "HIGH"
  ).length;

  const resolved = officerGrievances.filter(
    (item) => item.status === "RESOLVED"
  ).length;

  const stats = [
    {
      label: "Assigned",
      value: total,
      icon: ClipboardList,
      iconClass: "bg-blue-50 text-blue-700",
    },
    {
      label: "Pending Review",
      value: pending,
      icon: Clock3,
      iconClass: "bg-amber-50 text-amber-700",
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: AlertTriangle,
      iconClass: "bg-red-50 text-red-700",
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
      role="officer"
      userName="Officer"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-blue-700">
            Officer Workspace
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Good evening, Officer
          </h1>

          <p className="mt-2 text-slate-500">
            Review assigned grievances and prioritize cases that need attention.
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
                      {stat.value}
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

        {/* Priority Queue */}
        <div className="mt-8">

          <div className="flex items-end justify-between mb-4">

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Priority Queue
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Grievances that need your attention.
              </p>
            </div>

            <a
              href="/officer/grievances"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              View all
              <ArrowRight size={16} />
            </a>

          </div>

          <Card padding={false}>

            <div className="divide-y divide-slate-100">

              {officerGrievances
                .filter((item) => item.priority === "HIGH")
                .map((grievance) => (

                  <a
                    key={grievance.id}
                    href={`/officer/grievances/${grievance.id}`}
                    className="block p-5 hover:bg-slate-50 transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                      <div className="min-w-0">

                        <div className="flex items-center gap-3 flex-wrap">

                          <span className="text-xs font-semibold text-slate-400">
                            {grievance.id}
                          </span>

                          <PriorityBadge
                            priority={grievance.priority}
                          />

                          <StatusBadge
                            status={grievance.status}
                          />

                        </div>

                        <h3 className="mt-2 font-semibold text-slate-900">
                          {grievance.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                          {grievance.aiSummary}
                        </p>

                      </div>

                      <div className="flex items-center gap-6">

                        <div className="hidden md:block">
                          <p className="text-xs text-slate-400">
                            AI Confidence
                          </p>

                          <p className="mt-1 text-sm font-semibold text-emerald-600">
                            {Math.round(
                              grievance.confidence * 100
                            )}
                            %
                          </p>
                        </div>

                        <ArrowRight
                          size={18}
                          className="text-slate-400"
                        />

                      </div>

                    </div>

                  </a>

                ))}

            </div>

          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default OfficerDashboard;