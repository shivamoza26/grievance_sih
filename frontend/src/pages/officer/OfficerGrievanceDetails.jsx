import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Sparkles,
  MapPin,
  User,
  CheckCircle2,
  Send,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";

import { officerGrievances } from "../../mocks/officerGrievances";

const OfficerGrievanceDetails = () => {
  const { id } = useParams();

  const grievance = officerGrievances.find(
    (item) =>
      String(item.id).trim() === String(id).trim()
  );

  // =====================================================
  // STATE
  // =====================================================

  const [status, setStatus] = useState(
    grievance?.status || "PENDING"
  );

  const [reply, setReply] = useState("");

  const [updated, setUpdated] = useState(false);

  const [replySent, setReplySent] = useState(false);

  // =====================================================
  // STATUS UPDATE
  // =====================================================

  const handleUpdate = () => {
    setUpdated(true);

    setTimeout(() => {
      setUpdated(false);
    }, 2500);
  };

  // =====================================================
  // REPLY
  // =====================================================

  const handleReply = (event) => {
    event.preventDefault();

    if (!reply.trim()) {
      return;
    }

    setReply("");

    setReplySent(true);

    setTimeout(() => {
      setReplySent(false);
    }, 2500);
  };

  // =====================================================
  // GRIEVANCE NOT FOUND
  // =====================================================

  if (!grievance) {
    return (
      <DashboardLayout
        role="officer"
        userName="Officer"
      >
        <div className="max-w-3xl mx-auto text-center py-20">

          <div
            className="
              mx-auto
              w-14
              h-14
              rounded-full
              bg-[#EEF1EF]
              text-[#7A8580]
              flex
              items-center
              justify-center
            "
          >
            <CheckCircle2 size={24} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#312F2C]">
            Grievance not found
          </h1>

          <p className="mt-2 text-[#7A8580]">
            The grievance you're looking for does not exist.
          </p>

          <Link
            to="/officer/grievances"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              mt-6
              rounded-lg
              bg-[#312F2C]
              px-5
              py-3
              text-sm
              font-medium
              !text-white
              hover:bg-[#211F1D]
              transition
            "
          >
            <ArrowLeft size={16} />

            <span className="!text-white">
              Back to Assigned Grievances
            </span>
          </Link>

        </div>
      </DashboardLayout>
    );
  }

  // =====================================================
  // DERIVED DATA
  // =====================================================

  const confidence = Math.round(
    grievance.confidence * 100
  );

  const isResolved = status === "RESOLVED";

  const isRejected = status === "REJECTED";

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <DashboardLayout
      role="officer"
      userName="Officer"
    >
      <div className="max-w-7xl mx-auto">

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/officer/grievances"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#312F2C]
            px-5
            py-3
            text-sm
            font-medium
            !text-white
            hover:bg-[#211F1D]
            transition
          "
        >
          <ArrowLeft size={16} />

          <span className="!text-white">
            Back to Assigned Grievances
          </span>
        </Link>


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mt-6">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

            <div className="min-w-0">

              <div className="flex items-center gap-3 flex-wrap">

                <span className="text-sm font-semibold text-[#8A9590]">
                  {grievance.id}
                </span>

                <PriorityBadge
                  priority={grievance.priority}
                />

                <StatusBadge
                  status={status}
                />

              </div>


              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#312F2C]">
                {grievance.title}
              </h1>


              <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-[#7A8580]">

                <span className="inline-flex items-center gap-2">

                  <User
                    size={16}
                    className="text-[#587F73]"
                  />

                  {grievance.citizen}

                </span>


                <span className="inline-flex items-center gap-2">

                  <MapPin
                    size={16}
                    className="text-[#587F73]"
                  />

                  {grievance.location}

                </span>


                <span>
                  Submitted {grievance.submittedAt}
                </span>

              </div>

            </div>


            {/* AI CONFIDENCE */}

            <div
              className="
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                border
                border-[#C4DED4]
                bg-[#F0F6F3]
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-white
                  text-[#587F73]
                  flex
                  items-center
                  justify-center
                "
              >
                <Sparkles size={18} />
              </div>

              <div>

                <p className="text-xs text-[#587F73]">
                  AI Confidence
                </p>

                <p className="text-lg font-bold text-[#4B6D63]">
                  {confidence}%
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6 mt-8">


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-6">

            {/* CITIZEN COMPLAINT */}

            <Card>

              <div>

                <h2 className="text-lg font-semibold text-[#312F2C]">
                  Citizen Complaint
                </h2>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Original grievance submitted by the citizen.
                </p>

              </div>


              <div
                className="
                  mt-5
                  p-4
                  rounded-lg
                  bg-[#F4F7F5]
                  border
                  border-[#E7ECE9]
                "
              >

                <p className="text-sm leading-7 text-[#626A67]">
                  {grievance.description}
                </p>

              </div>

            </Card>


            {/* AI SUMMARY */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-9
                    h-9
                    rounded-lg
                    bg-[#ABD1C6]
                    text-[#312F2C]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Sparkles size={18} />
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-[#312F2C]">
                    AI Summary
                  </h2>

                  <p className="text-sm text-[#7A8580]">
                    A concise summary generated from the grievance.
                  </p>

                </div>

              </div>


              <div className="mt-5">

                <p className="text-sm leading-7 text-[#626A67]">
                  {grievance.aiSummary}
                </p>

              </div>

            </Card>


            {/* RECOMMENDED ACTION */}

            <Card>

              <h2 className="text-lg font-semibold text-[#312F2C]">
                Recommended Action
              </h2>

              <p className="mt-1 text-sm text-[#7A8580]">
                Suggested next step based on the grievance
                classification.
              </p>


              <div
                className="
                  mt-5
                  p-4
                  rounded-lg
                  border
                  border-[#C4DED4]
                  bg-[#F0F6F3]
                "
              >

                <p className="text-sm leading-6 text-[#4B6D63]">
                  {isResolved
                    ? "The grievance has been resolved successfully."
                    : isRejected
                    ? "Review the grievance and provide an appropriate reason for rejection."
                    : "Verify the reported issue with the concerned department and initiate the appropriate resolution process."}
                </p>

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

                <div
                  className="
                    w-9
                    h-9
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Sparkles size={18} />
                </div>


                <div>

                  <h2 className="text-lg font-semibold text-[#312F2C]">
                    AI Classification
                  </h2>

                  <p className="mt-1 text-sm text-[#7A8580]">
                    Automated analysis of this grievance.
                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-5">

                {/* TOPIC */}

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Topic
                  </p>

                  <p className="mt-1 font-semibold text-[#312F2C]">
                    {grievance.topic}
                  </p>

                </div>


                {/* CATEGORY */}

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-[#312F2C]">
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
                      {confidence}%
                    </p>

                  </div>


                  <div className="mt-2 h-2 rounded-full bg-[#EEF1EF] overflow-hidden">

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-[#587F73]
                        transition-all
                        duration-500
                      "
                      style={{
                        width: `${confidence}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </Card>


            {/* DEPARTMENT */}

            <Card>

              <p className="text-xs text-[#8A9590]">
                Assigned Department
              </p>

              <p className="mt-1 text-xl font-semibold text-[#312F2C]">
                {grievance.department}
              </p>

              <p className="mt-2 text-sm text-[#7A8580]">
                This grievance was routed based on the AI
                classification.
              </p>

            </Card>


            {/* STATUS UPDATE */}

            <Card>

              <h2 className="text-lg font-semibold text-[#312F2C]">
                Update Status
              </h2>

              <p className="mt-1 text-sm text-[#7A8580]">
                Update the current state of this grievance.
              </p>


              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="
                  mt-5
                  w-full
                  rounded-lg
                  border
                  border-[#C8D2CE]
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-[#626A67]
                  outline-none
                  focus:border-[#587F73]
                  focus:ring-2
                  focus:ring-[#ABD1C6]/50
                "
              >

                <option value="PENDING">
                  Pending
                </option>

                <option value="IN_PROGRESS">
                  In Progress
                </option>

                <option value="RESOLVED">
                  Resolved
                </option>

                <option value="REJECTED">
                  Rejected
                </option>

              </select>


              <button
                type="button"
                onClick={handleUpdate}
                className="
                  mt-3
                  w-full
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#587F73]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  !text-white
                  hover:bg-[#4B6D63]
                  transition
                "
              >

                <CheckCircle2
                  size={17}
                  className="!text-white"
                />

                <span className="!text-white">
                  Save Status
                </span>

              </button>


              {updated && (

                <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#E4F0EB] border border-[#C4DED4] px-3 py-2.5 text-sm font-medium text-[#4B6D63]">

                  <CheckCircle2 size={15} />

                  Status updated successfully.

                </div>

              )}

            </Card>

          </div>

        </div>


        {/* =================================================
            REPLY TO CITIZEN
        ================================================= */}

        <Card className="mt-6">

          <div className="flex items-center gap-3">

            <div
              className="
                w-9
                h-9
                rounded-lg
                bg-[#EEF1EF]
                text-[#626A67]
                flex
                items-center
                justify-center
              "
            >
              <Send size={17} />
            </div>


            <div>

              <h2 className="text-lg font-semibold text-[#312F2C]">
                Reply to Citizen
              </h2>

              <p className="text-sm text-[#7A8580]">
                Send an update or request additional information.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleReply}
            className="mt-5"
          >

            <textarea
              value={reply}
              onChange={(event) =>
                setReply(event.target.value)
              }
              rows={5}
              placeholder="Write a clear response to the citizen..."
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-[#C8D2CE]
                bg-white
                px-4
                py-3
                text-sm
                text-[#312F2C]
                placeholder:text-[#9AA39F]
                outline-none
                transition
                focus:border-[#587F73]
                focus:ring-2
                focus:ring-[#ABD1C6]/50
              "
            />


            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              {replySent ? (
                <div className="flex items-center gap-2 text-sm font-medium text-[#4B6D63]">

                  <CheckCircle2 size={16} />

                  Reply sent successfully.

                </div>
              ) : (
                <div />
              )}


              <button
                type="submit"
                disabled={!reply.trim()}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#587F73]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  !text-white
                  hover:bg-[#4B6D63]
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                <Send
                  size={16}
                  className="!text-white"
                />

                <span className="!text-white">
                  Send Reply
                </span>

              </button>

            </div>

          </form>

        </Card>


        {/* =================================================
            FOOTER NOTE
        ================================================= */}

        <div className="mt-6 text-center text-xs text-[#8A9590] pb-6">
          Changes made to grievance status are recorded for
          administrative review.
        </div>

      </div>
    </DashboardLayout>
  );
};

export default OfficerGrievanceDetails;