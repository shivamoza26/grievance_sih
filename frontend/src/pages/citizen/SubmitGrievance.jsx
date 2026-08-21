import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import { useToast } from "../../context/ToastContext";

import {
  createGrievance,
  getErrorMessage,
} from "../../services/api";


const SubmitGrievance = () => {
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [created, setCreated] = useState(null);
  const [error, setError] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError(
        "Please enter a grievance title."
      );
      return;
    }

    if (description.trim().length < 20) {
      setError(
        "Please provide at least 20 characters describing the issue."
      );
      return;
    }

    if (!state || !district) {
      setError(
        "Please select the state and district."
      );
      return;
    }


    try {
      setIsAnalyzing(true);


      /*
       * The backend receives the complete grievance
       * and performs:
       *
       * 1. Department classification
       * 2. Urgency classification
       * 3. Department assignment
       * 4. Officer assignment
       */
      const result = await createGrievance({
        description:
          `${title.trim()}: ${description.trim()}`,

        location:
          `${district}, ${state}`,
      });


      /*
       * result now comes from normalizeGrievance()
       *
       * Important fields:
       *
       * result.category
       * result.departmentConfidence
       * result.priority
       * result.priorityConfidence
       * result.department
       * result.status
       */
      setCreated(result);

      setSubmitted(true);

      showToast(
        "Grievance submitted successfully.",
        "success"
      );

    } catch (err) {
      setError(
        getErrorMessage(err)
      );

    } finally {
      setIsAnalyzing(false);
    }
  };


  /*
   * SUCCESS SCREEN
   */
  if (submitted && created) {
    return (
      <DashboardLayout
        role="citizen"
        userName={
          localStorage.getItem(
            "userName"
          ) || "Citizen"
        }
      >

        <div className="max-w-4xl mx-auto">

          {/* Success header */}
          <div className="text-center mb-8">

            <div className="mx-auto w-14 h-14 rounded-full bg-[#E4F0EB] text-[#587F73] flex items-center justify-center">
              <CheckCircle2 size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-[#312F2C]">
              Grievance Submitted
            </h1>

            <p className="mt-2 text-[#7A8580]">
              Your grievance has been received,
              classified, and routed by the backend.
            </p>

          </div>


          <Card>

            {/* Grievance ID + Status */}
            <div className="flex items-center justify-between gap-4 border-b border-[#E7ECE9] pb-5">

              <div>

                <p className="text-xs font-semibold text-[#8A9590]">
                  Grievance ID
                </p>

                <p className="mt-1 text-xl font-bold text-[#312F2C]">
                  {created.databaseId ||
                    created.id}
                </p>

              </div>


              <span className="rounded-full bg-[#E4F0EB] text-[#587F73] px-3 py-1.5 text-sm font-medium">
                {created.status}
              </span>

            </div>


            {/* AI results */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-[#E7ECE9]">

              {/* Topic */}
              <div>

                <p className="text-xs text-[#8A9590]">
                  Topic
                </p>

                <p className="mt-1 font-semibold text-[#312F2C]">
                  {created.topic || "—"}
                </p>

              </div>


              {/* Category */}
              <div>

                <p className="text-xs text-[#8A9590]">
                  Category
                </p>

                <p className="mt-1 font-semibold text-[#312F2C]">
                  {created.category || "—"}
                </p>

              </div>


              {/* Department confidence */}
              <div>

                <p className="text-xs text-[#8A9590]">
                  Department AI Confidence
                </p>

                <p className="mt-1 font-semibold text-[#587F73]">

                  {Math.round(
                    (
                      created.departmentConfidence ??
                      created.confidence ??
                      0
                    ) * 100
                  )}%

                </p>

              </div>


              {/* Priority */}
              <div>

                <p className="text-xs text-[#8A9590]">
                  Priority
                </p>

                <p className="mt-1 font-semibold text-[#312F2C]">
                  {created.priority || "MEDIUM"}
                </p>

              </div>

            </div>


            {/* AI Classification */}
            <div className="pt-6">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={17}
                  className="text-[#587F73]"
                />

                <p className="text-sm font-semibold">
                  AI Classification
                </p>

              </div>


              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">

                {/* Department */}
                <div>

                  <p className="text-xs text-[#8A9590]">
                    Recommended Department
                  </p>

                  <p className="mt-1 font-semibold text-[#312F2C]">
                    {created.department ||
                      created.category ||
                      "Not assigned"}
                  </p>

                </div>


                {/* Priority */}
                <div>

                  <p className="text-xs text-[#8A9590]">
                    Urgency / Priority
                  </p>

                  <p className="mt-1 font-semibold text-[#312F2C]">
                    {created.priority ||
                      "MEDIUM"}
                  </p>

                </div>


                {/* Priority confidence */}
                <div>

                  <p className="text-xs text-[#8A9590]">
                    Priority Confidence
                  </p>

                  <p className="mt-1 font-semibold text-[#587F73]">

                    {Math.round(
                      (
                        created.priorityConfidence ??
                        0
                      ) * 100
                    )}%

                  </p>

                </div>

              </div>

            </div>


            {/* Assignment */}
            <div className="mt-6 pt-6 border-t border-[#E7ECE9]">

              <div className="grid sm:grid-cols-2 gap-5">

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Department ID
                  </p>

                  <p className="mt-1 font-semibold text-[#312F2C]">
                    {created.department_id ||
                      "Not assigned"}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-[#8A9590]">
                    Officer ID
                  </p>

                  <p className="mt-1 font-semibold text-[#312F2C]">
                    {created.officer_id ||
                      "Not assigned"}
                  </p>

                </div>

              </div>

            </div>

          </Card>


          {/* Track grievance */}
          <div className="mt-6 flex justify-end">

            <Link
              to={`/citizen/grievances/${created.databaseId}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#587F73]"
            >

              Track this grievance

              <ArrowRight size={16} />

            </Link>

          </div>

        </div>

      </DashboardLayout>
    );
  }


  /*
   * SUBMISSION FORM
   */
  return (
    <DashboardLayout
      role="citizen"
      userName={
        localStorage.getItem(
          "userName"
        ) || "Citizen"
      }
    >

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-medium text-[#587F73]">
            Citizen Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#312F2C]">
            Submit a Grievance
          </h1>

          <p className="mt-2 text-[#626A67]">
            Describe your issue clearly.
            Our AI system will classify the
            department, determine urgency,
            and automatically route your grievance.
          </p>

        </div>


        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-[#E5C8C4] bg-[#FBF2F1] px-4 py-3 text-sm text-[#8A5A55]">
            {error}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <Card>

            <div className="space-y-5">

              {/* Title */}
              <label className="block text-sm font-medium text-[#626A67]">

                Title

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"
                  placeholder="Briefly describe the issue"
                />

              </label>


              {/* Description */}
              <label className="block text-sm font-medium text-[#626A67]">

                Description

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={7}
                  maxLength={1000}
                  className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"
                  placeholder="Describe what happened, where, and when."
                />

                <p className="mt-1 text-xs text-[#8A9590]">
                  {description.length}/1000
                </p>

              </label>


              {/* Location */}
              <div className="grid sm:grid-cols-2 gap-4">

                {/* State */}
                <label className="text-sm font-medium text-[#626A67]">

                  State

                  <input
                    value={state}
                    onChange={(e) =>
                      setState(
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"
                    placeholder="Maharashtra"
                  />

                </label>


                {/* District */}
                <label className="text-sm font-medium text-[#626A67]">

                  District / City

                  <input
                    value={district}
                    onChange={(e) =>
                      setDistrict(
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"
                    placeholder="Mumbai"
                  />

                </label>

              </div>


              {/* Security notice */}
              <div className="flex items-start gap-3 rounded-lg bg-[#F4F8F6] border border-[#E5EBE8] p-4 text-sm text-[#626A67]">

                <ShieldCheck
                  size={18}
                  className="text-[#587F73] shrink-0"
                />

                <span>
                  Your grievance is submitted
                  securely using your authenticated
                  citizen account. The backend AI
                  will classify and route it
                  automatically.
                </span>

              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#587F73] text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
              >

                {isAnalyzing
                  ? "AI is classifying..."
                  : "Submit Grievance"}

              </button>

            </div>

          </Card>

        </form>

      </div>

    </DashboardLayout>
  );
};


export default SubmitGrievance;
