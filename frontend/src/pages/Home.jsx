import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  HelpCircle,
  MapPin,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-[#312F2C]">

      {/* =====================================================
          TOP INFORMATION BAR
      ===================================================== */}

      <div className="bg-[#312F2C] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-9 flex items-center justify-between text-[11px]">

            <div className="flex items-center gap-2">
              <ShieldCheck
                size={13}
                className="text-[#ABD1C6]"
              />

              <span className="text-[#E8ECEA]">
                Citizen Public Grievance Services
              </span>
            </div>

            <div className="hidden md:flex items-center gap-5 text-[#C8D0CD]">
              <span>Accessibility</span>
              <span>Help</span>
              <span>English</span>
            </div>

          </div>
        </div>
      </div>


      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header className="bg-white border-b border-[#DDE3E0]">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="min-h-[78px] flex items-center justify-between gap-8">

            {/* BRAND */}

            <Link
              to="/"
              className="flex items-center gap-4 shrink-0"
            >

              <div className="w-11 h-11 bg-[#312F2C] !text-white flex items-center justify-center font-bold text-lg">
                G
              </div>

              <div>

                <h1 className="text-lg font-bold tracking-tight text-[#312F2C]">
                  Grievance AI
                </h1>

                <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                  Public Grievance Management Portal
                </p>

              </div>

            </Link>


            {/* NAVIGATION */}

            <nav className="hidden lg:flex items-center gap-8 text-sm">

              <a
                href="#about"
                className="text-[#5F6663] hover:text-[#312F2C] transition"
              >
                About
              </a>

              <a
                href="#services"
                className="text-[#5F6663] hover:text-[#312F2C] transition"
              >
                Services
              </a>

              <a
                href="#process"
                className="text-[#5F6663] hover:text-[#312F2C] transition"
              >
                How It Works
              </a>

              <a
                href="#help"
                className="text-[#5F6663] hover:text-[#312F2C] transition"
              >
                Help
              </a>

            </nav>


            {/* ACTIONS */}

            <div className="flex items-center gap-2">

              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 !text-[#312F2C] text-sm font-medium hover:bg-[#F3F6F4] transition"
              >
                <UserRound size={15} />
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2.5 bg-[#312F2C] !text-white text-sm font-semibold hover:bg-[#211F1D] transition"
              >
                <span className="!text-white">
                  Register
                </span>
              </Link>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <main>

        <section
          id="about"
          className="bg-[#F4F7F5] border-b border-[#DDE3E0]"
        >

          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="grid lg:grid-cols-[1fr_0.85fr] min-h-[530px]">

              {/* HERO TEXT */}

              <div className="flex items-center py-16 lg:py-20 lg:pr-16">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-[2px] bg-[#312F2C]" />

                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#312F2C]">
                      Citizen Services
                    </p>

                  </div>


                  <h2 className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-[58px] leading-[1.08] font-bold tracking-tight text-[#312F2C]">

                    Your voice.
                    <br />

                    <span className="text-[#587F73]">
                      Your grievance.
                    </span>

                    <br />

                    Your resolution.

                  </h2>


                  <p className="mt-6 max-w-xl text-base lg:text-lg leading-8 text-[#626A67]">

                    Submit public grievances online, connect them
                    with the appropriate department and track
                    their progress through a transparent resolution
                    process.

                  </p>


                  {/* BUTTONS */}

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">

                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#312F2C] !text-white text-sm font-semibold hover:bg-[#211F1D] transition"
                    >

                      <span className="!text-white">
                        Submit a Grievance
                      </span>

                      <ArrowRight
                        size={16}
                        className="!text-white"
                      />

                    </Link>


                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#AEB9B4] bg-white !text-[#312F2C] text-sm font-semibold hover:bg-[#EDF2EF] transition"
                    >

                      <Search size={16} />

                      <span className="!text-[#312F2C]">
                        Track Grievance
                      </span>

                    </Link>

                  </div>


                  {/* TRUST INFORMATION */}

                  <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#69736F]">

                    <span className="flex items-center gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-[#587F73]"
                      />
                      Easy submission
                    </span>

                    <span className="flex items-center gap-2">
                      <ShieldCheck
                        size={14}
                        className="text-[#587F73]"
                      />
                      Secure service
                    </span>

                    <span className="flex items-center gap-2">
                      <Search
                        size={14}
                        className="text-[#587F73]"
                      />
                      Transparent tracking
                    </span>

                  </div>

                </div>

              </div>


              {/* HERO VISUAL */}

              <div className="hidden lg:flex items-end">

                <div className="w-full h-[410px] bg-[#ABD1C6] relative overflow-hidden">

                  {/* Decorative blocks */}

                  <div className="absolute inset-0">

                    <div className="absolute top-0 right-0 w-[55%] h-[65%] bg-[#A1C6B9]" />

                    <div className="absolute bottom-0 left-0 w-[70%] h-[42%] bg-[#8FB8AA]" />

                    <div className="absolute bottom-0 right-0 w-[28%] h-[28%] bg-[#312F2C]" />

                  </div>


                  {/* Information panel */}

                  <div className="absolute left-8 top-10 w-[72%] bg-white shadow-lg">

                    <div className="px-5 py-4 border-b border-[#E0E5E2]">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
                            Grievance Status
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#312F2C]">
                            GRV-1049
                          </p>

                        </div>

                        <span className="px-2.5 py-1 bg-[#E4F0EB] !text-[#4D7468] text-[11px] font-semibold">
                          In Progress
                        </span>

                      </div>

                    </div>


                    <div className="p-5">

                      <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400 font-semibold">
                        Complaint
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-[#312F2C]">
                        Damaged road infrastructure
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">

                        <MapPin size={13} />

                        Mumbai, Maharashtra

                      </div>


                      <div className="mt-5 border-t border-[#E5E8E6] pt-5">

                        <div className="space-y-4">

                          {[
                            "Grievance submitted",
                            "Complaint analyzed",
                            "Department assigned",
                            "Officer reviewing",
                          ].map((stage, index) => (

                            <div
                              key={stage}
                              className="flex items-center gap-3"
                            >

                              <div
                                className={`
                                  w-7
                                  h-7
                                  rounded-full
                                  flex
                                  items-center
                                  justify-center
                                  shrink-0
                                  ${
                                    index < 3
                                      ? "bg-[#312F2C] !text-white"
                                      : "border-2 border-[#587F73] !text-[#587F73]"
                                  }
                                `}
                              >

                                {index < 3 ? (
                                  <CheckCircle2
                                    size={13}
                                    className="!text-white"
                                  />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-current" />
                                )}

                              </div>

                              <div>

                                <p className="text-xs font-semibold text-[#312F2C]">
                                  {stage}
                                </p>

                                <p className="text-[10px] text-slate-400">
                                  {index < 3
                                    ? "Completed"
                                    : "Current stage"}
                                </p>

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* Bottom label */}

                  <div className="absolute bottom-5 right-5 bg-[#312F2C] px-4 py-3">

                    <p className="text-[9px] uppercase tracking-[0.14em] text-[#ABD1C6]">
                      Public Service
                    </p>

                    <p className="mt-1 text-xs font-semibold !text-white">
                      Transparent grievance resolution
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK SERVICES
        ===================================================== */}

        <section className="bg-white border-b border-[#DDE3E0]">

          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="grid md:grid-cols-3">

              <Link
                to="/register"
                className="group p-7 border-b md:border-b-0 md:border-r border-[#DDE3E0] hover:bg-[#F4F7F5] transition"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center">
                      <FileText size={19} />
                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        SERVICE 01
                      </p>

                      <h3 className="mt-1 text-sm font-bold">
                        Submit a Grievance
                      </h3>

                    </div>

                  </div>

                  <ChevronRight
                    size={18}
                    className="text-[#587F73] group-hover:translate-x-1 transition"
                  />

                </div>

              </Link>


              <Link
                to="/login"
                className="group p-7 border-b md:border-b-0 md:border-r border-[#DDE3E0] hover:bg-[#F4F7F5] transition"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center">
                      <Search size={19} />
                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        SERVICE 02
                      </p>

                      <h3 className="mt-1 text-sm font-bold">
                        Track a Grievance
                      </h3>

                    </div>

                  </div>

                  <ChevronRight
                    size={18}
                    className="text-[#587F73] group-hover:translate-x-1 transition"
                  />

                </div>

              </Link>


              <a
                href="#help"
                className="group p-7 hover:bg-[#F4F7F5] transition"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center">
                      <HelpCircle size={19} />
                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        SERVICE 03
                      </p>

                      <h3 className="mt-1 text-sm font-bold">
                        Help & Support
                      </h3>

                    </div>

                  </div>

                  <ChevronRight
                    size={18}
                    className="text-[#587F73] group-hover:translate-x-1 transition"
                  />

                </div>

              </a>

            </div>

          </div>

        </section>


        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <section className="bg-[#312F2C] !text-white">

          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="grid grid-cols-2 lg:grid-cols-4">

              {[
                ["12,480+", "Grievances received"],
                ["8,920+", "Grievances resolved"],
                ["30+", "Service departments"],
                ["91%", "Resolution rate"],
              ].map(([value, label], index) => (

                <div
                  key={label}
                  className={`
                    py-9 px-6
                    ${
                      index !== 0
                        ? "border-l border-[#4A4744]"
                        : ""
                    }
                  `}
                >

                  <p className="text-3xl font-bold text-[#ABD1C6]">
                    {value}
                  </p>

                  <p className="mt-1 text-xs !text-[#C9CFCC]">
                    {label}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section
          id="process"
          className="bg-white border-b border-[#DDE3E0]"
        >

          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

            <div className="max-w-2xl">

              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#587F73]">
                Grievance Process
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#312F2C]">
                How your grievance is handled
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                A clear process ensures that every grievance can
                be followed from submission to resolution.
              </p>

            </div>


            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 border border-[#DDE3E0]">

              {[
                {
                  number: "01",
                  title: "Submit",
                  text: "Describe your issue, provide its location and attach supporting evidence.",
                },
                {
                  number: "02",
                  title: "Analyze",
                  text: "The grievance is reviewed and categorized for appropriate handling.",
                },
                {
                  number: "03",
                  title: "Assign",
                  text: "The complaint is routed to the concerned department and officer.",
                },
                {
                  number: "04",
                  title: "Resolve",
                  text: "The responsible officer takes action and updates the grievance.",
                },
              ].map((item, index) => (

                <div
                  key={item.number}
                  className={`
                    p-7
                    ${
                      index !== 0
                        ? "border-t md:border-t-0 md:border-l border-[#DDE3E0]"
                        : ""
                    }
                  `}
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold text-[#587F73]">
                      {item.number}
                    </span>

                    {index !== 3 && (
                      <ChevronRight
                        size={17}
                        className="hidden lg:block text-[#A1C6B9]"
                      />
                    )}

                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#312F2C]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* =====================================================
            SERVICES
        ===================================================== */}

        <section
          id="services"
          className="bg-[#F4F7F5] border-b border-[#DDE3E0]"
        >

          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

            <div className="max-w-2xl">

              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#587F73]">
                Platform Services
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#312F2C]">
                Making grievance management easier
              </h2>

            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

              {[
                {
                  icon: FileText,
                  title: "Online Submission",
                  text: "Submit grievances digitally with the information and evidence required for processing.",
                },
                {
                  icon: Search,
                  title: "Status Tracking",
                  text: "Follow the progress of your grievance without repeatedly visiting an office.",
                },
                {
                  icon: MapPin,
                  title: "Department Routing",
                  text: "Help ensure grievances reach the department responsible for the issue.",
                },
                {
                  icon: UserRound,
                  title: "Officer Assignment",
                  text: "Enable responsible officers to review and manage assigned grievances.",
                },
                {
                  icon: ShieldCheck,
                  title: "Transparent Updates",
                  text: "Keep citizens informed about important changes in grievance status.",
                },
                {
                  icon: CheckCircle2,
                  title: "Resolution Records",
                  text: "Maintain a clear history from initial complaint through final resolution.",
                },
              ].map((service) => {

                const Icon = service.icon;

                return (
                  <div
                    key={service.title}
                    className="bg-white border border-[#DDE3E0] p-6 hover:border-[#A1C6B9] transition"
                  >

                    <div className="w-10 h-10 bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-5 font-bold text-[#312F2C]">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {service.text}
                    </p>

                  </div>
                );

              })}

            </div>

          </div>

        </section>


        {/* =====================================================
            HELP / CTA
        ===================================================== */}

        <section
          id="help"
          className="bg-[#A1C6B9]"
        >

          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#312F2C]">
                  Citizen Assistance
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#312F2C]">
                  Have a public issue to report?
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-[#4E5D58]">
                  Register on the platform to submit your grievance
                  and follow its progress online.
                </p>

              </div>


              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#312F2C] !text-white text-sm font-semibold hover:bg-[#211F1D] transition shrink-0"
              >

                <span className="!text-white">
                  Register as Citizen
                </span>

                <ArrowRight
                  size={16}
                  className="!text-white"
                />

              </Link>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#312F2C] !text-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="py-12 grid md:grid-cols-3 gap-10">

            {/* BRAND */}

            <div>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 bg-[#ABD1C6] text-[#312F2C] flex items-center justify-center font-bold">
                  G
                </div>

                <div>

                  <p className="font-bold !text-white">
                    Grievance AI
                  </p>

                  <p className="text-[10px] uppercase tracking-wider text-[#A1C6B9]">
                    Public Grievance Management Portal
                  </p>

                </div>

              </div>

              <p className="mt-4 max-w-sm text-xs leading-6 !text-[#B9C0BD]">
                A digital platform for submitting, tracking and
                managing public grievances through a transparent
                resolution process.
              </p>

            </div>


            {/* QUICK LINKS */}

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-[#ABD1C6]">
                Quick Links
              </p>

              <div className="mt-4 space-y-3 text-sm">

                <a
                  href="#about"
                  className="block !text-[#C8CFCC] hover:!text-white transition"
                >
                  About
                </a>

                <a
                  href="#services"
                  className="block !text-[#C8CFCC] hover:!text-white transition"
                >
                  Services
                </a>

                <a
                  href="#process"
                  className="block !text-[#C8CFCC] hover:!text-white transition"
                >
                  How It Works
                </a>

                <a
                  href="#help"
                  className="block !text-[#C8CFCC] hover:!text-white transition"
                >
                  Help
                </a>

              </div>

            </div>


            {/* ACCOUNT */}

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-[#ABD1C6]">
                Account
              </p>

              <div className="mt-4 space-y-3 text-sm">

                <Link
                  to="/login"
                  className="block !text-[#C8CFCC] hover:!text-white transition"
                >
                  Citizen Login
                </Link>

                <Link
                  to="/register"
                  className="block !text-[#C8CFCC] hover:!text-white transition"
                >
                  Citizen Registration
                </Link>

              </div>

            </div>

          </div>


          {/* COPYRIGHT */}

          <div className="py-5 border-t border-[#4A4744] flex flex-col sm:flex-row justify-between gap-2 text-[11px]">

            <p className="!text-[#939C98]">
              © 2026 Grievance AI. All rights reserved.
            </p>

            <p className="!text-[#939C98]">
              Digital Public Service Platform
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;