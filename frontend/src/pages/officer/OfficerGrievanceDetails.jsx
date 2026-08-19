import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";
import { getGrievance, updateGrievanceStatus, replyToGrievance, getErrorMessage } from "../../services/api";

const OfficerGrievanceDetails = () => {
  const { id } = useParams();
  const [data,setData]=useState(null); const [status,setStatus]=useState(""); const [comment,setComment]=useState(""); const [reply,setReply]=useState(""); const [error,setError]=useState("");
  const load=()=>getGrievance(id).then(d=>{setData(d);setStatus(d.grievance.status)}).catch(e=>setError(getErrorMessage(e)));
  useEffect(()=>{load()},[id]);
  if(!data)return <DashboardLayout role="officer" userName="Officer"><Card><p className={error?"text-red-600":"text-[#7A8580]"}>{error||"Loading..."}</p></Card></DashboardLayout>;
  const g=data.grievance;
  const save=async()=>{try{await updateGrievanceStatus(id,status,comment);setComment("");await load()}catch(e){setError(getErrorMessage(e))}};
  const send=async()=>{try{await replyToGrievance(id,reply);setReply("");await load()}catch(e){setError(getErrorMessage(e))}};
  return <DashboardLayout role="officer" userName={localStorage.getItem("userName")||"Officer"}><div className="max-w-5xl mx-auto"><Link to="/officer/grievances" className="inline-flex items-center gap-2 text-sm text-[#587F73] mb-6"><ArrowLeft size={16}/> Back</Link><div className="flex justify-between gap-4 mb-6"><div><p className="text-xs text-[#8A9590]">{g.id}</p><h1 className="text-3xl font-bold">{g.title}</h1><p className="mt-2 text-[#626A67]">{g.description}</p></div><div className="flex gap-2"><StatusBadge status={g.status}/><PriorityBadge priority={g.priority}/></div></div><div className="grid lg:grid-cols-[1fr_320px] gap-6"><Card><h2 className="font-semibold">Activity</h2><div className="mt-5 space-y-4">{data.timeline.map(x=><div key={x.id} className="border-l-2 border-[#ABD1C6] pl-4"><p className="font-medium text-sm">{x.new_status}</p><p className="text-xs text-[#7A8580]">{x.comment||"Update"}</p></div>)}</div></Card><Card><label className="text-sm font-medium">Status<select value={status} onChange={e=>setStatus(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-sm"><option>ASSIGNED</option><option>IN_PROGRESS</option><option>RESOLVED</option><option>REJECTED</option><option>CLOSED</option></select></label><textarea value={comment} onChange={e=>setComment(e.target.value)} rows={3} placeholder="Status comment" className="mt-4 w-full rounded-lg border px-3 py-2.5 text-sm"/><button onClick={save} className="mt-3 w-full rounded-lg bg-[#587F73] text-white px-4 py-2.5 text-sm font-semibold">Update Status</button><textarea value={reply} onChange={e=>setReply(e.target.value)} rows={4} placeholder="Reply to citizen" className="mt-6 w-full rounded-lg border px-3 py-2.5 text-sm"/><button onClick={send} className="mt-3 w-full rounded-lg border border-[#587F73] text-[#587F73] px-4 py-2.5 text-sm font-semibold"><Send size={15} className="inline mr-2"/>Send Reply</button></Card></div></div></DashboardLayout>;
};
export default OfficerGrievanceDetails;
