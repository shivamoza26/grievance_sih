import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, MapPin } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";
import { getAdminGrievances, getErrorMessage } from "../../services/api";

const AdminGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminGrievances().then((data) => setGrievances(data.items || [])).catch((err) => setError(getErrorMessage(err))).finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => [...new Set(grievances.map((g)=>g.category).filter(Boolean))], [grievances]);
  const filtered = grievances.filter((g) => {
    const term = search.toLowerCase().trim();
    return (!term || g.id.toLowerCase().includes(term) || g.description.toLowerCase().includes(term) || g.citizen.toLowerCase().includes(term)) &&
      (statusFilter === "ALL" || g.status === statusFilter) &&
      (categoryFilter === "ALL" || g.category === categoryFilter);
  });

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-medium text-[#587F73]">Administration</p>
        <h1 className="mt-1 text-3xl font-bold text-[#312F2C]">All Grievances</h1>
        <p className="mt-2 text-[#626A67]">Review grievances received across the platform.</p>

        <Card className="mt-8"><div className="grid md:grid-cols-3 gap-4"><div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by ID, citizen or description" className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-3 py-2.5 text-sm"/></div><select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className="rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"><option value="ALL">All statuses</option><option value="SUBMITTED">Submitted</option><option value="ASSIGNED">Assigned</option><option value="IN_PROGRESS">In Progress</option><option value="RESOLVED">Resolved</option><option value="REJECTED">Rejected</option><option value="CLOSED">Closed</option></select><select value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)} className="rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm"><option value="ALL">All categories</option>{categories.map((c)=><option key={c}>{c}</option>)}</select></div></Card>

        {loading && <Card className="mt-6"><p className="text-sm text-[#7A8580]">Loading grievances...</p></Card>}
        {error && <Card className="mt-6"><p className="text-sm text-red-600">{error}</p></Card>}
        {!loading && !error && <div className="mt-6 space-y-4">{filtered.map((g)=><Card key={g.databaseId}><Link to={`/admin/grievances/${g.databaseId}`} className="block"><div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5"><div><div className="flex items-center gap-3 flex-wrap"><span className="text-xs font-semibold text-[#8A9590]">{g.id}</span><StatusBadge status={g.status}/><PriorityBadge priority={g.priority}/></div><h2 className="mt-2 text-lg font-semibold text-[#312F2C]">{g.title}</h2><p className="mt-2 text-sm text-[#626A67]">{g.description}</p><div className="mt-4 flex flex-wrap gap-4 text-xs text-[#7A8580]"><span>Citizen: {g.citizen}</span><span className="inline-flex items-center gap-1"><MapPin size={14}/>{g.location}</span><span>{g.category || "Uncategorized"}</span></div></div><ArrowRight size={18} className="text-[#8A9590]"/></div></Link></Card>)}{filtered.length===0&&<Card><p className="text-center text-sm text-[#7A8580]">No grievances match the selected filters.</p></Card>}</div>}
      </div>
    </DashboardLayout>
  );
};

export default AdminGrievances;
