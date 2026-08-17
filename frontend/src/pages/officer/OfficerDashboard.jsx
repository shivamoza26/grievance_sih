import { Link } from "react-router-dom";
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
      iconClass: "bg-[#EAF3F0] text-[#587F73]",
    },
    {
      label: "Pending Review",
      value: pending,
      icon: Clock3,
      iconClass: "bg-[#F5EEDF] text-[#8A642F]",
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: AlertTriangle,
      iconClass: "bg-[#F5E8E6] text-[#A34F4F]",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      iconClass: "bg-[#DCEBE5] text-[#4B6D63]",
    },
  ];

  return (
    <DashboardLayout
      role="officer"
      userName="Officer"
    >
      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div>

          <p className="text-sm font-medium text-[#587F73]">
            Officer Workspace
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#312F2C]">
            Good evening, Officer
          </h1>

          <p className="mt-2 text-[#626A67]">
            Review assigned grievances and prioritize cases that
            need attention.
          </p>

        </div>


        {/* =====================================================
            STATS
        ===================================================== */}

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
                      {stat.value}
                    </p>

                  </div>


                  <div
                    className={`
                      w-10
                      h-10
                      rounded-lg
                      flex
                      items-center
                      justify-center
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


        {/* =====================================================
            PRIORITY QUEUE
        ===================================================== */}

        <div className="mt-8">

          <div className="flex items-end justify-between mb-4">

            <div>

              <h2 className="text-lg font-semibold text-[#312F2C]">
                Priority Queue
              </h2>

              <p className="mt-1 text-sm text-[#7A8580]">
                Grievances that need your attention.
              </p>

            </div>


            <Link
              to="/officer/grievances"
              className="
                hidden
                sm:inline-flex
                items-center
                gap-1
                text-sm
                font-medium
                text-[#587F73]
                hover:text-[#312F2C]
                transition
              "
            >

              View all

              <ArrowRight size={16} />

            </Link>

          </div>


          <Card padding={false}>

            <div className="divide-y divide-[#E7ECE9]">

              {officerGrievances
                .filter(
                  (item) => item.priority === "HIGH"
                )
                .map((grievance) => (

                  <Link
                    key={grievance.id}
                    to={`/officer/grievances/${grievance.id}`}
                    className="
                      block
                      p-5
                      hover:bg-[#F4F7F5]
                      transition
                    "
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">


                      {/* GRIEVANCE INFORMATION */}

                      <div className="min-w-0">

                        <div className="flex items-center gap-3 flex-wrap">

                          <span className="text-xs font-semibold text-[#8A9590]">
                            {grievance.id}
                          </span>

                          <PriorityBadge
                            priority={grievance.priority}
                          />

                          <StatusBadge
                            status={grievance.status}
                          />

                        </div>


                        <h3 className="mt-2 font-semibold text-[#312F2C]">
                          {grievance.title}
                        </h3>


                        <p className="mt-1 text-sm text-[#7A8580] line-clamp-1">
                          {grievance.aiSummary}
                        </p>

                      </div>


                      {/* AI CONFIDENCE + ARROW */}

                      <div className="flex items-center gap-6">

                        <div className="hidden md:block">

                          <p className="text-xs text-[#8A9590]">
                            AI Confidence
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#587F73]">

                            {Math.round(
                              grievance.confidence * 100
                            )}
                            %

                          </p>

                        </div>


                        <ArrowRight
                          size={18}
                          className="text-[#8A9590]"
                        />

                      </div>

                    </div>

                  </Link>

                ))}

            </div>

          </Card>

        </div>


        {/* =====================================================
            EMPTY PRIORITY STATE
        ===================================================== */}

        {officerGrievances.filter(
          (item) => item.priority === "HIGH"
        ).length === 0 && (

          <Card className="mt-3">

            <div className="py-10 text-center">

              <div className="
                mx-auto
                w-12
                h-12
                rounded-full
                bg-[#E4F0EB]
                text-[#587F73]
                flex
                items-center
                justify-center
              ">

                <CheckCircle2 size={21} />

              </div>

              <h3 className="mt-4 font-semibold text-[#312F2C]">
                No high-priority grievances
              </h3>

              <p className="mt-2 text-sm text-[#7A8580]">
                There are currently no high-priority cases
                requiring immediate attention.
              </p>

            </div>

          </Card>

        )}

      </div>
    </DashboardLayout>
  );
};

export default OfficerDashboard;