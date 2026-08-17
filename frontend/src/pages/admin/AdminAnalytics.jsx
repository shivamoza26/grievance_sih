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
  // COLOUR PALETTE
  // --------------------------------------------------

  const COLORS = {
    charcoal: "#312F2C",
    jade: "#587F73",
    lightJade: "#ABD1C6",
    softJade: "#F0F6F3",
    border: "#C8D2CE",
    muted: "#7A8580",
    light: "#EEF1EF",

    pending: "#B58A45",
    resolved: "#587F73",
    inProgress: "#6B857C",
  };

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

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div>

          <p className="text-sm font-medium text-[#587F73]">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#312F2C]">
            Analytics
          </h1>

          <p className="mt-2 text-[#626A67]">
            Monitor grievance trends, categories and department performance.
          </p>


          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* PERIOD */}

            <select
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value)
              }
              className="
                rounded-lg
                border
                border-[#C8D2CE]
                bg-white
                px-3
                py-2.5
                text-sm
                text-[#626A67]
                outline-none
                transition
                focus:border-[#587F73]
                focus:ring-2
                focus:ring-[#ABD1C6]/50
              "
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
              className="
                rounded-lg
                border
                border-[#C8D2CE]
                bg-white
                px-3
                py-2.5
                text-sm
                text-[#626A67]
                outline-none
                transition
                focus:border-[#587F73]
                focus:ring-2
                focus:ring-[#ABD1C6]/50
              "
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
              className="
                rounded-lg
                border
                border-[#C8D2CE]
                bg-white
                px-3
                py-2.5
                text-sm
                text-[#626A67]
                outline-none
                transition
                focus:border-[#587F73]
                focus:ring-2
                focus:ring-[#ABD1C6]/50
              "
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
              className="
                rounded-lg
                border
                border-[#C8D2CE]
                bg-white
                px-3
                py-2.5
                text-sm
                text-[#626A67]
                outline-none
                transition
                focus:border-[#587F73]
                focus:ring-2
                focus:ring-[#ABD1C6]/50
              "
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

            <p className="text-sm text-[#7A8580]">

              Showing{" "}

              <span className="font-semibold text-[#312F2C]">
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
                className="
                  text-sm
                  font-medium
                  !text-[#587F73]
                  hover:!text-[#4B6D63]
                  transition
                "
              >
                Clear filters
              </button>

            )}

          </div>

        </div>


        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">

          {/* TOTAL */}

          <Card>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-[#E4F0EB]
                  text-[#587F73]
                  flex
                  items-center
                  justify-center
                "
              >
                <BarChart3 size={20} />
              </div>

              <div>

                <p className="text-xs text-[#8A9590]">
                  Total
                </p>

                <p className="text-xl font-bold text-[#312F2C]">
                  {filteredGrievances.length}
                </p>

              </div>

            </div>

          </Card>


          {/* PENDING */}

          <Card>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-[#F8F1E5]
                  text-[#9A7435]
                  flex
                  items-center
                  justify-center
                "
              >
                <Clock3 size={20} />
              </div>

              <div>

                <p className="text-xs text-[#8A9590]">
                  Pending
                </p>

                <p className="text-xl font-bold text-[#312F2C]">
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

              <div
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-[#F0F6F3]
                  text-[#587F73]
                  flex
                  items-center
                  justify-center
                "
              >
                <TrendingUp size={20} />
              </div>

              <div>

                <p className="text-xs text-[#8A9590]">
                  In Progress
                </p>

                <p className="text-xl font-bold text-[#312F2C]">
                  {
                    filteredGrievances.filter(
                      (item) =>
                        item.status === "IN_PROGRESS"
                    ).length
                  }
                </p>

              </div>

            </div>

          </Card>


          {/* RESOLUTION RATE */}

          <Card>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-[#E4F0EB]
                  text-[#587F73]
                  flex
                  items-center
                  justify-center
                "
              >
                <CheckCircle2 size={20} />
              </div>

              <div>

                <p className="text-xs text-[#8A9590]">
                  Resolution Rate
                </p>

                <p className="text-xl font-bold text-[#587F73]">

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


        {/* =====================================================
            TREND + STATUS
        ===================================================== */}

        <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6 mt-6">


          {/* TREND */}

          <Card>

            <div>

              <h2 className="text-lg font-semibold text-[#312F2C]">
                Grievance Trends
              </h2>

              <p className="mt-1 text-sm text-[#7A8580]">
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
                    stroke="#E3E9E6"
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#8A9590"
                  />

                  <YAxis
                    stroke="#8A9590"
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #C8D2CE",
                      borderRadius: "8px",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="submitted"
                    stroke={COLORS.charcoal}
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: COLORS.charcoal,
                    }}
                    name="Submitted"
                  />

                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke={COLORS.jade}
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: COLORS.jade,
                    }}
                    name="Resolved"
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </Card>


          {/* STATUS */}

          <Card>

            <div>

              <h2 className="text-lg font-semibold text-[#312F2C]">
                Status Distribution
              </h2>

              <p className="mt-1 text-sm text-[#7A8580]">
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
                            COLORS.pending,
                            COLORS.inProgress,
                            COLORS.resolved,
                          ][index]}
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #C8D2CE",
                      borderRadius: "8px",
                    }}
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </Card>

        </div>


        {/* =====================================================
            CATEGORY
        ===================================================== */}

        <Card className="mt-6">

          <div>

            <h2 className="text-lg font-semibold text-[#312F2C]">
              Grievances by Category
            </h2>

            <p className="mt-1 text-sm text-[#7A8580]">
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
                  stroke="#E3E9E6"
                />

                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  height={70}
                  stroke="#8A9590"
                />

                <YAxis
                  stroke="#8A9590"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #C8D2CE",
                    borderRadius: "8px",
                  }}
                />

                <Bar
                  dataKey="value"
                  fill={COLORS.jade}
                  radius={[5, 5, 0, 0]}
                  name="Grievances"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>


        {/* =====================================================
            DEPARTMENT
        ===================================================== */}

        <Card className="mt-6">

          <div>

            <h2 className="text-lg font-semibold text-[#312F2C]">
              Department Performance
            </h2>

            <p className="mt-1 text-sm text-[#7A8580]">
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
                  stroke="#E3E9E6"
                />

                <XAxis
                  dataKey="department"
                  angle={-20}
                  textAnchor="end"
                  height={80}
                  stroke="#8A9590"
                />

                <YAxis
                  stroke="#8A9590"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #C8D2CE",
                    borderRadius: "8px",
                  }}
                />

                <Legend />

                <Bar
                  dataKey="assigned"
                  fill="#8A9590"
                  name="Assigned"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="resolved"
                  fill={COLORS.jade}
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