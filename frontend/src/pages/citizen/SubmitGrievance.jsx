import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Info, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { classifyGrievance } from "../../services/mockAI";
import { createGrievance, getErrorMessage } from "../../services/api";

const SubmitGrievance = () => {
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPreviewingAI, setIsPreviewingAI] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [created, setCreated] = useState(null);
  const [error, setError] = useState("");

  const previewAI = () => {
    if (description.trim().length < 20) {
      setAiResult(null);
      return;
    }
    setIsPreviewingAI(true);
    setTimeout(() => {
      setAiResult(classifyGrievance(description));
      setIsPreviewingAI(false);
    }, 300);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!title.trim()) return setError("Please enter a grievance title.");
    if (description.trim().length < 20) return setError("Please provide at least 20 characters describing the issue.");
    if (!state || !district) return setError("Please select the state and district.");

    try {
      setIsAnalyzing(true);
      const result = await createGrievance({
        description: `${title.trim()}: ${description.trim()}`,
        location: `${district}, ${state}`,
      });

      setCreated(result);
      setAiResult({
        topic: result.topic || title,
        category: result.category || "Uncategorized",
        confidence: result.confidence || 0,
        department: result.department || "Not assigned",
        priority: result.priority || "MEDIUM",
      });
      setSubmitted(true);
      showToast("Grievance submitted successfully.", "success");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (submitted && created) {
    return (
      <DashboardLayout role="citizen" userName={localStorage.getItem("userName") || "Citizen"}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 rounded-full bg-[#E4F0EB] text-[#587F73] flex items-center justify-center"><CheckCircle2 size={30}/></div>
            <h1 className="mt-5 text-3xl font-bold text-[#312F2C]">Grievance Submitted</h1>
            <p className="mt-2 text-[#7A8580]">Your grievance has been received by the backend.</p>
          </div>
          <Card>
            <div className="flex items-center justify-between gap-4 border-b border-[#E7ECE9] pb-5">
              <div><p className="text-xs font-semibold text-[#8A9590]">Grievance ID</p><p className="mt-1 text-xl font-bold text-[#312F2C]">{created.id}</p></div>
              <span className="rounded-full bg-[#E4F0EB] text-[#587F73] px-3 py-1.5 text-sm font-medium">{created.status}</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 py-6 border-b border-[#E7ECE9]">
              <div><p className="text-xs text-[#8A9590]">Topic</p><p className="mt-1 font-semibold text-[#312F2C]">{created.topic || "—"}</p></div>
              <div><p className="text-xs text-[#8A9590]">Category</p><p className="mt-1 font-semibold text-[#312F2C]">{created.category || "—"}</p></div>
              <div><p className="text-xs text-[#8A9590]">AI Confidence</p><p className="mt-1 font-semibold text-[#587F73]">{Math.round((created.confidence || 0) * 100)}%</p></div>
            </div>
            <div className="pt-6"><div className="flex items-center gap-2"><Sparkles size={17} className="text-[#587F73]"/><p className="text-sm font-semibold">AI Classification</p></div><div className="grid sm:grid-cols-2 gap-5 mt-5"><div><p className="text-xs text-[#8A9590]">Recommended Department</p><p className="mt-1 font-semibold">{created.department || "Not assigned"}</p></div><div><p className="text-xs text-[#8A9590]">Priority</p><p className="mt-1 font-semibold">{created.priority || "MEDIUM"}</p></div></div></div>
          </Card>
          <div className="mt-6 flex justify-end"><Link to={`/citizen/grievances/${created.databaseId}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#587F73]">Track this grievance <ArrowRight size={16}/></Link></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="citizen" userName={localStorage.getItem("userName") || "Citizen"}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8"><p className="text-sm font-medium text-[#587F73]">Citizen Portal</p><h1 className="mt-1 text-3xl font-bold text-[#312F2C]">Submit a Grievance</h1><p className="mt-2 text-[#626A67]">Describe your issue clearly and the backend AI service will classify and route it.</p></div>
        {error && <div className="mb-6 rounded-lg border border-[#E5C8C4] bg-[#FBF2F1] px-4 py-3 text-sm text-[#8A5A55]">{error}</div>}
        <form onSubmit={handleSubmit}>
          <Card>
            <div className="space-y-5">
              <label className="block text-sm font-medium text-[#626A67]">Title<input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm" placeholder="Briefly describe the issue"/></label>
              <label className="block text-sm font-medium text-[#626A67]">Description<textarea value={description} onChange={(e)=>{setDescription(e.target.value); setAiResult(null)}} onBlur={previewAI} rows={7} maxLength={1000} className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm" placeholder="Describe what happened, where, and when."/></label>
              {isPreviewingAI && <p className="text-sm text-[#587F73]">Previewing classification...</p>}
              {aiResult && !isPreviewingAI && <div className="rounded-lg bg-[#F4F8F6] border border-[#DCE8E3] p-4 text-sm"><strong>{aiResult.category}</strong> · {Math.round((aiResult.confidence || 0)*100)}% confidence</div>}
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-[#626A67]">State<input value={state} onChange={(e)=>setState(e.target.value)} className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm" placeholder="Maharashtra"/></label>
                <label className="text-sm font-medium text-[#626A67]">District / City<input value={district} onChange={(e)=>setDistrict(e.target.value)} className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm" placeholder="Mumbai"/></label>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-[#F4F8F6] border border-[#E5EBE8] p-4 text-sm text-[#626A67]"><ShieldCheck size={18} className="text-[#587F73] shrink-0"/><span>Your grievance is submitted securely using your authenticated citizen account.</span></div>
              <button disabled={isAnalyzing} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#587F73] text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-60">{isAnalyzing ? "Submitting..." : "Submit Grievance"}</button>
            </div>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default SubmitGrievance;
