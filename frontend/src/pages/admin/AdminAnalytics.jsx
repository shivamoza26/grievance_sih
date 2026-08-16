import { useMemo, useState } from "react";
import { analyticsGrievances } from "../../mocks/analyticsGrievances";

import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";

import {
  adminStats,
  categoryData,
  departmentData,
} from "../../mocks/adminAnalytics";

const AdminAnalytics = () => {
  const [period, setPeriod] = useState("6M");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // --------------------------------------------------
  // FILTER OPTIONS
  // --------------------------------------------------

  const categories = [
    ...new Set(categoryData.map((item) => item.name)),
  ];

  const departments = departmentData.map(
    (item) => item.department
  );

  // --------------------------------------------------
  // FILTER GRIEVANCES
  // --------------------------------------------------

  const filteredGrievances = useMemo(() => {
    return analyticsGrievances.filter((grievance) => {
      const matchesCategory =
        categoryFilter === "ALL" ||
        grievance.category === categoryFilter;

      const matchesDepartment =
        departmentFilter === "ALL" ||
        grievance.department === departmentFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        grievance.status === statusFilter;

      return (
        matchesCategory &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    categoryFilter,
    departmentFilter,
    statusFilter,
  ]);

  // --------------------------------------------------
  // DYNAMIC STATUS DATA
  // --------------------------------------------------

  const dynamicStatusData = useMemo(() => {
    const counts = {
      PENDING: 0,
      IN_PROGRESS: 0,
      RESOLVED: 0,
    };

    filteredGrievances.forEach((grievance) => {
      if (counts[grievance.status] !== undefined) {
        counts[grievance.status]++;
      }
    });

    return [
      {
        name: "Pending",
        value: counts.PENDING,
      },
      {
        name: "In Progress",
        value: counts.IN_PROGRESS,
      },
      {
        name: "Resolved",
        value: counts.RESOLVED,
      },
    ];
  }, [filteredGrievances]);

  // --------------------------------------------------
  // DYNAMIC CATEGORY DATA
  // --------------------------------------------------

  const dynamicCategoryData = useMemo(() => {
    const counts = {};

    filteredGrievances.forEach((grievance) => {
      counts[grievance.category] =
        (counts[grievance.category] || 0) + 1;
    });

    return Object.entries(counts).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [filteredGrievances]);

  // --------------------------------------------------
  // DYNAMIC DEPARTMENT DATA
  // --------------------------------------------------

  const dynamicDepartmentData = useMemo(() => {
    const departments = {};

    filteredGrievances.forEach((grievance) => {
      if (!departments[grievance.department]) {
        departments[grievance.department] = {
          department: grievance.department,
          assigned: 0,
          resolved: 0,
        };
      }

      departments[grievance.department].assigned++;

      if (grievance.status === "RESOLVED") {
        departments[grievance.department].resolved++;
      }
    });

    return Object.values(departments);
  }, [filteredGrievances]);

  // --------------------------------------------------
  // DYNAMIC MONTHLY DATA
  // --------------------------------------------------

  const dynamicMonthlyData = useMemo(() => {
    const monthNames = [
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ];

    const monthMap = {};

    monthNames.forEach((month) => {
      monthMap[month] = {
        month,
        submitted: 0,
        resolved: 0,
      };
    });

    filteredGrievances.forEach((grievance) => {
      const date = new Date(
        grievance.submittedAt
      );

      const month = date.toLocaleString(
        "en-US",
        {
          month: "short",
        }
      );

      if (monthMap[month]) {
        monthMap[month].submitted++;

        if (grievance.status === "RESOLVED") {
          monthMap[month].resolved++;
        }
      }
    });

    let result = Object.values(monthMap);

    if (period === "3M") {
      result = result.slice(-3);
    }

    if (period === "1M") {
      result = result.slice(-1);
    }

    return result;
  }, [filteredGrievances, period]);

  // --------------------------------------------------
  // CLEAR FILTERS
  // --------------------------------------------------

  const clearFilters = () => {
    setCategoryFilter("ALL");
    setDepartmentFilter("ALL");
    setStatusFilter("ALL");
    setPeriod("6M");
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <DashboardLayout
      role="admin"
      userName="Admin"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div>

          <p className="text-sm font-medium text-blue-700">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Analytics
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor grievance trends, categories and department performance.
          </p>

          {/* FILTERS */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* PERIOD */}
            <select
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="6M">
                Last 6 Months
              </option>

              <option value="3M">
                Last 3 Months
              </option>

              <option value="1M">
                Last Month
              </option>
            </select>

            {/* CATEGORY */}
            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="ALL">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* DEPARTMENT */}
            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="ALL">
                All Departments
              </option>

              {departments.map((department) => (
                <option
                  key={department}
                  value={department}
                >
                  {department}
                </option>
              ))}
            </select>

            {/* STATUS */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="ALL">
                All Statuses
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="RESOLVED">
                Resolved
              </option>
            </select>

          </div>

          {/* FILTER RESULT */}
          <div className="mt-4 flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredGrievances.length}
              </span>{" "}
              matching grievances
            </p>

            {(categoryFilter !== "ALL" ||
              departmentFilter !== "ALL" ||
              statusFilter !== "ALL" ||
              period !== "6M") && (

              <button
                onClick={clearFilters}
                className="text-sm font-medium text-blue-700 hover:text-blue-800"
              >
                Clear filters
              </button>

            )}

          </div>

        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">

          {/* TOTAL */}
          <Card>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <BarChart3 size={20} />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Total
                </p>

                <p className="text-xl font-bold text-slate-900">
                  {filteredGrievances.length}
                </p>

              </div>

            </div>

          </Card>

          {/* PENDING */}
          <Card>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock3 size={20} />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Pending
                </p>

                <p className="text-xl font-bold text-slate-900">
                  {
                    filteredGrievances.filter(
                      (item) =>
                        item.status === "PENDING"
                    ).length
                  }
                </p>

              </div>

            </div>

          </Card>

          {/* IN PROGRESS */}
          <Card>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  In Progress
                </p>

                <p className="text-xl font-bold text-slate-900">
                  {
                    filteredGrievances.filter(
                      (item) =>
                        item.status ===
                        "IN_PROGRESS"
                    ).length
                  }
                </p>

              </div>

            </div>

          </Card>

          {/* RESOLUTION RATE */}
          <Card>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Resolution Rate
                </p>

                <p className="text-xl font-bold text-emerald-600">

                  {filteredGrievances.length > 0
                    ? Math.round(
                        (filteredGrievances.filter(
                          (item) =>
                            item.status ===
                            "RESOLVED"
                        ).length /
                          filteredGrievances.length) *
                          100
                      )
                    : 0}
                  %

                </p>

              </div>

            </div>

          </Card>

        </div>

        {/* TREND + STATUS */}
        <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6 mt-6">

          {/* TREND */}
          <Card>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Grievance Trends
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Submitted vs resolved grievances over time.
              </p>

            </div>

            <div className="h-[320px] mt-6">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={dynamicMonthlyData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="month"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="submitted"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Submitted"
                  />

                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Resolved"
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </Card>

          {/* STATUS */}
          <Card>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Status Distribution
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current grievance status breakdown.
              </p>

            </div>

            <div className="h-[320px] mt-4">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={dynamicStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={95}
                    innerRadius={55}
                    paddingAngle={3}
                  >

                    {dynamicStatusData.map(
                      (entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={[
                            "#f59e0b",
                            "#4f46e5",
                            "#16a34a",
                          ][index]}
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </Card>

        </div>

        {/* CATEGORY */}
        <Card className="mt-6">

          <div>

            <h2 className="text-lg font-semibold text-slate-900">
              Grievances by Category
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Distribution of grievances across major categories.
            </p>

          </div>

          <div className="h-[340px] mt-6">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={dynamicCategoryData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  height={70}
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[5, 5, 0, 0]}
                  name="Grievances"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

        {/* DEPARTMENT */}
        <Card className="mt-6">

          <div>

            <h2 className="text-lg font-semibold text-slate-900">
              Department Performance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Assigned cases compared with resolved cases.
            </p>

          </div>

          <div className="h-[340px] mt-6">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={dynamicDepartmentData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="department"
                  angle={-20}
                  textAnchor="end"
                  height={80}
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="assigned"
                  fill="#64748b"
                  name="Assigned"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="resolved"
                  fill="#16a34a"
                  name="Resolved"
                  radius={[4, 4, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;