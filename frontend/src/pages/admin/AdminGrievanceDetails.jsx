import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";
import { getGrievance, updateGrievanceStatus, replyToGrievance, getErrorMessage } from "../../services/api";

const AdminGrievanceDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");

  const load = () => getGrievance(id).then((value) => { setData(value); setStatus(value.grievance.status); }).catch((err) => setError(getErrorMessage(err)));

  useEffect(() => { load(); }, [id]);

  const update = async () => {
    try { await updateGrievanceStatus(id, status, comment); setComment(""); await load(); }
    catch (err) { setError(getErrorMessage(err)); }
  };

  const sendReply = async () => {
    if (!reply.trim()) return;
    try { await replyToGrievance(id, reply.trim()); setReply(""); await load(); }
    catch (err) { setError(getErrorMessage(err)); }
  };

  if (!data) return <DashboardLayout role="admin" userName="Admin"><Card><p className={error ? "text-red-600" : "text-[#7A8580]"}>{error || "Loading grievance..."}</p></Card></DashboardLayout>;
  const g = data.grievance;

  return <DashboardLayout role="admin" userName="Admin"><div className="max-w-5xl mx-auto">
    <Link to="/admin/grievances" className="inline-flex items-center gap-2 text-sm text-[#587F73] mb-6"><ArrowLeft size={16}/> Back to grievances</Link>
    {error && <Card className="mb-6"><p className="text-sm text-red-600">{error}</p></Card>}
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6"><div><p className="text-xs font-semibold text-[#8A9590]">{g.id}</p><h1 className="mt-1 text-3xl font-bold text-[#312F2C]">{g.title}</h1><p className="mt-2 text-[#626A67]">{g.description}</p></div><div className="flex gap-2"><StatusBadge status={g.status}/><PriorityBadge priority={g.priority}/></div></div>
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-6"><Card><h2 className="font-semibold">Grievance information</h2><div className="grid sm:grid-cols-2 gap-5 mt-5 text-sm"><div><span className="text-[#8A9590]">Citizen</span><p className="font-medium">{g.citizen}</p></div><div><span className="text-[#8A9590]">Location</span><p className="font-medium">{g.location}</p></div><div><span className="text-[#8A9590]">Category</span><p className="font-medium">{g.category || "Uncategorized"}</p></div><div><span className="text-[#8A9590]">Confidence</span><p className="font-medium">{Math.round((g.confidence || 0)*100)}%</p></div></div></Card>
      <Card><div className="flex items-center gap-2"><MessageSquare size={17} className="text-[#587F73]"/><h2 className="font-semibold">Activity</h2></div><div className="mt-5 space-y-4">{data.timeline.map((item)=><div key={item.id} className="border-l-2 border-[#ABD1C6] pl-4"><p className="text-sm font-semibold">{item.new_status}</p><p className="text-xs text-[#7A8580]">{item.comment || "Update"}</p></div>)}</div></Card></div>
      <Card><h2 className="font-semibold">Manage grievance</h2><label className="block text-sm font-medium mt-5">Status<select value={status} onChange={(e)=>setStatus(e.target.value)} className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"><option value="SUBMITTED">Submitted</option><option value="ASSIGNED">Assigned</option><option value="IN_PROGRESS">In Progress</option><option value="RESOLVED">Resolved</option><option value="REJECTED">Rejected</option><option value="CLOSED">Closed</option></select></label><label className="block text-sm font-medium mt-4">Comment<textarea value={comment} onChange={(e)=>setComment(e.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"/></label><button onClick={update} className="mt-3 w-full rounded-lg bg-[#587F73] text-white px-4 py-2.5 text-sm font-semibold">Update Status</button><label className="block text-sm font-medium mt-6">Reply<textarea value={reply} onChange={(e)=>setReply(e.target.value)} rows={4} className="mt-2 w-full rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"/></label><button onClick={sendReply} className="mt-3 w-full rounded-lg border border-[#587F73] text-[#587F73] px-4 py-2.5 text-sm font-semibold">Send Reply</button></Card>
    </div>
  </div></DashboardLayout>;
};

export default AdminGrievanceDetails;
