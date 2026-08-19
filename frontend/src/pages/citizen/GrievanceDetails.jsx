import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, CalendarDays, MessageSquare, Sparkles } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import { getGrievance, getErrorMessage } from "../../services/api";

const GrievanceDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getGrievance(id).then(setData).catch((err) => setError(getErrorMessage(err)));
  }, [id]);

  if (error) return <DashboardLayout role="citizen" userName={localStorage.getItem("userName") || "Citizen"}><Card><p className="text-red-600">{error}</p></Card></DashboardLayout>;
  if (!data) return <DashboardLayout role="citizen" userName={localStorage.getItem("userName") || "Citizen"}><Card><p className="text-[#7A8580]">Loading grievance...</p></Card></DashboardLayout>;

  const g = data.grievance;

  return (
    <DashboardLayout role="citizen" userName={localStorage.getItem("userName") || "Citizen"}>
      <div className="max-w-4xl mx-auto">
        <Link to="/citizen/grievances" className="inline-flex items-center gap-2 text-sm text-[#587F73] mb-6"><ArrowLeft size={16}/> Back to My Grievances</Link>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div><p className="text-xs font-semibold text-[#8A9590]">{g.id}</p><h1 className="mt-1 text-3xl font-bold text-[#312F2C]">{g.title}</h1><p className="mt-2 text-[#626A67]">{g.description}</p></div>
          <StatusBadge status={g.status}/>
        </div>

        <Card>
          <div className="grid sm:grid-cols-3 gap-5">
            <div><p className="text-xs text-[#8A9590]">Location</p><p className="mt-1 flex items-center gap-1 text-sm text-[#312F2C]"><MapPin size={14}/>{g.location}</p></div>
            <div><p className="text-xs text-[#8A9590]">Submitted</p><p className="mt-1 flex items-center gap-1 text-sm text-[#312F2C]"><CalendarDays size={14}/>{g.submittedAt}</p></div>
            <div><p className="text-xs text-[#8A9590]">Department</p><p className="mt-1 text-sm text-[#312F2C]">{g.department}</p></div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card><div className="flex items-center gap-2"><Sparkles size={17} className="text-[#587F73]"/><h2 className="font-semibold">AI Classification</h2></div><div className="mt-5 space-y-4 text-sm"><div><span className="text-[#8A9590]">Topic</span><p className="font-semibold">{g.topic || "—"}</p></div><div><span className="text-[#8A9590]">Category</span><p className="font-semibold">{g.category || "—"}</p></div><div><span className="text-[#8A9590]">Confidence</span><p className="font-semibold">{Math.round((g.confidence || 0)*100)}%</p></div></div></Card>
          <Card><div className="flex items-center gap-2"><MessageSquare size={17} className="text-[#587F73]"/><h2 className="font-semibold">Activity Timeline</h2></div><div className="mt-5 space-y-4">{data.timeline.length ? data.timeline.map((item) => <div key={item.id} className="border-l-2 border-[#ABD1C6] pl-4"><p className="text-sm font-semibold">{item.new_status}</p><p className="text-xs text-[#7A8580]">{item.comment || "Status updated"}</p><p className="text-xs text-[#A0A8A4] mt-1">{item.changed_at ? new Date(item.changed_at).toLocaleString() : ""}</p></div>) : <p className="text-sm text-[#7A8580]">No activity yet.</p>}</div></Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GrievanceDetails;
