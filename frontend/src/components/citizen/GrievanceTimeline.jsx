import {
  Check,
  Clock3,
  Circle,
} from "lucide-react";

const GrievanceTimeline = ({ currentStatus }) => {
  const steps = [
    {
      key: "SUBMITTED",
      title: "Grievance Submitted",
      description:
        "Your complaint was successfully registered.",
    },
    {
      key: "ANALYZED",
      title: "AI Analysis Complete",
      description:
        "The grievance was categorized and assessed.",
    },
    {
      key: "ASSIGNED",
      title: "Department Assigned",
      description:
        "Your complaint was routed to the relevant department.",
    },
    {
      key: "IN_PROGRESS",
      title: "Officer Reviewing",
      description:
        "An officer is currently handling your grievance.",
    },
    {
      key: "RESOLVED",
      title: "Resolution",
      description:
        "The grievance has been successfully resolved.",
    },
  ];

  const statusOrder = [
    "SUBMITTED",
    "ANALYZED",
    "ASSIGNED",
    "IN_PROGRESS",
    "RESOLVED",
  ];

  /*
   * Safety fallback.
   *
   * If backend later sends an unknown status,
   * we don't want the entire timeline to break.
   */
  const normalizedStatus =
    statusOrder.includes(currentStatus)
      ? currentStatus
      : "SUBMITTED";

  const currentIndex =
    statusOrder.indexOf(normalizedStatus);

  /*
   * Special handling for resolved grievances.
   */
  const isResolved =
    normalizedStatus === "RESOLVED";

  return (
    <div className="space-y-0">

      {steps.map((step, index) => {

        const isComplete =
          index < currentIndex;

        const isCurrent =
          index === currentIndex;

        const isUpcoming =
          index > currentIndex;

        return (
          <div
            key={step.key}
            className="flex gap-4"
          >

            {/* ==========================================
                TIMELINE INDICATOR
            ========================================== */}

            <div className="flex flex-col items-center">

              {/* Circle */}

              <div
                className={`
                  relative
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  border-2
                  transition-all
                  duration-300

                  ${
                    isComplete
                      ? "bg-blue-700 border-blue-700 text-white"
                      : isCurrent && isResolved
                      ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                      : isCurrent
                      ? "bg-blue-50 border-blue-600 text-blue-700"
                      : "bg-white border-slate-200 text-slate-300"
                  }
                `}
              >

                {isComplete ? (
                  <Check size={17} strokeWidth={2.5} />
                ) : isCurrent && isResolved ? (
                  <Check size={17} strokeWidth={2.5} />
                ) : isCurrent ? (
                  <Clock3 size={17} />
                ) : (
                  <Circle
                    size={9}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                )}

              </div>

              {/* Connector */}

              {index !== steps.length - 1 && (
                <div
                  className={`
                    w-px
                    h-14
                    transition-colors
                    duration-300

                    ${
                      index < currentIndex
                        ? "bg-blue-600"
                        : "bg-slate-200"
                    }
                  `}
                />
              )}

            </div>

            {/* ==========================================
                STEP CONTENT
            ========================================== */}

            <div className="pb-8 flex-1">

              <div className="flex items-center gap-2 flex-wrap">

                <h3
                  className={`
                    text-sm
                    font-semibold

                    ${
                      isComplete
                        ? "text-slate-900"
                        : isCurrent && isResolved
                        ? "text-emerald-700"
                        : isCurrent
                        ? "text-blue-700"
                        : "text-slate-400"
                    }
                  `}
                >
                  {step.title}
                </h3>

                {/* CURRENT LABEL */}

                {isCurrent && !isResolved && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                    CURRENT
                  </span>
                )}

                {/* RESOLVED LABEL */}

                {isCurrent && isResolved && (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    COMPLETED
                  </span>
                )}

              </div>

              <p
                className={`
                  mt-1
                  text-sm
                  leading-6

                  ${
                    isComplete || isCurrent
                      ? "text-slate-500"
                      : "text-slate-400"
                  }
                `}
              >
                {step.description}
              </p>

              {/* CURRENT STATUS MESSAGE */}

              {isCurrent && !isResolved && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">

                  <Clock3 size={13} />

                  Processing is currently underway.

                </div>
              )}

              {/* RESOLVED MESSAGE */}

              {isCurrent && isResolved && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">

                  <Check size={13} />

                  This grievance has been resolved.

                </div>
              )}

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default GrievanceTimeline;