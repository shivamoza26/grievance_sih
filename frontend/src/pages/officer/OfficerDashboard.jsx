import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Clock3, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";
import { getOfficerGrievances, getErrorMessage } from "../../services/api";

const OfficerDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [error, setError] = useState("");
  useEffect(()=>{getOfficerGrievances().then(setGrievances).catch((err)=>setError(getErrorMessage(err)));},[]);
  const stats=[
    {label:"Assigned",value:grievances.length,icon:ClipboardList},
    {label:"Pending Review",value:grievances.filter(g=>g.status==="PENDING").length,icon:Clock3},
    {label:"High Priority",value:grievances.filter(g=>g.priority==="HIGH").length,icon:AlertTriangle},
    {label:"Resolved",value:grievances.filter(g=>g.status==="RESOLVED").length,icon:CheckCircle2},
  ];
  return <DashboardLayout role="officer" userName={localStorage.getItem("userName")||"Officer"}><div className="max-w-7xl mx-auto"><p className="text-sm font-medium text-[#587F73]">Officer Workspace</p><h1 className="mt-1 text-3xl font-bold text-[#312F2C]">Officer Dashboard</h1><p className="mt-2 text-[#626A67]">Manage grievances assigned to you.</p>{error&&<Card className="mt-6"><p className="text-red-600">{error}</p></Card>}<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">{stats.map(s=>{const Icon=s.icon;return <Card key={s.label}><Icon className="text-[#587F73]"/><p className="mt-4 text-sm text-[#7A8580]">{s.label}</p><p className="text-3xl font-bold">{s.value}</p></Card>})}</div><Card className="mt-8"><div className="flex justify-between mb-4"><h2 className="font-semibold">Recent Assignments</h2><Link to="/officer/grievances" className="text-sm text-[#587F73]">View all <ArrowRight size={14} className="inline"/></Link></div>{grievances.slice(0,5).map(g=><Link key={g.databaseId} to={`/officer/grievances/${g.databaseId}`} className="block py-4 border-t border-[#E7ECE9]"><div className="flex justify-between gap-4"><div><p className="text-xs text-[#8A9590]">{g.id} · {g.citizen}</p><p className="mt-1 font-medium">{g.title}</p></div><div className="flex gap-2"><StatusBadge status={g.status}/><PriorityBadge priority={g.priority}/></div></div></Link>)}{grievances.length===0&&!error&&<p className="text-sm text-[#7A8580]">No grievances assigned to you.</p>}</Card></div></DashboardLayout>;
};
export default OfficerDashboard;
