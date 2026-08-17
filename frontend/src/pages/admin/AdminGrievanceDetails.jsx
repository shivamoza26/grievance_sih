import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  User,
  Building2,
  Tag,
  BrainCircuit,
  Clock3,
  CheckCircle2,
  FileText,
  UserRound,
  MessageSquare,
  Paperclip,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";

import { officerGrievances } from "../../mocks/officerGrievances";

const AdminGrievanceDetails = () => {
  const { id } = useParams();

  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [department, setDepartment] = useState(null);
  const [officer, setOfficer] = useState(null);
  const [remark, setRemark] = useState("");

  const grievance = officerGrievances.find(
    (item) => item.id === id
  );

  if (!grievance) {
    return (
      <DashboardLayout role="admin" userName="Admin">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="py-16 text-center">
              <div
                className="
                  mx-auto
                  w-12
                  h-12
                  rounded-full
                  bg-[#EEF1EF]
                  text-[#7A8580]
                  flex
                  items-center
                  justify-center
                "
              >
                <FileText size={21} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-[#312F2C]">
                Grievance not found
              </h2>

              <p className="mt-2 text-sm text-[#7A8580]">
                The requested grievance could not be found.
              </p>

              <Link
                to="/admin/grievances"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-6
                  rounded-lg
                  bg-[#587F73]
                  !text-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  hover:bg-[#4B6D63]
                  transition
                "
              >
                <ArrowLeft size={16} />
                <span className="!text-white">
                  Back to grievances
                </span>
              </Link>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const currentStatus = status || grievance.status;
  const currentPriority = priority || grievance.priority;
  const currentDepartment =
    department || grievance.department || "Water Department";

  const aiConfidence =
    grievance.confidence !== undefined
      ? Math.round(grievance.confidence * 100)
      : 92;

  const handleRemarkSubmit = (event) => {
    event.preventDefault();

    if (!remark.trim()) return;

    alert("Admin remark added successfully.");
    setRemark("");
  };

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            BACK
        ===================================================== */}

        <Link
          to="/admin/grievances"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            !text-[#626A67]
            hover:!text-[#587F73]
            transition
          "
        >
          <ArrowLeft size={17} />
          Back to grievances
        </Link>


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mt-6">

          <div
            className="
              flex
              flex-col
              xl:flex-row
              xl:items-start
              xl:justify-between
              gap-6
            "
          >

            <div className="min-w-0">

              <div className="flex items-center gap-3 flex-wrap">

                <span className="text-xs font-semibold text-[#8A9590]">
                  {grievance.id}
                </span>

                <StatusBadge status={currentStatus} />

                <PriorityBadge priority={currentPriority} />

              </div>

              <h1
                className="
                  mt-3
                  text-3xl
                  font-bold
                  tracking-tight
                  text-[#312F2C]
                "
              >
                {grievance.title}
              </h1>

              <p className="mt-2 text-[#626A67]">
                Administrative grievance management
              </p>

            </div>


            {/* AI CONFIDENCE */}

            <div
              className="
                shrink-0
                rounded-xl
                border
                border-[#C4DED4]
                bg-[#E4F0EB]
                px-5
                py-4
                min-w-[190px]
              "
            >

              <div className="flex items-center gap-2">

                <BrainCircuit
                  size={17}
                  className="text-[#587F73]"
                />

                <p className="text-xs font-medium text-[#587F73]">
                  AI Confidence
                </p>

              </div>

              <p className="mt-1 text-2xl font-bold text-[#4B6D63]">
                {aiConfidence}%
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div
          className="
            grid
            xl:grid-cols-[1.55fr_1fr]
            gap-6
            mt-8
          "
        >

          {/* ===================================================
              LEFT COLUMN
          =================================================== */}

          <div className="space-y-6">

            {/* =================================================
                GRIEVANCE INFORMATION
            ================================================= */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FileText size={19} />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-[#312F2C]">
                    Grievance Details
                  </h2>

                  <p className="text-xs text-[#8A9590]">
                    Complaint submitted by the citizen
                  </p>

                </div>

              </div>


              <div
                className="
                  mt-6
                  rounded-lg
                  border
                  border-[#E1E7E4]
                  bg-[#F4F7F5]
                  p-5
                "
              >

                <p className="text-sm leading-7 text-[#626A67]">
                  {grievance.description ||
                    grievance.aiSummary ||
                    "No grievance description available."}
                </p>

              </div>


              {/* META */}

              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-4
                  mt-5
                "
              >

                <div className="rounded-lg border border-[#E1E7E4] p-4">

                  <div className="flex items-center gap-2 text-xs text-[#8A9590]">
                    <Tag size={14} />
                    Category
                  </div>

                  <p className="mt-2 text-sm font-semibold text-[#312F2C]">
                    {grievance.category || "General"}
                  </p>

                </div>


                <div className="rounded-lg border border-[#E1E7E4] p-4">

                  <div className="flex items-center gap-2 text-xs text-[#8A9590]">
                    <MapPin size={14} />
                    Location
                  </div>

                  <p className="mt-2 text-sm font-semibold text-[#312F2C]">
                    {grievance.location || "Not provided"}
                  </p>

                </div>


                <div className="rounded-lg border border-[#E1E7E4] p-4">

                  <div className="flex items-center gap-2 text-xs text-[#8A9590]">
                    <CalendarDays size={14} />
                    Submitted
                  </div>

                  <p className="mt-2 text-sm font-semibold text-[#312F2C]">
                    {grievance.submittedAt || "Not available"}
                  </p>

                </div>


                <div className="rounded-lg border border-[#E1E7E4] p-4">

                  <div className="flex items-center gap-2 text-xs text-[#8A9590]">
                    <Clock3 size={14} />
                    Current Status
                  </div>

                  <div className="mt-2">
                    <StatusBadge status={currentStatus} />
                  </div>

                </div>

              </div>

            </Card>


            {/* =================================================
                AI ANALYSIS
            ================================================= */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <BrainCircuit size={19} />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-[#312F2C]">
                    AI Analysis
                  </h2>

                  <p className="text-xs text-[#8A9590]">
                    Automated grievance classification
                  </p>

                </div>

              </div>


              <div
                className="
                  mt-6
                  rounded-lg
                  bg-[#F4F7F5]
                  border
                  border-[#E1E7E4]
                  p-5
                "
              >

                <p className="text-sm leading-6 text-[#626A67]">
                  {grievance.aiSummary ||
                    "The AI system has analyzed this grievance and classified it based on the submitted complaint."}
                </p>

              </div>


              <div className="grid sm:grid-cols-2 gap-4 mt-5">

                <div className="rounded-lg border border-[#E1E7E4] p-4">

                  <p className="text-xs text-[#8A9590]">
                    Detected Category
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#312F2C]">
                    {grievance.category || "General"}
                  </p>

                </div>


                <div className="rounded-lg border border-[#E1E7E4] p-4">

                  <p className="text-xs text-[#8A9590]">
                    Detected Priority
                  </p>

                  <div className="mt-2">
                    <PriorityBadge
                      priority={currentPriority}
                    />
                  </div>

                </div>

              </div>

            </Card>


            {/* =================================================
                ACTIVITY TIMELINE
            ================================================= */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Clock3 size={19} />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-[#312F2C]">
                    Activity Timeline
                  </h2>

                  <p className="text-xs text-[#8A9590]">
                    Grievance processing history
                  </p>

                </div>

              </div>


              <div className="mt-7">

                <div className="relative pl-8">

                  <div
                    className="
                      absolute
                      left-[9px]
                      top-2
                      bottom-2
                      w-px
                      bg-[#D9E3DF]
                    "
                  />


                  {/* SUBMITTED */}

                  <div className="relative pb-7">

                    <div
                      className="
                        absolute
                        -left-8
                        top-0
                        w-[19px]
                        h-[19px]
                        rounded-full
                        bg-[#587F73]
                        border-4
                        border-white
                        shadow-sm
                      "
                    />

                    <p className="text-sm font-semibold text-[#312F2C]">
                      Grievance Submitted
                    </p>

                    <p className="mt-1 text-xs text-[#8A9590]">
                      {grievance.submittedAt || "Recently"}
                    </p>

                  </div>


                  {/* AI CLASSIFICATION */}

                  <div className="relative pb-7">

                    <div
                      className="
                        absolute
                        -left-8
                        top-0
                        w-[19px]
                        h-[19px]
                        rounded-full
                        bg-[#ABD1C6]
                        border-4
                        border-white
                        shadow-sm
                      "
                    />

                    <p className="text-sm font-semibold text-[#312F2C]">
                      AI Classification Completed
                    </p>

                    <p className="mt-1 text-xs text-[#8A9590]">
                      Category and priority identified
                    </p>

                  </div>


                  {/* ASSIGNMENT */}

                  <div className="relative pb-7">

                    <div
                      className="
                        absolute
                        -left-8
                        top-0
                        w-[19px]
                        h-[19px]
                        rounded-full
                        bg-[#ABD1C6]
                        border-4
                        border-white
                        shadow-sm
                      "
                    />

                    <p className="text-sm font-semibold text-[#312F2C]">
                      Assigned to Department
                    </p>

                    <p className="mt-1 text-xs text-[#8A9590]">
                      {currentDepartment}
                    </p>

                  </div>


                  {/* CURRENT */}

                  <div className="relative">

                    <div
                      className="
                        absolute
                        -left-8
                        top-0
                        w-[19px]
                        h-[19px]
                        rounded-full
                        bg-[#587F73]
                        border-4
                        border-white
                        shadow-sm
                      "
                    />

                    <p className="text-sm font-semibold text-[#312F2C]">
                      Current Status
                    </p>

                    <div className="mt-2">
                      <StatusBadge status={currentStatus} />
                    </div>

                  </div>

                </div>

              </div>

            </Card>

          </div>


          {/* ===================================================
              RIGHT COLUMN
          =================================================== */}

          <div className="space-y-6">

            {/* =================================================
                CITIZEN
            ================================================= */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <User size={19} />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-[#312F2C]">
                    Citizen Information
                  </h2>

                  <p className="text-xs text-[#8A9590]">
                    Complaint submitted by
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-4">

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Citizen Name
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <UserRound
                      size={15}
                      className="text-[#587F73]"
                    />

                    <p className="text-sm font-semibold text-[#312F2C]">
                      {grievance.citizen || "Not available"}
                    </p>

                  </div>

                </div>


                <div>

                  <p className="text-xs text-[#8A9590]">
                    Location
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <MapPin
                      size={15}
                      className="text-[#587F73]"
                    />

                    <p className="text-sm text-[#626A67]">
                      {grievance.location || "Not provided"}
                    </p>

                  </div>

                </div>

              </div>

            </Card>


            {/* =================================================
                ASSIGNMENT
            ================================================= */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Building2 size={19} />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-[#312F2C]">
                    Assignment
                  </h2>

                  <p className="text-xs text-[#8A9590]">
                    Department and officer
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-4">

                {/* DEPARTMENT */}

                <div>

                  <label className="block text-xs font-medium text-[#626A67] mb-2">
                    Department
                  </label>

                  <div className="relative">

                    <select
                      value={currentDepartment}
                      onChange={(event) =>
                        setDepartment(event.target.value)
                      }
                      className="
                        w-full
                        appearance-none
                        rounded-lg
                        border
                        border-[#C8D2CE]
                        bg-white
                        px-3
                        py-2.5
                        pr-9
                        text-sm
                        text-[#312F2C]
                        outline-none
                        focus:border-[#587F73]
                        focus:ring-2
                        focus:ring-[#ABD1C6]/50
                      "
                    >
                      <option>
                        Water Department
                      </option>

                      <option>
                        Public Works Department
                      </option>

                      <option>
                        Electricity Department
                      </option>

                      <option>
                        Sanitation Department
                      </option>

                      <option>
                        Health Department
                      </option>

                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        pointer-events-none
                        text-[#8A9590]
                      "
                    />

                  </div>

                </div>


                {/* OFFICER */}

                <div>

                  <label className="block text-xs font-medium text-[#626A67] mb-2">
                    Assigned Officer
                  </label>

                  <div className="relative">

                    <select
                      value={officer || ""}
                      onChange={(event) =>
                        setOfficer(event.target.value)
                      }
                      className="
                        w-full
                        appearance-none
                        rounded-lg
                        border
                        border-[#C8D2CE]
                        bg-white
                        px-3
                        py-2.5
                        pr-9
                        text-sm
                        text-[#312F2C]
                        outline-none
                        focus:border-[#587F73]
                        focus:ring-2
                        focus:ring-[#ABD1C6]/50
                      "
                    >

                      <option value="">
                        Select officer
                      </option>

                      <option value="Amit Patil">
                        Amit Patil
                      </option>

                      <option value="Neha Sharma">
                        Neha Sharma
                      </option>

                      <option value="Rahul Deshmukh">
                        Rahul Deshmukh
                      </option>

                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        pointer-events-none
                        text-[#8A9590]
                      "
                    />

                  </div>

                </div>

              </div>

            </Card>


            {/* =================================================
                ADMIN ACTIONS
            ================================================= */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ShieldCheck size={19} />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-[#312F2C]">
                    Admin Actions
                  </h2>

                  <p className="text-xs text-[#8A9590]">
                    Manage grievance
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-4">

                {/* STATUS */}

                <div>

                  <label className="block text-xs font-medium text-[#626A67] mb-2">
                    Change Status
                  </label>

                  <div className="relative">

                    <select
                      value={currentStatus}
                      onChange={(event) =>
                        setStatus(event.target.value)
                      }
                      className="
                        w-full
                        appearance-none
                        rounded-lg
                        border
                        border-[#C8D2CE]
                        bg-white
                        px-3
                        py-2.5
                        pr-9
                        text-sm
                        text-[#312F2C]
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

                      <option value="CLOSED">
                        Closed
                      </option>

                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        pointer-events-none
                        text-[#8A9590]
                      "
                    />

                  </div>

                </div>


                {/* PRIORITY */}

                <div>

                  <label className="block text-xs font-medium text-[#626A67] mb-2">
                    Change Priority
                  </label>

                  <div className="relative">

                    <select
                      value={currentPriority}
                      onChange={(event) =>
                        setPriority(event.target.value)
                      }
                      className="
                        w-full
                        appearance-none
                        rounded-lg
                        border
                        border-[#C8D2CE]
                        bg-white
                        px-3
                        py-2.5
                        pr-9
                        text-sm
                        text-[#312F2C]
                        outline-none
                        focus:border-[#587F73]
                        focus:ring-2
                        focus:ring-[#ABD1C6]/50
                      "
                    >

                      <option value="HIGH">
                        High
                      </option>

                      <option value="MEDIUM">
                        Medium
                      </option>

                      <option value="LOW">
                        Low
                      </option>

                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        pointer-events-none
                        text-[#8A9590]
                      "
                    />

                  </div>

                </div>


                {/* SAVE */}

                <button
                  type="button"
                  onClick={() =>
                    alert("Changes saved successfully.")
                  }
                  className="
                    w-full
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#587F73]
                    !text-white
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    hover:bg-[#4B6D63]
                    transition
                  "
                >
                  <CheckCircle2 size={16} />
                  Save Changes
                </button>

              </div>

            </Card>


            {/* =================================================
                ADMIN REMARK
            ================================================= */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <MessageSquare size={19} />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-[#312F2C]">
                    Admin Remark
                  </h2>

                  <p className="text-xs text-[#8A9590]">
                    Add an internal note
                  </p>

                </div>

              </div>


              <form
                onSubmit={handleRemarkSubmit}
                className="mt-5"
              >

                <textarea
                  value={remark}
                  onChange={(event) =>
                    setRemark(event.target.value)
                  }
                  rows={4}
                  placeholder="Write an administrative remark..."
                  className="
                    w-full
                    rounded-lg
                    border
                    border-[#C8D2CE]
                    bg-white
                    px-3
                    py-3
                    text-sm
                    text-[#312F2C]
                    placeholder:text-[#9AA39F]
                    outline-none
                    resize-none
                    focus:border-[#587F73]
                    focus:ring-2
                    focus:ring-[#ABD1C6]/50
                  "
                />

                <button
                  type="submit"
                  className="
                    w-full
                    mt-3
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-[#C8D2CE]
                    bg-white
                    !text-[#312F2C]
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    hover:bg-[#F4F7F5]
                    transition
                  "
                >
                  <MessageSquare size={16} />
                  Add Remark
                </button>

              </form>

            </Card>


            {/* =================================================
                ATTACHMENTS
            ================================================= */}

            <Card>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#E4F0EB]
                    text-[#587F73]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Paperclip size={19} />
                </div>

                <div>

                  <h2 className="text-base font-semibold text-[#312F2C]">
                    Attachments
                  </h2>

                  <p className="text-xs text-[#8A9590]">
                    Documents submitted with grievance
                  </p>

                </div>

              </div>


              <div
                className="
                  mt-5
                  rounded-lg
                  border
                  border-dashed
                  border-[#C8D2CE]
                  bg-[#F4F7F5]
                  p-5
                  text-center
                "
              >

                <Paperclip
                  size={21}
                  className="mx-auto text-[#8A9590]"
                />

                <p className="mt-2 text-sm font-medium text-[#626A67]">
                  No attachments available
                </p>

                <p className="mt-1 text-xs text-[#9AA39F]">
                  Uploaded documents will appear here.
                </p>

              </div>

            </Card>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default AdminGrievanceDetails;