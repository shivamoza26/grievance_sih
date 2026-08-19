import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Clock3, CheckCircle2, ArrowRight, Plus } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import { getMyGrievances, getErrorMessage } from "../../services/api";

const CitizenDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userName = localStorage.getItem("userName") || "Citizen";

  useEffect(() => {
    getMyGrievances()
      .then((data) => setGrievances(data.items || []))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total Grievances", value: grievances.length, icon: FileText, iconClass: "bg-[#EAF3F0] text-[#587F73]" },
    { label: "Pending", value: grievances.filter((g) => g.status === "PENDING").length, icon: Clock3, iconClass: "bg-[#F5EEDF] text-[#8A642F]" },
    { label: "In Progress", value: grievances.filter((g) => g.status === "IN_PROGRESS").length, icon: Clock3, iconClass: "bg-[#E4F0EB] text-[#587F73]" },
    { label: "Resolved", value: grievances.filter((g) => g.status === "RESOLVED").length, icon: CheckCircle2, iconClass: "bg-[#DCEBE5] text-[#4B6D63]" },
  ];

  return (
    <DashboardLayout role="citizen" userName={userName}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#587F73]">Citizen Portal</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#312F2C]">Good evening, {userName} 👋</h1>
          <p className="mt-2 text-[#626A67]">Here's an overview of your submitted grievances.</p>
        </div>
        <Link to="/citizen/submit" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#312F2C] text-white text-sm font-medium">
          <Plus size={18} /> Submit Grievance
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#7A8580]">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-[#312F2C]">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconClass}`}><Icon size={20} /></div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#312F2C]">Recent Grievances</h2>
            <p className="text-sm text-[#7A8580] mt-1">Track the latest complaints you've submitted.</p>
          </div>
          <Link to="/citizen/grievances" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#587F73]">View all <ArrowRight size={16} /></Link>
        </div>

        {loading && <Card><p className="text-sm text-[#7A8580]">Loading grievances...</p></Card>}
        {error && <Card><p className="text-sm text-red-600">{error}</p></Card>}
        {!loading && !error && (
          <Card padding={false}>
            <div className="divide-y divide-[#E7ECE9]">
              {grievances.slice(0, 5).map((grievance) => (
                <Link key={grievance.databaseId} to={`/citizen/grievances/${grievance.databaseId}`} className="block p-5 hover:bg-[#F4F7F5]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-semibold text-[#8A9590]">{grievance.id}</span>
                        <StatusBadge status={grievance.status} />
                      </div>
                      <h3 className="mt-2 font-medium text-[#312F2C]">{grievance.title}</h3>
                      <p className="mt-1 text-sm text-[#7A8580] line-clamp-1">{grievance.description}</p>
                    </div>
                    <div className="flex items-center justify-between lg:justify-end gap-6 text-sm">
                      <div><p className="text-xs text-[#8A9590]">Department</p><p className="mt-1 text-[#626A67]">{grievance.department}</p></div>
                      <ArrowRight size={18} className="text-[#8A9590]" />
                    </div>
                  </div>
                </Link>
              ))}
              {grievances.length === 0 && <div className="p-8 text-center text-sm text-[#7A8580]">No grievances submitted yet.</div>}
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
