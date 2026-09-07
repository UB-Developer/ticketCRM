"use client";

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
    description: "Manage airline, Umrah, one-way groups and travel inventory from one powerful dashboard.",
  },
  {
    icon: Users,
    title: "Agent Management",
    description: "Give your agents a dedicated workspace with controlled access and permissions.",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    description: "Track bookings, passengers, revenue and business performance in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description: "Role-based access keeps your CRM data protected and available only to authorized users.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#050b14] dark:text-white transition-colors duration-300">
      
      {/* Background Glows - Fixed for both themes */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px]" />
        <div className="absolute right-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-[-300px] left-[35%] h-[600px] w-[600px] rounded-full bg-purple-600/10 dark:bg-purple-600/5 blur-[150px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#050b14]/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">TRAVEL</h1>
              <p className="text-[9px] font-semibold tracking-[0.35em] text-cyan-500 dark:text-cyan-400">VVIP CRM</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">
              Sign In
            </Link>
            <Link href="/register" className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]">
              Get Started
            </Link>
            <Link href="/search" aria-label="Book a flight now" className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]">
              Book Flight Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 dark:bg-cyan-400/5 px-4 py-2 text-xs font-bold text-cyan-600 dark:text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Next Generation Travel Management
            </div>

            <h2 className="max-w-3xl text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Manage Your
              <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Travel Business
              </span>
              Smarter.
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              A premium travel management platform built for agencies and agents. Manage groups, bookings, and reports from one powerful CRM.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/register" className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/30 transition hover:scale-[1.02]">
                Create Account <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link href="/login" className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:bg-white/[0.07]">
                Existing User? Sign In
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              {["Role Based Access", "Secure CRM", "Real-time Reports"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-500" /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview - Styled for both modes */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-cyan-500/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#091321]/90">
              <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#07101c] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Overview</p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Travel Dashboard</h3>
                  </div>
                  <div className="rounded-lg bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-600 dark:text-cyan-300">Live</div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[["Groups", "128"], ["Bookings", "2,845"], ["Passengers", "8,492"], ["Revenue", "$284K"]].map(([title, value]) => (
                    <div key={title} className="rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] p-4">
                      <p className="text-[11px] text-slate-500">{title}</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/5">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 border-t border-slate-200 dark:border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500 dark:text-cyan-400">Powerful Platform</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-slate-900 dark:text-white">Everything Your Travel Business Needs</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">One centralized system to manage your complete travel operation.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl dark:hover:bg-white/[0.04]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-cyan-400/20 dark:bg-gradient-to-br dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-purple-500/10 p-10 text-center shadow-xl dark:shadow-none sm:p-16">
          <h2 className="text-3xl font-bold sm:text-4xl text-slate-900 dark:text-white">Ready to Upgrade Your Travel Operations?</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">Create your account and start managing your business with a modern VVIP CRM.</p>
          <Link href="/search" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/30 transition hover:scale-[1.02]">
            Book Flight Now <Plane className="h-4 w-4" />
          </Link>
          <Link href="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/30">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Travel VVIP CRM. All rights reserved.</p>
          <p className="font-medium text-slate-400">Premium Travel Management Platform</p>
        </div>
      </footer>
    </main>
  );
}