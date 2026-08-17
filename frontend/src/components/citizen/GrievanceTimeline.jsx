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
                      ? "bg-[#587F73] border-[#587F73] text-white"
                      : isCurrent && isResolved
                      ? "bg-[#E4F0EB] border-[#587F73] text-[#587F73]"
                      : isCurrent
                      ? "bg-[#F0F6F3] border-[#587F73] text-[#587F73]"
                      : "bg-white border-[#DDE3E0] text-[#B3BCB8]"
                  }
                `}
              >

                {isComplete ? (
                  <Check
                    size={17}
                    strokeWidth={2.5}
                  />
                ) : isCurrent && isResolved ? (
                  <Check
                    size={17}
                    strokeWidth={2.5}
                  />
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
                        ? "bg-[#587F73]"
                        : "bg-[#DDE3E0]"
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
                        ? "text-[#312F2C]"
                        : isCurrent && isResolved
                        ? "text-[#4B6D63]"
                        : isCurrent
                        ? "text-[#587F73]"
                        : "text-[#9AA39F]"
                    }
                  `}
                >
                  {step.title}
                </h3>


                {/* CURRENT LABEL */}

                {isCurrent && !isResolved && (
                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      bg-[#E4F0EB]
                      px-2
                      py-0.5
                      text-[10px]
                      font-semibold
                      text-[#587F73]
                    "
                  >
                    CURRENT
                  </span>
                )}


                {/* RESOLVED LABEL */}

                {isCurrent && isResolved && (
                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      bg-[#DCEBE5]
                      px-2
                      py-0.5
                      text-[10px]
                      font-semibold
                      text-[#4B6D63]
                    "
                  >
                    COMPLETED
                  </span>
                )}

              </div>


              {/* DESCRIPTION */}

              <p
                className={`
                  mt-1
                  text-sm
                  leading-6

                  ${
                    isComplete || isCurrent
                      ? "text-[#7A8580]"
                      : "text-[#A0AAA5]"
                  }
                `}
              >
                {step.description}
              </p>


              {/* CURRENT STATUS MESSAGE */}

              {isCurrent && !isResolved && (
                <div
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-[#F0F6F3]
                    border
                    border-[#D7E8E1]
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-[#587F73]
                  "
                >

                  <Clock3 size={13} />

                  Processing is currently underway.

                </div>
              )}


              {/* RESOLVED MESSAGE */}

              {isCurrent && isResolved && (
                <div
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-[#E4F0EB]
                    border
                    border-[#C4DED4]
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-[#4B6D63]
                  "
                >

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