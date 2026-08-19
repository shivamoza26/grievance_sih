import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";
import { getOfficerGrievances, getErrorMessage } from "../../services/api";

const AssignedGrievances = ({ priorityOnly = false }) => {
  const [grievances, setGrievances] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState(priorityOnly ? "HIGH" : "ALL");
  const [error, setError] = useState("");
  useEffect(()=>{getOfficerGrievances().then(setGrievances).catch((err)=>setError(getErrorMessage(err)));},[]);
  const filtered=useMemo(()=>grievances.filter(g=>{const t=search.toLowerCase().trim();return(!t||g.id.toLowerCase().includes(t)||g.description.toLowerCase().includes(t)||g.citizen.toLowerCase().includes(t))&&(status==="ALL"||g.status===status)&&(priority==="ALL"||g.priority===priority)}),[grievances,search,status,priority]);
  return <DashboardLayout role="officer" userName={localStorage.getItem("userName")||"Officer"}><div className="max-w-7xl mx-auto"><p className="text-sm font-medium text-[#587F73]">Officer Workspace</p><h1 className="mt-1 text-3xl font-bold">Assigned Grievances</h1><Card className="mt-8"><div className="grid md:grid-cols-3 gap-4"><div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-3 py-2.5 text-sm"/></div><select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"><option>ALL</option><option>SUBMITTED</option><option>IN_PROGRESS</option><option>RESOLVED</option><option>REJECTED</option><option>CLOSED</option></select><select value={priority} onChange={e=>setPriority(e.target.value)} className="rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"><option>ALL</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></div></Card>{error&&<Card className="mt-6"><p className="text-red-600">{error}</p></Card>}<div className="mt-6 space-y-4">{filtered.map(g=><Card key={g.databaseId}><Link to={`/officer/grievances/${g.databaseId}`} className="flex justify-between gap-4"><div><div className="flex gap-2"><span className="text-xs text-[#8A9590]">{g.id}</span><StatusBadge status={g.status}/><PriorityBadge priority={g.priority}/></div><h2 className="mt-2 font-semibold">{g.title}</h2><p className="mt-1 text-sm text-[#7A8580]">{g.description}</p></div><ArrowRight className="text-[#8A9590]"/></Link></Card>)}{filtered.length===0&&!error&&<Card><p className="text-sm text-center text-[#7A8580]">No assigned grievances found.</p></Card>}</div></div></DashboardLayout>;
};
export default AssignedGrievances;
