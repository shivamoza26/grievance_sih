import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  MapPin,
  CalendarDays,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";

import { officerGrievances } from "../../mocks/officerGrievances";

const AdminGrievances = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    ...new Set(
      officerGrievances.map((item) => item.category)
    ),
  ];

  // =====================================================
  // FILTER GRIEVANCES
  // =====================================================

  const filteredGrievances = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return officerGrievances.filter((grievance) => {
      const matchesSearch =
        grievance.id
          ?.toLowerCase()
          .includes(searchValue) ||
        grievance.title
          ?.toLowerCase()
          .includes(searchValue) ||
        grievance.citizen
          ?.toLowerCase()
          .includes(searchValue) ||
        grievance.department
          ?.toLowerCase()
          .includes(searchValue) ||
        grievance.location
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        grievance.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        grievance.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        grievance.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [
    search,
    statusFilter,
    priorityFilter,
    categoryFilter,
  ]);

  return (
    <DashboardLayout
      role="admin"
      userName="Admin"
    >
      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>

          <p className="text-sm font-medium text-[#587F73]">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#312F2C]">
            All Grievances
          </h1>

          <p className="mt-2 text-[#626A67]">
            View and manage grievances submitted across the
            system.
          </p>

        </div>


        {/* =================================================
            FILTER CARD
        ================================================= */}

        <Card className="mt-8">

          <div className="flex items-center gap-2 mb-4">

            <SlidersHorizontal
              size={17}
              className="text-[#587F73]"
            />

            <h2 className="text-sm font-semibold text-[#312F2C]">
              Search & Filter
            </h2>

          </div>


          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-[1fr_160px_160px_180px]
              gap-3
            "
          >

            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="relative">

              <Search
                size={18}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#8A9590]
                "
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search grievance, citizen, location or department..."
                className="
                  w-full
                  rounded-lg
                  border
                  border-[#C8D2CE]
                  bg-white
                  pl-10
                  pr-4
                  py-2.5
                  text-sm
                  text-[#312F2C]
                  placeholder:text-[#9AA39F]
                  outline-none
                  transition
                  focus:border-[#587F73]
                  focus:ring-2
                  focus:ring-[#ABD1C6]/50
                "
              />

            </div>


            {/* =================================================
                STATUS
            ================================================= */}

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
                focus:border-[#587F73]
                focus:ring-2
                focus:ring-[#ABD1C6]/50
              "
            >

              <option value="ALL">
                All Status
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

              <option value="REJECTED">
                Rejected
              </option>

              <option value="CLOSED">
                Closed
              </option>

            </select>


            {/* =================================================
                PRIORITY
            ================================================= */}

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
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
                focus:border-[#587F73]
                focus:ring-2
                focus:ring-[#ABD1C6]/50
              "
            >

              <option value="ALL">
                All Priority
              </option>

              <option value="HIGH">
                High
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="LOW">
                Low
              </option>

            </select>


            {/* =================================================
                CATEGORY
            ================================================= */}

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

          </div>

        </Card>


        {/* =================================================
            RESULTS
        ================================================= */}

        <div className="mt-6">

          <div className="flex items-center justify-between mb-4">

            <p className="text-sm text-[#7A8580]">

              Showing{" "}

              <span className="font-semibold text-[#312F2C]">
                {filteredGrievances.length}
              </span>{" "}

              {filteredGrievances.length === 1
                ? "grievance"
                : "grievances"}

            </p>

          </div>


          {/* =================================================
              GRIEVANCE LIST
          ================================================= */}

          {filteredGrievances.length > 0 ? (

            <div className="space-y-3">

              {filteredGrievances.map((grievance) => (

                /*
                 * IMPORTANT:
                 * Admin grievance now goes to the ADMIN
                 * grievance details route.
                 */
                <Link
                  key={grievance.id}
                  to={`/admin/grievances/${grievance.id}`}
                  className="block"
                >

                  <Card
                    className="
                      hover:border-[#A1C6B9]
                      hover:shadow-md
                      transition-all
                      duration-200
                      cursor-pointer
                    "
                  >

                    <div
                      className="
                        flex
                        flex-col
                        xl:flex-row
                        xl:items-center
                        gap-5
                      "
                    >

                      {/* =================================================
                          MAIN INFORMATION
                      ================================================= */}

                      <div className="flex-1 min-w-0">

                        <div className="flex items-center gap-3 flex-wrap">

                          <span
                            className="
                              text-xs
                              font-semibold
                              text-[#8A9590]
                            "
                          >
                            {grievance.id}
                          </span>

                          <PriorityBadge
                            priority={grievance.priority}
                          />

                          <StatusBadge
                            status={grievance.status}
                          />

                        </div>


                        <h3
                          className="
                            mt-2
                            text-base
                            font-semibold
                            text-[#312F2C]
                          "
                        >
                          {grievance.title}
                        </h3>


                        <p
                          className="
                            mt-1
                            text-sm
                            text-[#7A8580]
                            line-clamp-2
                          "
                        >
                          {grievance.aiSummary ||
                            grievance.description ||
                            "No description available."}
                        </p>

                      </div>


                      {/* =================================================
                          METADATA
                      ================================================= */}

                      <div
                        className="
                          grid
                          grid-cols-2
                          md:grid-cols-3
                          xl:flex
                          xl:items-center
                          gap-5
                          text-sm
                        "
                      >

                        {/* CITIZEN */}

                        <div>

                          <p className="text-xs text-[#8A9590]">
                            Citizen
                          </p>

                          <p className="mt-1 text-[#626A67]">
                            {grievance.citizen || "—"}
                          </p>

                        </div>


                        {/* LOCATION */}

                        <div>

                          <div
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-[#8A9590]
                            "
                          >

                            <MapPin size={13} />

                            Location

                          </div>

                          <p className="mt-1 text-[#626A67]">
                            {grievance.location || "—"}
                          </p>

                        </div>


                        {/* SUBMITTED */}

                        <div>

                          <div
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-[#8A9590]
                            "
                          >

                            <CalendarDays size={13} />

                            Submitted

                          </div>

                          <p className="mt-1 text-[#626A67]">
                            {grievance.submittedAt || "—"}
                          </p>

                        </div>


                        {/* ARROW */}

                        <ArrowRight
                          size={19}
                          className="
                            hidden
                            xl:block
                            text-[#8A9590]
                          "
                        />

                      </div>

                    </div>

                  </Card>

                </Link>

              ))}

            </div>

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <Card>

              <div className="py-12 text-center">

                <div
                  className="
                    mx-auto
                    w-12
                    h-12
                    rounded-full
                    bg-[#EEF1EF]
                    text-[#7A8580]
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Search size={21} />

                </div>


                <h3
                  className="
                    mt-4
                    font-semibold
                    text-[#312F2C]
                  "
                >
                  No grievances found
                </h3>


                <p
                  className="
                    mt-2
                    text-sm
                    text-[#7A8580]
                    max-w-sm
                    mx-auto
                  "
                >
                  Try changing your search or filters to
                  find what you're looking for.
                </p>

              </div>

            </Card>

          )}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default AdminGrievances;