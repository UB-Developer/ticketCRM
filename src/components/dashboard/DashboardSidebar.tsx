"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Plane,
    Landmark,
    ArrowRightLeft,
    Package,
    Ticket,
    Users,
    FileText,
    BarChart3,
    Settings,
    UserCog,
    LogOut,
    X,
} from "lucide-react";
import { AuthUser } from "@/types/auth";
import { logout } from "@/lib/auth";

interface DashboardSidebarProps {
    user: AuthUser;
    mobileOpen: boolean;
    setMobileOpen: (value: boolean) => void;
}

interface MenuItem {
    title: string;
    href: string;
    icon: any;
    roles: ("admin" | "agent")[];
}

const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "agent"],
    },
    {
        title: "Airline Groups",
        href: "/dashboard/airline-groups",
        icon: Plane,
        roles: ["admin", "agent"],
    },
    {
        title: "Umrah Groups",
        href: "/dashboard/umrah-groups",
        icon: Landmark,
        roles: ["admin", "agent"],
    },
    {
        title: "One Way Groups",
        href: "/dashboard/one-way-groups",
        icon: ArrowRightLeft,
        roles: ["admin", "agent"],
    },
    {
        title: "Custom Packages",
        href: "/dashboard/custom-packages",
        icon: Package,
        roles: ["admin", "agent"],
    },
    {
        title: "Bookings",
        href: "/dashboard/bookings",
        icon: Ticket,
        roles: ["admin", "agent"],
    },
    {
        title: "Passengers",
        href: "/dashboard/passengers",
        icon: Users,
        roles: ["admin", "agent"],
    },
    {
        title: "Reports",
        href: "/dashboard/reports",
        icon: BarChart3,
        roles: ["admin", "agent"],
    },
    {
        title: "Agents",
        href: "/dashboard/agents",
        icon: UserCog,
        roles: ["admin"],
    },
    {
        title: "System Settings",
        href: "/dashboard/settings",
        icon: Settings,
        roles: ["admin"],
    },
];

export default function DashboardSidebar({
    user,
    mobileOpen,
    setMobileOpen,
}: DashboardSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const visibleItems = menuItems.filter((item) =>
        item.roles.includes(user.role)
    );

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    return (
        <>
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed left-0 top-0 z-50
                    h-screen w-[280px]
                    border-r border-white/10
                    bg-[#07111f]
                    transition-transform duration-300
                    lg:translate-x-0
                    ${
                        mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >
                {/* Logo */}
                <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3"
                        onClick={() => setMobileOpen(false)}
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20">
                            <Plane className="h-5 w-5 text-white" />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold tracking-wide text-white">
                                TRAVEL
                            </h1>

                            <p className="text-[9px] font-medium tracking-[0.35em] text-cyan-400">
                                VVIP CRM
                            </p>
                        </div>
                    </Link>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* User */}
                <div className="mx-4 mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                                {user.name}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <span
                            className={`
                                inline-flex rounded-full px-3 py-1
                                text-[10px] font-bold uppercase tracking-wider
                                ${
                                    user.role === "admin"
                                        ? "bg-purple-500/10 text-purple-300"
                                        : "bg-cyan-500/10 text-cyan-300"
                                }
                            `}
                        >
                            {user.role}
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-6 h-[calc(100vh-245px)] overflow-y-auto px-4">
                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                        Main Menu
                    </p>

                    <div className="space-y-1">
                        {visibleItems.map((item) => {
                            const Icon = item.icon;

                            const active =
                                pathname === item.href ||
                                pathname.startsWith(item.href + "/");

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className={`
                                        group flex items-center gap-3
                                        rounded-xl px-3 py-3
                                        text-sm font-medium
                                        transition-all
                                        ${
                                            active
                                                ? "bg-gradient-to-r from-blue-500/20 to-cyan-400/10 text-cyan-300 shadow-inner"
                                                : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                        }
                                    `}
                                >
                                    <Icon
                                        className={`
                                            h-[18px] w-[18px]
                                            ${
                                                active
                                                    ? "text-cyan-300"
                                                    : "text-slate-500 group-hover:text-slate-300"
                                            }
                                        `}
                                    />

                                    <span>{item.title}</span>

                                    {active && (
                                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/50" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#07111f] p-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                        <LogOut className="h-[18px] w-[18px]" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}