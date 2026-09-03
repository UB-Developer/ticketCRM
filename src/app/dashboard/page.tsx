"use client";

import { useState } from "react";
import {
    CalendarDays,
    Plane,
    Users,
    Ticket,
    Wallet,
    TrendingUp,
    Clock3,
    ArrowUpRight,
} from "lucide-react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { AuthUser } from "@/types/auth";

export default function DashboardPage() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const user: AuthUser = {
        id: 1,
        name: "Muhammad Umar",
        email: "admin@example.com",
        role: "admin",
    };

    const stats = [
        {
            title: "Total Bookings",
            value: "1,248",
            change: "+12.5%",
            icon: Ticket,
        },
        {
            title: "Total Passengers",
            value: "3,842",
            change: "+8.2%",
            icon: Users,
        },
        {
            title: "Active Groups",
            value: "28",
            change: "+4.6%",
            icon: Plane,
        },
        {
            title: "Total Revenue",
            value: "₨ 8.42M",
            change: "+18.4%",
            icon: Wallet,
        },
    ];

    const recentBookings = [
        {
            id: "#BK-10245",
            passenger: "Ahmed Raza",
            package: "Premium Umrah",
            amount: "₨ 385,000",
            status: "Confirmed",
        },
        {
            id: "#BK-10244",
            passenger: "Muhammad Ali",
            package: "Dubai Package",
            amount: "₨ 245,000",
            status: "Pending",
        },
        {
            id: "#BK-10243",
            passenger: "Usman Khan",
            package: "Turkey Package",
            amount: "₨ 420,000",
            status: "Confirmed",
        },
        {
            id: "#BK-10242",
            passenger: "Bilal Ahmed",
            package: "One Way Ticket",
            amount: "₨ 95,000",
            status: "Processing",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-[#020817]">

            {/* Sidebar */}
            <DashboardSidebar
                user={user}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* Main Area */}
            <div className="lg:ml-[280px]">

                {/* Header */}
                <DashboardHeader
                    user={user}
                    setMobileOpen={setMobileOpen}
                />

                {/* Content */}
                <main className="p-4 sm:p-6 lg:p-8">

                    {/* Page Heading */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="mb-1 text-sm text-slate-500 dark:text-slate-500">
                                Overview
                            </p>

                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Dashboard
                            </h1>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Manage your travel business from one place.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
                        >
                            <CalendarDays className="h-4 w-4" />
                            View Reports
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03]"
                                >
                                    <div className="flex items-start justify-between">

                                        <div>
                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                                {stat.title}
                                            </p>

                                            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                                {stat.value}
                                            </h3>
                                        </div>

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 text-cyan-500">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <span className="flex items-center text-xs font-semibold text-emerald-500">
                                            <TrendingUp className="mr-1 h-3.5 w-3.5" />
                                            {stat.change}
                                        </span>

                                        <span className="text-xs text-slate-400">
                                            vs last month
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    {/* Middle Section */}
                    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

                        {/* Revenue Card */}
                        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">

                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Revenue Overview
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Monthly revenue performance
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-300"
                                >
                                    This Year
                                </button>
                            </div>

                            {/* Fake Chart */}
                            <div className="mt-8 flex h-[260px] items-end gap-3 sm:gap-5">

                                {[42, 58, 48, 72, 63, 82, 68, 90, 76, 96, 84, 100].map(
                                    (height, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-1 flex-col items-center gap-2"
                                        >
                                            <div className="flex h-[210px] w-full items-end">
                                                <div
                                                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-400 transition-all hover:opacity-80"
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                />
                                            </div>

                                            <span className="text-[10px] text-slate-400">
                                                {
                                                    [
                                                        "Jan",
                                                        "Feb",
                                                        "Mar",
                                                        "Apr",
                                                        "May",
                                                        "Jun",
                                                        "Jul",
                                                        "Aug",
                                                        "Sep",
                                                        "Oct",
                                                        "Nov",
                                                        "Dec",
                                                    ][index]
                                                }
                                            </span>
                                        </div>
                                    )
                                )}

                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">

                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Quick Actions
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Frequently used actions
                            </p>

                            <div className="mt-6 space-y-3">

                                {[
                                    {
                                        title: "Create Booking",
                                        icon: Ticket,
                                    },
                                    {
                                        title: "Add Passenger",
                                        icon: Users,
                                    },
                                    {
                                        title: "Create Travel Group",
                                        icon: Plane,
                                    },
                                    {
                                        title: "View Reports",
                                        icon: TrendingUp,
                                    },
                                ].map((action) => {
                                    const Icon = action.icon;

                                    return (
                                        <button
                                            key={action.title}
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-cyan-400 hover:bg-cyan-50 dark:border-white/10 dark:hover:bg-cyan-500/5"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                                                {action.title}
                                            </span>

                                            <ArrowUpRight className="h-4 w-4 text-slate-400" />
                                        </button>
                                    );
                                })}

                            </div>
                        </div>

                    </div>

                    {/* Recent Bookings */}
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">

                        <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Recent Bookings
                                </h2>

                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Latest booking activity
                                </p>
                            </div>

                            <button
                                type="button"
                                className="text-sm font-semibold text-cyan-500 hover:text-cyan-400"
                            >
                                View All
                            </button>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[700px]">

                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-white/10">
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Booking
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Passenger
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Package
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {recentBookings.map((booking) => (
                                        <tr
                                            key={booking.id}
                                            className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-semibold text-cyan-500">
                                                    {booking.id}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                    {booking.passenger}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    {booking.package}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                    {booking.amount}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        booking.status ===
                                                        "Confirmed"
                                                            ? "bg-emerald-500/10 text-emerald-500"
                                                            : booking.status ===
                                                              "Pending"
                                                            ? "bg-amber-500/10 text-amber-500"
                                                            : "bg-blue-500/10 text-blue-500"
                                                    }`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    </div>

                    {/* Bottom Cards */}
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                                    <Clock3 className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        Pending Payments
                                    </h3>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Payments waiting for confirmation
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                    ₨ 1.24M
                                </span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                                    <Plane className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        Upcoming Departures
                                    </h3>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Groups departing soon
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                    12
                                </span>

                                <span className="ml-2 text-sm text-slate-500">
                                    groups
                                </span>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}