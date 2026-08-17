import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Sparkles,
  Clock3,
  Building2,
  Flag,
  CalendarDays,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import GrievanceTimeline from "../../components/citizen/GrievanceTimeline";

import { mockGrievances } from "../../mocks/grievances";

const GrievanceDetails = () => {
  // =====================================================
  // GET GRIEVANCE
  // =====================================================

  const { id } = useParams();

  const grievance = mockGrievances.find(
    (item) => item.id === id
  );

  // =====================================================
  // GRIEVANCE NOT FOUND
  // =====================================================

  if (!grievance) {
    return (
      <DashboardLayout
        role="citizen"
        userName="Bhagyashri"
      >
        <div className="max-w-3xl mx-auto py-20 text-center">

          <div className="mx-auto w-14 h-14 rounded-full bg-[#EEF1EF] text-[#7A8580] flex items-center justify-center">
            <MessageSquare size={24} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#312F2C]">
            Grievance not found
          </h1>

          <p className="mt-2 text-sm text-[#7A8580] max-w-md mx-auto">
            The grievance you are looking for does not exist
            or may have been removed.
          </p>

          <Link
            to="/citizen/grievances"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              text-sm
              font-medium
              text-[#587F73]
              hover:text-[#312F2C]
              transition
            "
          >
            <ArrowLeft size={16} />
            Back to My Grievances
          </Link>

        </div>
      </DashboardLayout>
    );
  }

  // =====================================================
  // DERIVED DATA
  // =====================================================

  const confidencePercentage = Math.round(
    grievance.confidence * 100
  );

  const priority = grievance.priority || "HIGH";

  const isPending =
    grievance.status === "PENDING";

  const isInProgress =
    grievance.status === "IN_PROGRESS";

  const isResolved =
    grievance.status === "RESOLVED";

  // =====================================================
  // ACTIVITY HISTORY
  // =====================================================

  const activities = [
    {
      title: "Grievance submitted",
      description:
        "Your complaint was successfully received by the platform.",
      time: grievance.submittedAt,
      completed: true,
    },

    {
      title: "AI classification completed",
      description:
        `The grievance was classified as ${grievance.category} with ${confidencePercentage}% confidence.`,
      time: "Today",
      completed: true,
    },

    {
      title: "Department assigned",
      description:
        `${grievance.department} has been assigned to handle this grievance.`,
      time: "Today",
      completed: true,
    },

    ...(isResolved
      ? [
          {
            title: "Grievance resolved",
            description:
              "Your grievance has been successfully resolved.",
            time: "Today",
            completed: true,
          },
        ]
      : [
          {
            title: "Officer reviewing complaint",
            description:
              "The assigned officer is currently reviewing your grievance.",
            time: "In progress",
            completed: false,
          },
        ]),
  ];

  // =====================================================
  // STATUS TEXT
  // =====================================================

  const currentStatusText = isPending
    ? "Pending"
    : isResolved
    ? "Resolved"
    : "In Progress";

  return (
    <DashboardLayout
      role="citizen"
      userName="Bhagyashri"
    >
      <div className="max-w-6xl mx-auto">

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/citizen/grievances"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[#7A8580]
            hover:text-[#312F2C]
            transition
          "
        >
          <ArrowLeft size={16} />
          Back to My Grievances
        </Link>


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mt-6">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

            {/* Main information */}

            <div className="min-w-0">

              <div className="flex items-center gap-3 flex-wrap">

                <span className="text-sm font-semibold text-[#8A9590]">
                  {grievance.id}
                </span>

                <StatusBadge
                  status={grievance.status}
                />

              </div>


              <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-[#312F2C]">
                {grievance.title}
              </h1>


              <div className="mt-4 flex items-center gap-2 text-sm text-[#7A8580]">

                <MapPin
                  size={16}
                  className="text-[#587F73]"
                />

                <span>
                  {grievance.location}
                </span>

              </div>

            </div>


            {/* Submitted date */}

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-[#DDE3E0]
                bg-white
                px-4
                py-3
                shrink-0
              "
            >

              <CalendarDays
                size={18}
                className="text-[#587F73]"
              />

              <div>

                <p className="text-[11px] uppercase tracking-wide font-semibold text-[#8A9590]">
                  Submitted
                </p>

                <p className="mt-0.5 text-sm font-medium text-[#626A67]">
                  {grievance.submittedAt}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            QUICK STATUS SUMMARY
        ================================================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          {/* STATUS */}

          <Card>

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-[#E4F0EB] text-[#587F73] flex items-center justify-center">
                <Clock3 size={18} />
              </div>

              <div>

                <p className="text-xs text-[#8A9590]">
                  Current Status
                </p>

                <p className="mt-1 text-sm font-semibold text-[#312F2C]">
                  {currentStatusText}
                </p>

              </div>

            </div>

          </Card>


          {/* PRIORITY */}

          <Card>

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-[#F5EEDF] text-[#8A642F] flex items-center justify-center">
                <Flag size={18} />
              </div>

              <div>

                <p className="text-xs text-[#8A9590]">
                  Priority
                </p>

                <p className="mt-1 text-sm font-semibold text-[#312F2C]">
                  {priority}
                </p>

              </div>

            </div>

          </Card>


          {/* DEPARTMENT */}

          <Card>

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-[#EAF3F0] text-[#587F73] flex items-center justify-center">
                <Building2 size={18} />
              </div>

              <div className="min-w-0">

                <p className="text-xs text-[#8A9590]">
                  Department
                </p>

                <p className="mt-1 text-sm font-semibold text-[#312F2C] truncate">
                  {grievance.department}
                </p>

              </div>

            </div>

          </Card>


          {/* AI CONFIDENCE */}

          <Card>

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-[#DCEBE5] text-[#4B6D63] flex items-center justify-center">
                <Sparkles size={18} />
              </div>

              <div>

                <p className="text-xs text-[#8A9590]">
                  AI Confidence
                </p>

                <p className="mt-1 text-sm font-semibold text-[#587F73]">
                  {confidencePercentage}%
                </p>

              </div>

            </div>

          </Card>

        </div>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6 mt-6">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-6">

            {/* TIMELINE */}

            <Card>

              <div className="mb-7">

                <h2 className="text-lg font-semibold text-[#312F2C]">
                  Grievance Status
                </h2>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Follow the progress of your complaint from
                  submission to resolution.
                </p>

              </div>

              <GrievanceTimeline
                currentStatus={
                  grievance.status || "IN_PROGRESS"
                }
              />

            </Card>


            {/* ACTIVITY HISTORY */}

            <Card>

              <div className="flex items-center gap-3 mb-7">

                <div className="w-9 h-9 rounded-lg bg-[#EEF1EF] text-[#626A67] flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-[#312F2C]">
                    Activity History
                  </h2>

                  <p className="mt-1 text-sm text-[#7A8580]">
                    Recent updates related to your grievance.
                  </p>

                </div>

              </div>


              <div className="space-y-6">

                {activities.map((activity, index) => (

                  <div
                    key={activity.title}
                    className="flex gap-4"
                  >

                    {/* Timeline dot */}

                    <div className="flex flex-col items-center">

                      <div
                        className={`
                          w-8
                          h-8
                          rounded-full
                          flex
                          items-center
                          justify-center
                          shrink-0
                          ${
                            activity.completed
                              ? "bg-[#E4F0EB] text-[#587F73]"
                              : "bg-[#EEF1EF] text-[#7A8580]"
                          }
                        `}
                      >

                        {activity.completed ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <Clock3 size={16} />
                        )}

                      </div>


                      {index !== activities.length - 1 && (
                        <div className="w-px flex-1 bg-[#DDE3E0] mt-2 min-h-8" />
                      )}

                    </div>


                    {/* Content */}

                    <div className="pb-1">

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">

                        <h3 className="text-sm font-semibold text-[#312F2C]">
                          {activity.title}
                        </h3>

                        <span className="text-xs text-[#8A9590]">
                          {activity.time}
                        </span>

                      </div>

                      <p className="mt-1 text-sm leading-6 text-[#7A8580]">
                        {activity.description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </Card>

          </div>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="space-y-6">

            {/* AI CLASSIFICATION */}

            <Card>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center">
                  <Sparkles size={18} />
                </div>

                <div>

                  <h2 className="text-sm font-semibold text-[#312F2C]">
                    AI Classification
                  </h2>

                  <p className="text-xs text-[#7A8580] mt-0.5">
                    Automated grievance analysis
                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-5">

                {/* TOPIC */}

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Topic
                  </p>

                  <p className="mt-1 font-medium text-[#312F2C]">
                    {grievance.topic}
                  </p>

                </div>


                {/* CATEGORY */}

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Category
                  </p>

                  <p className="mt-1 font-medium text-[#312F2C]">
                    {grievance.category}
                  </p>

                </div>


                {/* CONFIDENCE */}

                <div>

                  <div className="flex items-center justify-between">

                    <p className="text-xs text-[#8A9590]">
                      Classification Confidence
                    </p>

                    <p className="text-sm font-semibold text-[#587F73]">
                      {confidencePercentage}%
                    </p>

                  </div>


                  <div className="mt-2 h-2 rounded-full bg-[#EEF1EF] overflow-hidden">

                    <div
                      className="h-full rounded-full bg-[#587F73] transition-all duration-500"
                      style={{
                        width: `${confidencePercentage}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </Card>


            {/* DEPARTMENT */}

            <Card>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-[#EAF3F0] text-[#587F73] flex items-center justify-center">
                  <Building2 size={18} />
                </div>

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Assigned Department
                  </p>

                  <p className="mt-1 text-lg font-semibold text-[#312F2C]">
                    {grievance.department}
                  </p>

                </div>

              </div>


              <p className="mt-4 text-sm leading-6 text-[#7A8580]">
                Your grievance has been routed to the
                relevant department for handling.
              </p>


              <div className="mt-5 rounded-lg bg-[#F4F7F5] border border-[#E7ECE9] p-4">

                <p className="text-xs text-[#8A9590]">
                  Current action
                </p>

                <p className="mt-1 text-sm font-medium text-[#626A67]">
                  {isResolved
                    ? "Your grievance has been resolved."
                    : isPending
                    ? "Your grievance is waiting for officer review."
                    : "Officer is reviewing your complaint."}
                </p>

              </div>

            </Card>


            {/* EXPECTED RESOLUTION */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className={`
                    w-9
                    h-9
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    ${
                      isResolved
                        ? "bg-[#DCEBE5] text-[#4B6D63]"
                        : "bg-[#F5EEDF] text-[#8A642F]"
                    }
                  `}
                >
                  {isResolved ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Clock3 size={18} />
                  )}
                </div>

                <div>

                  <p className="text-xs text-[#8A9590]">
                    {isResolved
                      ? "Resolution Status"
                      : "Expected Resolution"}
                  </p>

                  <p className="mt-1 text-lg font-semibold text-[#312F2C]">
                    {isResolved
                      ? "Resolved"
                      : "3–5 working days"}
                  </p>

                </div>

              </div>


              <p className="mt-3 text-sm leading-6 text-[#7A8580]">
                {isResolved
                  ? "This grievance has been successfully resolved."
                  : "The estimated resolution time may change depending on the complexity of the grievance."}
              </p>

            </Card>

          </div>

        </div>


        {/* =================================================
            ORIGINAL COMPLAINT
        ================================================= */}

        <Card className="mt-6">

          <div className="flex items-center justify-between gap-4">

            <div>

              <h2 className="text-lg font-semibold text-[#312F2C]">
                Your Complaint
              </h2>

              <p className="mt-1 text-sm text-[#7A8580]">
                Original description submitted by you.
              </p>

            </div>


            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#8A9590]">

              <CheckCircle2 size={14} />

              Submitted

            </span>

          </div>


          <div className="mt-5 rounded-xl bg-[#F4F7F5] border border-[#E7ECE9] p-5">

            <p className="text-sm leading-7 text-[#626A67]">
              {grievance.description}
            </p>

          </div>

        </Card>


        {/* =================================================
            FOOTER NOTE
        ================================================= */}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#8A9590] pb-6">

          <CheckCircle2 size={14} />

          Your grievance information is securely maintained.

        </div>

      </div>
    </DashboardLayout>
  );
};

export default GrievanceDetails;