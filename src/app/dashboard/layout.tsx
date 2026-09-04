"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getUser, isAuthenticated } from "@/store/authStore";
import { AuthUser } from "@/types/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
            return;
        }
        const currentUser = getUser();
        if (currentUser) setUser(currentUser);
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#020817]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020817]">
            {/* Sidebar */}
            <DashboardSidebar
                user={user}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* Main Area */}
            <div className="lg:ml-[280px]">
                {/* Header */}
                <DashboardHeader user={user} setMobileOpen={setMobileOpen} />

                {/* Yahan aapka page ka content load hoga */}
                <main>{children}</main>
            </div>
        </div>
    );
}