import { useEffect, useState } from "react";
import { Building2, Users, ClipboardList, CheckCircle2 } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import { getAdminAnalytics, getErrorMessage } from "../../services/api";

const Departments = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { getAdminAnalytics().then(setData).catch((err)=>setError(getErrorMessage(err))); }, []);
  const departments = Object.entries(data?.departmentData || {});
  return <DashboardLayout role="admin" userName="Admin"><div className="max-w-7xl mx-auto"><p className="text-sm font-medium text-[#587F73]">Administration</p><h1 className="mt-1 text-3xl font-bold text-[#312F2C]">Departments</h1><p className="mt-2 text-[#626A67]">Live grievance workload by department.</p>{error&&<Card className="mt-6"><p className="text-red-600">{error}</p></Card>}{!data&&!error&&<Card className="mt-8"><p className="text-[#7A8580]">Loading departments...</p></Card>}<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">{departments.map(([name,d])=><Card key={name}><div className="flex items-start gap-4"><div className="w-11 h-11 rounded-lg bg-[#E4F0EB] text-[#587F73] flex items-center justify-center"><Building2 size={21}/></div><div><h2 className="font-semibold">{name}</h2><p className="text-xs text-[#8A9590] mt-1">Government Department</p></div></div><div className="grid grid-cols-3 gap-3 mt-6"><div className="rounded-lg bg-[#F4F7F5] p-3"><Users size={15}/><p className="mt-2 text-lg font-bold">{d.assigned}</p><p className="text-[11px] text-[#8A9590]">Assigned</p></div><div className="rounded-lg bg-[#F4F7F5] p-3"><ClipboardList size={15}/><p className="mt-2 text-lg font-bold">{d.pending}</p><p className="text-[11px] text-[#8A9590]">Pending</p></div><div className="rounded-lg bg-[#E4F0EB] p-3"><CheckCircle2 size={15}/><p className="mt-2 text-lg font-bold">{d.resolved}</p><p className="text-[11px] text-[#8A9590]">Resolved</p></div></div></Card>)}</div>{data&&departments.length===0&&<Card className="mt-8"><p className="text-center text-sm text-[#7A8580]">No department workload data available.</p></Card>}</div></DashboardLayout>;
};

export default Departments;
