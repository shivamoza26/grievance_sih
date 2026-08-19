import { useEffect, useState } from "react";
import { FileText, Clock3, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import { getAdminAnalytics, getErrorMessage } from "../../services/api";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminAnalytics().then(setAnalytics).catch((err) => setError(getErrorMessage(err)));
  }, []);

  const status = analytics?.byStatus || {};
  const statusChartData = Object.entries(status).map(
    ([name, value]) => ({
      name: name.replace(/_/g, " "),
      value,
    })
  );

  const departmentChartData = Object.entries(
    analytics?.departmentData || {}
  ).map(([department, data]) => ({
    department,
    assigned: data.assigned || 0,
    resolved: data.resolved || 0,
  }));

  const stats = [
    { label: "Total Grievances", value: analytics?.total || 0, icon: FileText, iconClass: "bg-[#E4F0EB] text-[#587F73]" },
    { label: "Pending", value: status.SUBMITTED ? status.SUBMITTED : 0, icon: Clock3, iconClass: "bg-[#F8F1E5] text-[#9A7435]" },
    { label: "In Progress", value: (status.ASSIGNED || 0) + (status.IN_PROGRESS || 0), icon: AlertTriangle, iconClass: "bg-[#F0F6F3] text-[#587F73]" },
    { label: "Resolved", value: status.RESOLVED || 0, icon: CheckCircle2, iconClass: "bg-[#E4F0EB] text-[#4B6D63]" },
  ];

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-medium text-[#587F73]">Administration</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#312F2C]">System Overview</h1>
        <p className="mt-2 text-[#626A67]">Live grievance activity and department performance.</p>

        {error && <Card className="mt-6"><p className="text-sm text-red-600">{error}</p></Card>}
        {!analytics && !error && <Card className="mt-8"><p className="text-sm text-[#7A8580]">Loading analytics...</p></Card>}

        {analytics && !error && <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return <Card key={stat.label}><div className="flex items-start justify-between"><div><p className="text-sm text-[#7A8580]">{stat.label}</p><p className="mt-2 text-3xl font-bold text-[#312F2C]">{stat.value.toLocaleString()}</p></div><div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconClass}`}><Icon size={20}/></div></div></Card>;
            })}
          </div>

          <Card className="mt-6">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Resolution Rate</p><p className="mt-1 text-sm text-[#7A8580]">Percentage of grievances successfully resolved.</p></div><p className="text-3xl font-bold text-[#587F73]">{analytics.resolutionRate}%</p></div>
            <div className="mt-4 h-2.5 rounded-full bg-[#EEF1EF] overflow-hidden"><div className="h-full rounded-full bg-[#587F73]" style={{width: `${Math.min(100, analytics.resolutionRate)}%`}}/></div>
          </Card>

          <div className="grid xl:grid-cols-2 gap-6 mt-6">
            <Card>
              <div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">Top Categories</h2><p className="mt-1 text-sm text-[#7A8580]">Most frequently reported categories.</p></div><ArrowRight size={18} className="text-[#8A9590]"/></div>
              <div className="mt-6 space-y-5">
                {analytics.categoryData.slice().sort((a,b)=>b.value-a.value).slice(0,5).map((category) => {
                  const max = Math.max(...analytics.categoryData.map((x)=>x.value), 1);
                  return <div key={category.name}><div className="flex items-center justify-between text-sm"><span className="font-medium">{category.name}</span><span className="text-[#7A8580]">{category.value}</span></div><div className="mt-2 h-2 rounded-full bg-[#EEF1EF] overflow-hidden"><div className="h-full rounded-full bg-[#587F73]" style={{width:`${category.value/max*100}%`}}/></div></div>;
                })}
                {analytics.categoryData.length === 0 && <p className="text-sm text-[#7A8580]">No category data available.</p>}
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold">Department Performance</h2>
              <p className="mt-1 text-sm text-[#7A8580]">Current workload across departments.</p>
              <div className="mt-6 space-y-4">
                {Object.entries(analytics.departmentData).map(([name, data]) => <div key={name} className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-[#F4F7F5]"><div><p className="text-sm font-medium">{name}</p><p className="mt-1 text-xs text-[#8A9590]">{data.assigned} assigned</p></div><div className="text-right"><p className="text-sm font-semibold text-[#587F73]">{data.resolved} resolved</p><p className="mt-1 text-xs text-[#8A9590]">{data.pending} pending</p></div></div>)}
                {Object.keys(analytics.departmentData).length === 0 && <p className="text-sm text-[#7A8580]">No department workload data available.</p>}
              </div>
            </Card>
          {/* Visual Analytics */}
          <div className="grid xl:grid-cols-2 gap-6 mt-6">

            {/* Status Distribution */}
            <Card>
              <div>
                <h2 className="text-lg font-semibold text-[#312F2C]">
                  Grievance Status Distribution
                </h2>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Current distribution of grievances by status.
                </p>
              </div>

              <div className="mt-6 h-80">
                {statusChartData.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-[#7A8580]">
                      No status data available.
                    </p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={55}
                        paddingAngle={3}
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell key={`status-${index}`} />
                        ))}
                      </Pie>

                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>

            {/* Category Chart */}
            <Card>
              <div>
                <h2 className="text-lg font-semibold text-[#312F2C]">
                  Grievances by Category
                </h2>

                <p className="mt-1 text-sm text-[#7A8580]">
                  Number of grievances reported for each category.
                </p>
              </div>

              <div className="mt-6 h-80">
                {analytics.categoryData.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-[#7A8580]">
                      No category data available.
                    </p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics.categoryData}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        interval={0}
                      />

                      <YAxis allowDecimals={false} />

                      <Tooltip />

                      <Bar
                        dataKey="value"
                        name="Grievances"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>

          </div>

          {/* Department Chart */}
          <Card className="mt-6">

            <div>
              <h2 className="text-lg font-semibold text-[#312F2C]">
                Department Performance Chart
              </h2>

              <p className="mt-1 text-sm text-[#7A8580]">
                Assigned and resolved grievances across departments.
              </p>
            </div>

            <div className="mt-6 h-80">

              {departmentChartData.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-[#7A8580]">
                    No department data available.
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentChartData}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="department"
                      tick={{ fontSize: 12 }}
                      interval={0}
                    />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="assigned"
                      name="Assigned"
                      radius={[6, 6, 0, 0]}
                    />

                    <Bar
                      dataKey="resolved"
                      name="Resolved"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}

            </div>

          </Card>

          </div>
        </>}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
