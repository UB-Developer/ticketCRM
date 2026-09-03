import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";
import {
  ArrowRight,
  Plane,
  ShieldCheck,
  Users,
  BarChart3,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "Group Management",
    description:
      "Manage airline, Umrah, one-way groups and travel inventory from one powerful dashboard.",
  },
  {
    icon: Users,
    title: "Agent Management",
    description:
      "Give your agents a dedicated workspace with controlled access and permissions.",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    description:
      "Track bookings, passengers, revenue and business performance in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description:
      "Role-based access keeps your CRM data protected and available only to authorized users.",
  },
];

export default function HomePage() {
  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-slate-50
        text-slate-900

        dark:bg-[#050b14]
        dark:text-white
    "
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-300px] left-[35%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      {/* Navbar */}
      <header
        className="
        relative z-10
        border-b border-slate-200
        bg-white/80
        backdrop-blur-xl

        dark:border-white/10
        dark:bg-[#050b14]/80
    "
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20">
              <Plane className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide">
                TRAVEL
              </h1>

              <p className="text-[9px] font-semibold tracking-[0.35em] text-cyan-400">
                VVIP CRM
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="
              rounded-xl px-4 py-2.5
              text-sm font-medium
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-slate-900

              dark:text-slate-300
              dark:hover:bg-white/5
              dark:hover:text-white"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Next Generation Travel Management
            </div>

            <h2 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Manage Your
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Travel Business
              </span>
              Smarter.
            </h2>

            <p className="
                mt-7 max-w-2xl
                text-lg leading-8
                text-slate-600
                dark:text-slate-400">
              A premium travel management platform built for
              agencies, administrators and agents. Manage groups,
              bookings, passengers, visas and reports from one
              powerful CRM.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:scale-[1.02]"
              >
                Create Account
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/login"
                className="
                  rounded-xl
                  border border-slate-200
                  bg-white
                  px-6 py-3.5
                  text-sm font-semibold
                  text-slate-700
                  shadow-sm
                  transition

                  hover:bg-slate-50

                  dark:border-white/10
                  dark:bg-white/[0.03]
                  dark:text-slate-200
                  dark:hover:bg-white/[0.07]"
              >
                Existing User? Sign In
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Role Based Access
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Secure CRM
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Real-time Reports
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-cyan-500/10 blur-3xl" />

            <div className="
                  relative rounded-[2rem]
                  border border-slate-200
                  bg-white/90
                  p-4
                  shadow-2xl
                  backdrop-blur-xl

                  dark:border-white/10
                  dark:bg-[#091321]/90
                  dark:shadow-black/40">
              <div className="rounded-2xl border border-white/10 bg-[#07101c] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      Overview
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Travel Dashboard
                    </h3>
                  </div>

                  <div className="rounded-lg bg-cyan-400/10 px-3 py-2 text-xs text-cyan-300">
                    Live
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    ["Total Groups", "128"],
                    ["Bookings", "2,845"],
                    ["Passengers", "8,492"],
                    ["Revenue", "$284K"],
                  ].map(([title, value]) => (
                    <div
                      key={title}
                      className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
                    >
                      <p className="text-[11px] text-slate-500">
                        {title}
                      </p>

                      <p className="mt-2 text-2xl font-bold">
                        {value}
                      </p>

                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      Monthly Performance
                    </p>

                    <p className="text-xs text-cyan-400">
                      +24.8%
                    </p>
                  </div>

                  <div className="mt-5 flex h-32 items-end gap-2">
                    {[35, 48, 42, 65, 55, 75, 62, 90, 70, 82, 78, 96].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600/30 to-cyan-400"
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              Powerful Platform
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Everything Your Travel Business Needs
            </h2>

            <p className="mt-4 text-slate-400">
              One centralized system to manage your complete
              travel operation.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-10 text-center sm:p-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Upgrade Your Travel Operations?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Create your account and start managing your travel
            business with a modern VVIP CRM.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-bold shadow-xl shadow-blue-500/20"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} Travel VVIP CRM. All
            rights reserved.
          </p>

          <p>Premium Travel Management Platform</p>
        </div>
      </footer>
    </main>
  );
}