import { useEffect, useState } from "react";
import { BarChart3, CheckCircle2, Clock3 } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import { getAdminAnalytics, getErrorMessage } from "../../services/api";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { getAdminAnalytics().then(setData).catch((err)=>setError(getErrorMessage(err))); }, []);

  return <DashboardLayout role="admin" userName="Admin"><div className="max-w-7xl mx-auto"><p className="text-sm font-medium text-[#587F73]">Administration</p><h1 className="mt-1 text-3xl font-bold text-[#312F2C]">Analytics</h1><p className="mt-2 text-[#626A67]">Live analytics calculated from the grievance database.</p>{error&&<Card className="mt-6"><p className="text-red-600">{error}</p></Card>}{!data&&!error&&<Card className="mt-8"><p className="text-[#7A8580]">Loading analytics...</p></Card>}{data&&<><div className="grid md:grid-cols-3 gap-5 mt-8"><Card><BarChart3 className="text-[#587F73]"/><p className="mt-4 text-sm text-[#7A8580]">Total</p><p className="text-3xl font-bold">{data.total}</p></Card><Card><Clock3 className="text-[#587F73]"/><p className="mt-4 text-sm text-[#7A8580]">Open</p><p className="text-3xl font-bold">{(data.byStatus.SUBMITTED||0)+(data.byStatus.ASSIGNED||0)+(data.byStatus.IN_PROGRESS||0)}</p></Card><Card><CheckCircle2 className="text-[#587F73]"/><p className="mt-4 text-sm text-[#7A8580]">Resolution Rate</p><p className="text-3xl font-bold">{data.resolutionRate}%</p></Card></div><div className="grid lg:grid-cols-2 gap-6 mt-6"><Card><h2 className="font-semibold">By Category</h2><div className="mt-5 space-y-3">{data.categoryData.map((x)=><div key={x.name} className="flex justify-between text-sm"><span>{x.name}</span><strong>{x.value}</strong></div>)}</div></Card><Card><h2 className="font-semibold">By Status</h2><div className="mt-5 space-y-3">{Object.entries(data.byStatus).map(([name,value])=><div key={name} className="flex justify-between text-sm"><span>{name}</span><strong>{value}</strong></div>)}</div></Card></div></>}</div></DashboardLayout>;
};

export default AdminAnalytics;
