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
    (item) => item.id === id
  );
  if (!grievance) {
  return (
    <DashboardLayout
      role="officer"
      userName="Officer"
    >
      <div className="max-w-3xl mx-auto text-center py-20">

        <h1 className="text-2xl font-bold text-slate-900">
          Grievance not found
        </h1>

        <p className="mt-2 text-slate-500">
          The grievance you're looking for does not exist.
        </p>

        <Link
          to="/officer/grievances"
          className="inline-flex mt-6 items-center justify-center rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition"
        >
          Back to Assigned Grievances
        </Link>

      </div>
    </DashboardLayout>
  );
}

  const [status, setStatus] = useState(
    grievance.status
  );

  const [reply, setReply] = useState("");

  const [updated, setUpdated] = useState(false);

  const handleUpdate = () => {
    setUpdated(true);

    setTimeout(() => {
      setUpdated(false);
    }, 2500);
  };

  const handleReply = (event) => {
    event.preventDefault();

    if (!reply.trim()) {
      return;
    }

    setReply("");
  };

  return (
    <DashboardLayout
      role="officer"
      userName="Officer"
    >
      <div className="max-w-7xl mx-auto">

        {/* Back */}
        <Link
          to="/officer/grievances"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft size={16} />
          Back to Assigned Grievances
        </Link>

        {/* Header */}
        <div className="mt-6">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3 flex-wrap">

                <span className="text-sm font-semibold text-slate-400">
                  {grievance.id}
                </span>

                <PriorityBadge
                  priority={grievance.priority}
                />

                <StatusBadge
                  status={status}
                />

              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {grievance.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-slate-500">

                <span className="inline-flex items-center gap-2">
                  <User size={16} />
                  {grievance.citizen}
                </span>

                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} />
                  {grievance.location}
                </span>

                <span>
                  Submitted {grievance.submittedAt}
                </span>

              </div>

            </div>

            {/* Confidence */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-100 bg-emerald-50">

              <div className="w-9 h-9 rounded-lg bg-white text-emerald-600 flex items-center justify-center">
                <Sparkles size={18} />
              </div>

              <div>
                <p className="text-xs text-emerald-700">
                  AI Confidence
                </p>

                <p className="text-lg font-bold text-emerald-700">
                  {Math.round(
                    grievance.confidence * 100
                  )}
                  %
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Main grid */}
        <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6 mt-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Citizen complaint */}
            <Card>

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Citizen Complaint
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Original grievance submitted by the citizen.
                  </p>
                </div>

              </div>

              <div className="mt-5 p-4 rounded-lg bg-slate-50 border border-slate-100">

                <p className="text-sm leading-7 text-slate-700">
                  {grievance.description}
                </p>

              </div>

            </Card>

            {/* AI Summary */}
            <Card>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    AI Summary
                  </h2>

                  <p className="text-sm text-slate-500">
                    A concise summary generated from the grievance.
                  </p>
                </div>

              </div>

              <div className="mt-5">

                <p className="text-sm leading-7 text-slate-600">
                  {grievance.aiSummary}
                </p>

              </div>

            </Card>

            {/* Recommended action */}
            <Card>

              <h2 className="text-lg font-semibold text-slate-900">
                Recommended Action
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Suggested next step based on the grievance classification.
              </p>

              <div className="mt-5 p-4 rounded-lg border border-blue-100 bg-blue-50">

                <p className="text-sm leading-6 text-blue-900">
                  Verify the reported issue with the concerned
                  department and initiate the appropriate resolution
                  process.
                </p>

              </div>

            </Card>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* AI Classification */}
            <Card>

              <h2 className="text-lg font-semibold text-slate-900">
                AI Classification
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Automated analysis of this grievance.
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-xs text-slate-400">
                    Topic
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {grievance.topic}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {grievance.category}
                  </p>
                </div>

                <div>

                  <div className="flex items-center justify-between">

                    <p className="text-xs text-slate-400">
                      Classification Confidence
                    </p>

                    <p className="text-sm font-semibold text-emerald-600">
                      {Math.round(
                        grievance.confidence * 100
                      )}
                      %
                    </p>

                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${
                          grievance.confidence * 100
                        }%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </Card>

            {/* Department */}
            <Card>

              <p className="text-xs text-slate-400">
                Assigned Department
              </p>

              <p className="mt-1 text-xl font-semibold text-slate-900">
                {grievance.department}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                This grievance was routed based on the AI classification.
              </p>

            </Card>

            {/* Status update */}
            <Card>

              <h2 className="text-lg font-semibold text-slate-900">
                Update Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the current state of this grievance.
              </p>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="mt-5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                onClick={handleUpdate}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition"
              >
                <CheckCircle2 size={17} />
                Save Status
              </button>

              {updated && (
                <p className="mt-3 text-sm text-emerald-600 text-center">
                  Status updated successfully.
                </p>
              )}

            </Card>

          </div>

        </div>

        {/* Reply */}
        <Card className="mt-6">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Send size={17} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Reply to Citizen
              </h2>

              <p className="text-sm text-slate-500">
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
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-3 flex justify-end">

              <button
                type="submit"
                disabled={!reply.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                Send Reply
              </button>

            </div>

          </form>

        </Card>

      </div>
    </DashboardLayout>
  );
};

export default OfficerGrievanceDetails;