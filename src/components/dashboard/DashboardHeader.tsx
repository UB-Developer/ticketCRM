"use client";
import { useState, useEffect } from "react"; // Mounted state ke liye
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function DashboardHeader({ user, setMobileOpen }: any) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Hydration error se bachne ke liye
    if (!mounted) return null;

    return (
        <header className="sticky top-0 z-30 h-[82px] border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#07111f]/80 backdrop-blur-xl">
            <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-2.5 text-slate-600 dark:text-slate-300 lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div>
                        <p className="text-xs text-slate-500">Welcome back</p>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {user.name}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-white/[0.07]"
                    >
                        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    {/* Avatar */}
                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}