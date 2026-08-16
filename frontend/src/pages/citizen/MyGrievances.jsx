import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  MapPin,
  CalendarDays,
  Plus,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";

import { mockGrievances } from "../../mocks/grievances";

const MyGrievances = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const categories = [
    ...new Set(mockGrievances.map((item) => item.category)),
  ];

  const filteredGrievances = useMemo(() => {
    return mockGrievances.filter((grievance) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        grievance.id.toLowerCase().includes(searchValue) ||
        grievance.title.toLowerCase().includes(searchValue) ||
        grievance.description.toLowerCase().includes(searchValue) ||
        grievance.department.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        grievance.status === statusFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        grievance.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [search, statusFilter, categoryFilter]);

  return (
    <DashboardLayout
      role="citizen"
      userName="Bhagyashri"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

          <div>
            <p className="text-sm font-medium text-blue-700">
              Citizen Portal
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              My Grievances
            </h1>

            <p className="mt-2 text-slate-500">
              View and track all the grievances you've submitted.
            </p>
          </div>

          <Link to="/citizen/submit">
            <Button size="md">
              <Plus size={17} className="mr-2" />
              New Grievance
            </Button>
          </Link>

        </div>

        {/* Filters */}
        <Card className="mt-8">

          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal
              size={17}
              className="text-slate-500"
            />

            <h2 className="text-sm font-semibold text-slate-800">
              Find a grievance
            </h2>
          </div>

          <div className="grid md:grid-cols-[1fr_180px_180px] gap-3">

            {/* Search */}
            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by ID, title or department..."
                className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="ALL">
                All statuses
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

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="ALL">
                All categories
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

          </div>

        </Card>

        {/* Results */}
        <div className="mt-6">

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-800">
                {filteredGrievances.length}
              </span>{" "}
              {filteredGrievances.length === 1
                ? "grievance"
                : "grievances"}
            </p>
          </div>

          {filteredGrievances.length > 0 ? (
            <div className="space-y-3">

              {filteredGrievances.map((grievance) => (
                <Link
                  key={grievance.id}
                  to={`/citizen/grievances/${grievance.id}`}
                  className="block"
                >
                  <Card className="hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer">

                    <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                      {/* Main */}
                      <div className="flex-1 min-w-0">

                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs font-semibold text-slate-400">
                            {grievance.id}
                          </span>

                          <StatusBadge
                            status={grievance.status}
                          />

                          {grievance.priority === "HIGH" && (
                            <span className="text-xs font-medium text-red-600">
                              High priority
                            </span>
                          )}
                        </div>

                        <h3 className="mt-2 text-base font-semibold text-slate-900">
                          {grievance.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                          {grievance.description}
                        </p>

                      </div>

                      {/* Metadata */}
                      <div className="grid grid-cols-2 lg:flex lg:items-center gap-5 text-sm">

                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <MapPin size={13} />
                            Location
                          </div>

                          <p className="mt-1 text-slate-700">
                            {grievance.location}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <CalendarDays size={13} />
                            Submitted
                          </div>

                          <p className="mt-1 text-slate-700">
                            {grievance.submittedAt}
                          </p>
                        </div>

                        <ArrowRight
                          size={19}
                          className="hidden lg:block text-slate-300"
                        />

                      </div>

                    </div>

                  </Card>
                </Link>
              ))}

            </div>
          ) : (
            <Card>

              <div className="py-12 text-center">

                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Search size={21} />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No grievances found
                </h3>

                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                  Try changing your search or filters to find what you're looking for.
                </p>

              </div>

            </Card>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default MyGrievances;