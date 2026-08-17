import { useState } from "react";
import { Link } from "react-router-dom";

import {
  MapPin,
  Info,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import FileUpload from "../../components/common/FileUpload";

import { useToast } from "../../context/ToastContext";
import { classifyGrievance } from "../../services/mockAI";

const SubmitGrievance = () => {
  const { showToast } = useToast();

  // --------------------------------------------------
  // FORM STATE
  // --------------------------------------------------

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  const [file, setFile] = useState(null);

  // --------------------------------------------------
  // UI STATE
  // --------------------------------------------------

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPreviewingAI, setIsPreviewingAI] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const MAX_DESCRIPTION_LENGTH = 1000;

  // --------------------------------------------------
  // AI CLASSIFICATION
  // --------------------------------------------------

  const handleAIClassification = (text) => {
    setDescription(text);

    if (text.trim().length < 20) {
      setAiResult(null);
      setIsPreviewingAI(false);
      return;
    }

    setIsPreviewingAI(true);

    setTimeout(() => {
      const result = classifyGrievance(text);

      setAiResult(result);
      setIsPreviewingAI(false);
    }, 500);
  };

  // --------------------------------------------------
  // FORM VALIDATION
  // --------------------------------------------------

  const validateForm = () => {
    if (!title.trim()) {
      showToast(
        "Please enter a grievance title.",
        "warning"
      );

      return false;
    }

    if (description.trim().length < 20) {
      showToast(
        "Please provide at least 20 characters describing the issue.",
        "warning"
      );

      return false;
    }

    if (!state) {
      showToast(
        "Please select the state.",
        "warning"
      );

      return false;
    }

    if (!district) {
      showToast(
        "Please select the district.",
        "warning"
      );

      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // SUBMIT GRIEVANCE
  // --------------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsAnalyzing(true);

    /*
      Mock backend / AI processing.

      Later this will be replaced with:

      POST /api/grievances

      using Axios + FormData.
    */

    setTimeout(() => {
      const finalAIResult =
        aiResult ||
        classifyGrievance(description);

      setAiResult(finalAIResult);

      setIsAnalyzing(false);
      setSubmitted(true);

      showToast(
        "Grievance submitted successfully.",
        "success"
      );
    }, 2500);
  };

  // --------------------------------------------------
  // SUCCESS SCREEN
  // --------------------------------------------------

  if (submitted && aiResult) {
    return (
      <DashboardLayout
        role="citizen"
        userName="Bhagyashri"
      >
        <div className="max-w-4xl mx-auto">

          {/* SUCCESS HEADER */}

          <div className="text-center mb-8">

            <div className="mx-auto w-14 h-14 rounded-full bg-[#E4F0EB] text-[#587F73] flex items-center justify-center">
              <CheckCircle2 size={30} />
            </div>

            <h1 className="mt-4 text-3xl font-bold text-[#312F2C]">
              Grievance submitted successfully
            </h1>

            <p className="mt-2 text-[#626A67]">
              Your complaint has been analyzed and routed
              to the appropriate department.
            </p>

          </div>


          {/* GRIEVANCE SUMMARY */}

          <Card>

            <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#E7ECE9]">

              <div>

                <p className="text-xs font-semibold text-[#8A9590] uppercase tracking-wide">
                  Grievance ID
                </p>

                <p className="mt-1 text-xl font-bold text-[#312F2C]">
                  GRV-1049
                </p>

              </div>

              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E4F0EB] text-[#587F73] text-sm font-medium">

                <span className="w-2 h-2 rounded-full bg-[#587F73]" />

                Assigned

              </span>

            </div>


            {/* BASIC INFORMATION */}

            <div className="grid sm:grid-cols-3 gap-6 py-6 border-b border-[#E7ECE9]">

              <div>

                <p className="text-xs text-[#8A9590]">
                  Topic
                </p>

                <p className="mt-1 font-semibold text-[#312F2C]">
                  {aiResult.topic}
                </p>

              </div>


              <div>

                <p className="text-xs text-[#8A9590]">
                  Category
                </p>

                <p className="mt-1 font-semibold text-[#312F2C]">
                  {aiResult.category}
                </p>

              </div>


              <div>

                <p className="text-xs text-[#8A9590]">
                  AI Confidence
                </p>

                <p className="mt-1 font-semibold text-[#587F73]">
                  {Math.round(
                    aiResult.confidence * 100
                  )}
                  %
                </p>

              </div>

            </div>


            {/* AI CLASSIFICATION */}

            <div className="pt-6">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={17}
                  className="text-[#587F73]"
                />

                <p className="text-sm font-semibold text-[#312F2C]">
                  AI Classification
                </p>

              </div>


              <div className="grid sm:grid-cols-2 gap-5 mt-5">

                {/* DEPARTMENT */}

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Recommended Department
                  </p>

                  <p className="mt-1 font-semibold text-[#312F2C]">
                    {aiResult.department}
                  </p>

                </div>


                {/* PRIORITY */}

                <div>

                  <p className="text-xs text-[#8A9590]">
                    Priority
                  </p>

                  <p className="mt-1 font-semibold text-[#312F2C]">
                    {aiResult.priority}
                  </p>

                </div>

              </div>

            </div>

          </Card>


          {/* TRACK GRIEVANCE */}

          <div className="mt-6 flex justify-end">

            <Link
              to="/citizen/grievances/GRV-1049"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#587F73] hover:text-[#312F2C] transition"
            >
              Track this grievance

              <ArrowRight size={16} />

            </Link>

          </div>

        </div>
      </DashboardLayout>
    );
  }


  // --------------------------------------------------
  // SUBMISSION FORM
  // --------------------------------------------------

  return (
    <DashboardLayout
      role="citizen"
      userName="Bhagyashri"
    >
      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADER */}

        <div className="mb-8">

          <p className="text-sm font-medium text-[#587F73]">
            Citizen Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#312F2C]">
            Submit a Grievance
          </h1>

          <p className="mt-2 text-[#626A67] max-w-2xl">
            Describe your issue clearly. Our system will
            analyze your grievance and route it to the
            appropriate department.
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="grid lg:grid-cols-[1fr_300px] gap-6">

            {/* =========================================
                MAIN FORM
            ========================================= */}

            <Card>

              {/* -----------------------------------------
                  TITLE
              ----------------------------------------- */}

              <div>

                <label className="block text-sm font-semibold text-[#312F2C]">
                  Complaint title
                </label>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Give your grievance a short, clear title.
                </p>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Example: Scholarship payment not received"
                  maxLength={120}
                  className="
                    mt-4
                    w-full
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

                <div className="mt-2 text-right text-xs text-[#8A9590]">
                  {title.length}/120
                </div>

              </div>


              {/* -----------------------------------------
                  DESCRIPTION
              ----------------------------------------- */}

              <div className="mt-6">

                <label className="block text-sm font-semibold text-[#312F2C]">
                  Describe your issue
                </label>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Include what happened, when it happened
                  and where.
                </p>

                <textarea
                  value={description}
                  onChange={(event) =>
                    handleAIClassification(
                      event.target.value.slice(
                        0,
                        MAX_DESCRIPTION_LENGTH
                      )
                    )
                  }
                  placeholder="Example: My scholarship payment has not been received even though my application was approved..."
                  rows={8}
                  className="
                    mt-4
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

                <div className="mt-2 flex justify-between text-xs text-[#8A9590]">

                  <span>
                    Be as specific as possible.
                  </span>

                  <span>
                    {description.length}/1000
                  </span>

                </div>

              </div>


              {/* -----------------------------------------
                  LOCATION
              ----------------------------------------- */}

              <div className="mt-8">

                <div className="flex items-center gap-2">

                  <MapPin
                    size={18}
                    className="text-[#587F73]"
                  />

                  <h2 className="text-sm font-semibold text-[#312F2C]">
                    Location
                  </h2>

                </div>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Where did this issue occur?
                </p>


                <div className="grid sm:grid-cols-2 gap-4 mt-4">

                  {/* STATE */}

                  <div>

                    <label className="block text-xs font-medium text-[#626A67] mb-1.5">
                      State
                    </label>

                    <select
                      value={state}
                      onChange={(event) =>
                        setState(event.target.value)
                      }
                      className="
                        w-full
                        rounded-lg
                        border
                        border-[#C8D2CE]
                        bg-white
                        px-3
                        py-2.5
                        text-sm
                        text-[#312F2C]
                        outline-none
                        focus:border-[#587F73]
                        focus:ring-2
                        focus:ring-[#ABD1C6]/50
                      "
                    >

                      <option value="">
                        Select state
                      </option>

                      <option value="Maharashtra">
                        Maharashtra
                      </option>

                      <option value="Gujarat">
                        Gujarat
                      </option>

                      <option value="Karnataka">
                        Karnataka
                      </option>

                    </select>

                  </div>


                  {/* DISTRICT */}

                  <div>

                    <label className="block text-xs font-medium text-[#626A67] mb-1.5">
                      District
                    </label>

                    <select
                      value={district}
                      onChange={(event) =>
                        setDistrict(event.target.value)
                      }
                      className="
                        w-full
                        rounded-lg
                        border
                        border-[#C8D2CE]
                        bg-white
                        px-3
                        py-2.5
                        text-sm
                        text-[#312F2C]
                        outline-none
                        focus:border-[#587F73]
                        focus:ring-2
                        focus:ring-[#ABD1C6]/50
                      "
                    >

                      <option value="">
                        Select district
                      </option>

                      <option value="Mumbai">
                        Mumbai
                      </option>

                      <option value="Thane">
                        Thane
                      </option>

                      <option value="Pune">
                        Pune
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* -----------------------------------------
                  CATEGORY
              ----------------------------------------- */}

              <div className="mt-8">

                <label className="block text-sm font-semibold text-[#312F2C]">
                  Category
                </label>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Select a category or let the AI system
                  recommend one.
                </p>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="
                    mt-4
                    w-full
                    rounded-lg
                    border
                    border-[#C8D2CE]
                    bg-white
                    px-3
                    py-2.5
                    text-sm
                    text-[#312F2C]
                    outline-none
                    focus:border-[#587F73]
                    focus:ring-2
                    focus:ring-[#ABD1C6]/50
                  "
                >

                  <option value="">
                    AI will recommend a category
                  </option>

                  <option value="Education">
                    Education
                  </option>

                  <option value="Roads">
                    Roads
                  </option>

                  <option value="Water Supply">
                    Water Supply
                  </option>

                  <option value="Electricity">
                    Electricity
                  </option>

                  <option value="Healthcare">
                    Healthcare
                  </option>

                  <option value="Sanitation">
                    Sanitation
                  </option>

                </select>

              </div>


              {/* -----------------------------------------
                  EVIDENCE UPLOAD
              ----------------------------------------- */}

              <div className="mt-8">

                <label className="block text-sm font-semibold text-[#312F2C]">
                  Supporting evidence
                </label>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Upload an image or PDF if it helps explain
                  the issue.
                </p>

                <FileUpload
                  file={file}
                  onFileChange={setFile}
                  onRemove={() => setFile(null)}
                />

              </div>


              {/* -----------------------------------------
                  AI PREVIEW
              ----------------------------------------- */}

              {description.trim().length >= 20 && (

                <div className="mt-8 rounded-xl border border-[#C4DED4] bg-[#F0F6F3] p-5">

                  <div className="flex items-start gap-3">

                    {/* AI ICON */}

                    <div className="w-9 h-9 rounded-lg bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center shrink-0">

                      <Sparkles size={18} />

                    </div>


                    <div className="flex-1">

                      {/* AI HEADER */}

                      <div className="flex items-center justify-between gap-3">

                        <div>

                          <h3 className="text-sm font-semibold text-[#312F2C]">
                            AI classification preview
                          </h3>

                          <p className="mt-1 text-xs text-[#7A8580]">
                            Preliminary analysis based on your complaint.
                          </p>

                        </div>


                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-[#587F73]">

                          <ShieldCheck size={14} />

                          AI-assisted

                        </span>

                      </div>


                      {/* ANALYZING */}

                      {isPreviewingAI ? (

                        <div className="mt-5 flex items-center gap-3 text-sm text-[#7A8580]">

                          <span className="w-4 h-4 rounded-full border-2 border-[#C4DED4] border-t-[#587F73] animate-spin" />

                          Analyzing complaint...

                        </div>

                      ) : aiResult ? (

                        <div className="mt-5">

                          {/* RESULTS */}

                          <div className="grid sm:grid-cols-2 gap-5">

                            {/* TOPIC */}

                            <div>

                              <p className="text-xs text-[#8A9590]">
                                Topic
                              </p>

                              <p className="mt-1 text-sm font-semibold text-[#312F2C]">
                                {aiResult.topic}
                              </p>

                            </div>


                            {/* CATEGORY */}

                            <div>

                              <p className="text-xs text-[#8A9590]">
                                Category
                              </p>

                              <p className="mt-1 text-sm font-semibold text-[#312F2C]">
                                {aiResult.category}
                              </p>

                            </div>


                            {/* DEPARTMENT */}

                            <div>

                              <p className="text-xs text-[#8A9590]">
                                Department
                              </p>

                              <p className="mt-1 text-sm font-semibold text-[#312F2C]">
                                {aiResult.department}
                              </p>

                            </div>


                            {/* PRIORITY */}

                            <div>

                              <p className="text-xs text-[#8A9590]">
                                Priority
                              </p>

                              <p className="mt-1 text-sm font-semibold text-[#312F2C]">
                                {aiResult.priority}
                              </p>

                            </div>

                          </div>


                          {/* CONFIDENCE */}

                          <div className="mt-5">

                            <div className="flex items-center justify-between">

                              <p className="text-xs text-[#8A9590]">
                                Confidence
                              </p>

                              <p className="text-xs font-semibold text-[#587F73]">
                                {Math.round(
                                  aiResult.confidence * 100
                                )}
                                %
                              </p>

                            </div>


                            <div className="mt-2 h-2 rounded-full bg-white overflow-hidden">

                              <div
                                className="h-full rounded-full bg-[#587F73] transition-all duration-500"
                                style={{
                                  width: `${
                                    aiResult.confidence *
                                    100
                                  }%`,
                                }}
                              />

                            </div>

                          </div>

                        </div>

                      ) : null}

                    </div>

                  </div>

                </div>

              )}


              {/* -----------------------------------------
                  SUBMIT
              ----------------------------------------- */}

              <div className="mt-8 pt-6 border-t border-[#E7ECE9] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <p className="text-xs text-[#8A9590]">
                  Your information will be securely processed.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  loading={isAnalyzing}
                  disabled={
                    !title.trim() ||
                    description.trim().length < 20 ||
                    !state ||
                    !district ||
                    isAnalyzing ||
                    isPreviewingAI
                  }
                >

                  {isAnalyzing
                    ? "Analyzing grievance..."
                    : "Submit Grievance"}

                  {!isAnalyzing && (
                    <ArrowRight size={18} />
                  )}

                </Button>

              </div>

            </Card>


            {/* =========================================
                INFORMATION PANEL
            ========================================= */}

            <div className="space-y-4">

              {/* AI ROUTING */}

              <Card>

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-lg bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center shrink-0">

                    <Sparkles size={18} />

                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-[#312F2C]">
                      AI-assisted routing
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#7A8580]">
                      Your grievance will be analyzed to identify
                      its topic and category before being routed
                      to the appropriate department.
                    </p>

                  </div>

                </div>

              </Card>


              {/* TIPS */}

              <Card>

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-lg bg-[#EEF1EF] text-[#626A67] flex items-center justify-center shrink-0">

                    <Info size={18} />

                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-[#312F2C]">
                      Tips for a faster resolution
                    </h3>

                    <ul className="mt-3 space-y-2 text-sm text-[#7A8580]">

                      <li>
                        • Clearly describe the issue.
                      </li>

                      <li>
                        • Mention the affected location.
                      </li>

                      <li>
                        • Include relevant dates or details.
                      </li>

                      <li>
                        • Upload supporting evidence when useful.
                      </li>

                    </ul>

                  </div>

                </div>

              </Card>


              {/* PRIVACY */}

              <Card>

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-lg bg-[#E4F0EB] text-[#587F73] flex items-center justify-center shrink-0">

                    <ShieldCheck size={18} />

                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-[#312F2C]">
                      Your information
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#7A8580]">
                      Only the information required to process
                      and resolve your grievance is collected.
                    </p>

                  </div>

                </div>

              </Card>

            </div>

          </div>

        </form>

      </div>
    </DashboardLayout>
  );
};

export default SubmitGrievance;