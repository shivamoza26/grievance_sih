import {
  Building2,
  Users,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";

import { departmentData } from "../../mocks/adminAnalytics";

const Departments = () => {
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
            Departments
          </h1>

          <p className="mt-2 text-[#626A67]">
            Monitor grievance workload and resolution
            performance across departments.
          </p>

        </div>


        {/* =================================================
            DEPARTMENT CARDS
        ================================================= */}

        {departmentData.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

            {departmentData.map((department) => {

              const assigned =
                Number(department.assigned) || 0;

              const pending =
                Number(department.pending) || 0;

              const resolved =
                Number(department.resolved) || 0;

              const resolutionRate =
                assigned > 0
                  ? Math.min(
                      100,
                      Math.round(
                        (resolved / assigned) * 100
                      )
                    )
                  : 0;

              return (
                <Card
                  key={department.department}
                  className="
                    transition-all
                    duration-200
                    hover:border-[#A1C6B9]
                    hover:shadow-md
                  "
                >

                  {/* =================================================
                      DEPARTMENT HEADING
                  ================================================= */}

                  <div className="flex items-start gap-4">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-lg
                        bg-[#E4F0EB]
                        text-[#587F73]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <Building2 size={21} />
                    </div>


                    <div className="min-w-0">

                      <h2 className="font-semibold text-[#312F2C]">
                        {department.department}
                      </h2>

                      <p className="mt-1 text-xs text-[#8A9590]">
                        Government Department
                      </p>

                    </div>

                  </div>


                  {/* =================================================
                      STATISTICS
                  ================================================= */}

                  <div className="grid grid-cols-3 gap-3 mt-6">

                    {/* Assigned */}

                    <div className="rounded-lg bg-[#F4F7F5] p-3">

                      <Users
                        size={15}
                        className="text-[#587F73]"
                      />

                      <p className="mt-2 text-lg font-bold text-[#312F2C]">
                        {assigned}
                      </p>

                      <p className="text-[11px] text-[#8A9590]">
                        Assigned
                      </p>

                    </div>


                    {/* Pending */}

                    <div className="rounded-lg bg-[#F4F7F5] p-3">

                      <ClipboardList
                        size={15}
                        className="text-[#587F73]"
                      />

                      <p className="mt-2 text-lg font-bold text-[#312F2C]">
                        {pending}
                      </p>

                      <p className="text-[11px] text-[#8A9590]">
                        Pending
                      </p>

                    </div>


                    {/* Resolved */}

                    <div className="rounded-lg bg-[#E4F0EB] p-3">

                      <CheckCircle2
                        size={15}
                        className="text-[#587F73]"
                      />

                      <p className="mt-2 text-lg font-bold text-[#312F2C]">
                        {resolved}
                      </p>

                      <p className="text-[11px] text-[#8A9590]">
                        Resolved
                      </p>

                    </div>

                  </div>


                  {/* =================================================
                      RESOLUTION RATE
                  ================================================= */}

                  <div className="mt-6">

                    <div className="flex items-center justify-between">

                      <p className="text-xs font-medium text-[#626A67]">
                        Resolution Rate
                      </p>

                      <p className="text-sm font-semibold text-[#587F73]">
                        {resolutionRate}%
                      </p>

                    </div>


                    <div className="mt-2 h-2 rounded-full bg-[#EEF1EF] overflow-hidden">

                      <div
                        className="
                          h-full
                          rounded-full
                          bg-[#587F73]
                          transition-all
                          duration-500
                        "
                        style={{
                          width: `${resolutionRate}%`,
                        }}
                      />

                    </div>

                  </div>

                </Card>
              );
            })}

          </div>

        ) : (

          /* =================================================
              EMPTY STATE
          ================================================= */

          <Card className="mt-8">

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
                <Building2 size={21} />
              </div>

              <h2 className="mt-4 text-base font-semibold text-[#312F2C]">
                No departments available
              </h2>

              <p className="mt-2 text-sm text-[#7A8580]">
                Department information will appear here once
                departments are added.
              </p>

            </div>

          </Card>

        )}

      </div>
    </DashboardLayout>
  );
};

export default Departments;