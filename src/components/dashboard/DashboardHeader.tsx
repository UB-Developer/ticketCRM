"use client";
import { useState, useEffect } from "react"; 
import { Menu, Sun, Moon, User, Settings, LogOut, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { logout } from "@/lib/auth"; // Aapki auth file se

export default function DashboardHeader({ user, setMobileOpen }: any) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <header className="h-[82px] border-b border-slate-200 dark:border-white/10" />;

    const currentTheme = theme === "system" ? resolvedTheme : theme;

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
                            {user?.name}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-white/[0.07]"
                    >
                        {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all"
                        >
                            {user?.avatar ? (
                                <img src={user.avatar} alt="User" className="h-full w-full object-cover" />
                            ) : (
                                user?.name?.charAt(0).toUpperCase()
                            )}
                        </button>

                        {dropdownOpen && (
                            <>
                                {/* Click outside to close */}
                                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                                
                                <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-20 overflow-hidden">
                                    <div className="p-4 border-b border-slate-100 dark:border-white/5">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <button 
                                            onClick={() => { setShowImageModal(true); setDropdownOpen(false); }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition"
                                        >
                                            <User className="h-4 w-4 text-blue-500" /> View Photo
                                        </button>
                                        <Link 
                                            href="/dashboard/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition"
                                        >
                                            <Settings className="h-4 w-4 text-emerald-500" /> Edit Profile
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-slate-100 dark:border-white/5">
                                        <button 
                                            onClick={() => logout()}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                                        >
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* View Profile Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                    <button 
                        onClick={() => setShowImageModal(false)}
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div className="relative max-w-sm w-full animate-in zoom-in-95 duration-200">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-slate-800 border-4 border-white/10 shadow-2xl">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="User Large" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-7xl font-bold text-white bg-gradient-to-br from-cyan-400 to-blue-600">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                            <p className="text-slate-400">{user?.role} Account</p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}