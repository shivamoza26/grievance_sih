import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowRight, MapPin, CalendarDays, Plus } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import { getMyGrievances, getErrorMessage } from "../../services/api";

const MyGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyGrievances()
      .then((data) => setGrievances(data.items || []))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(grievances.map((item) => item.category).filter(Boolean))],
    [grievances]
  );

  const filteredGrievances = useMemo(() => {
    const term = search.toLowerCase().trim();
    return grievances.filter((g) => {
      const matchesSearch =
        !term ||
        g.id.toLowerCase().includes(term) ||
        g.title.toLowerCase().includes(term) ||
        g.description.toLowerCase().includes(term) ||
        g.department.toLowerCase().includes(term);

      return (
        matchesSearch &&
        (statusFilter === "ALL" || g.status === statusFilter) &&
        (categoryFilter === "ALL" || g.category === categoryFilter)
      );
    });
  }, [grievances, search, statusFilter, categoryFilter]);

  return (
    <DashboardLayout role="citizen" userName={localStorage.getItem("userName") || "Citizen"}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#587F73]">Citizen Portal</p>
            <h1 className="mt-1 text-3xl font-bold text-[#312F2C]">My Grievances</h1>
            <p className="mt-2 text-[#626A67]">View and track all grievances submitted by you.</p>
          </div>
          <Link to="/citizen/submit" className="inline-flex items-center gap-2 rounded-lg bg-[#312F2C] text-white px-4 py-2.5 text-sm font-semibold"><Plus size={17}/> Submit Grievance</Link>
        </div>

        <Card className="mt-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9590]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search grievances..." className="w-full rounded-lg border border-[#C8D2CE] pl-10 pr-3 py-2.5 text-sm" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm">
              <option value="ALL">All statuses</option><option value="PENDING">Pending</option><option value="IN_PROGRESS">In Progress</option><option value="RESOLVED">Resolved</option><option value="REJECTED">Rejected</option><option value="CLOSED">Closed</option>
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-lg border border-[#C8D2CE] px-3 py-2.5 text-sm">
              <option value="ALL">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
        </Card>

        {loading && <Card className="mt-6"><p className="text-sm text-[#7A8580]">Loading grievances...</p></Card>}
        {error && <Card className="mt-6"><p className="text-sm text-red-600">{error}</p></Card>}

        {!loading && !error && (
          <div className="mt-6 space-y-4">
            {filteredGrievances.map((g) => (
              <Card key={g.databaseId}>
                <Link to={`/citizen/grievances/${g.databaseId}`} className="block">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap"><span className="text-xs font-semibold text-[#8A9590]">{g.id}</span><StatusBadge status={g.status}/></div>
                      <h2 className="mt-2 text-lg font-semibold text-[#312F2C]">{g.title}</h2>
                      <p className="mt-2 text-sm text-[#626A67]">{g.description}</p>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#7A8580]"><span className="inline-flex items-center gap-1"><MapPin size={14}/>{g.location}</span><span className="inline-flex items-center gap-1"><CalendarDays size={14}/>{g.submittedAt}</span><span>{g.category || "Uncategorized"}</span></div>
                    </div>
                    <ArrowRight className="text-[#8A9590]" size={18}/>
                  </div>
                </Link>
              </Card>
            ))}
            {filteredGrievances.length === 0 && <Card><p className="text-center text-sm text-[#7A8580]">No grievances match your filters.</p></Card>}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyGrievances;
