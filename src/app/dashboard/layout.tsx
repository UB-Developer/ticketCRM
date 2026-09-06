"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, isAuthenticated } from "@/lib/auth"; // Aapke auth helpers
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Client side check
        if (!isAuthenticated()) {
            router.replace("/login");
            return;
        }

        const userData = getUser();
        if (userData) {
            setUser(userData);
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-[#050b14]">
                <Loader2 className="animate-spin text-cyan-500" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050b14]">
            {/* Sidebar: Fixed width 280px */}
            <DashboardSidebar 
                user={user} 
                mobileOpen={mobileOpen} 
                setMobileOpen={setMobileOpen} 
            />

            {/* Content Area: lg:ml-[280px] se sidebar ke liye jagah ban jayegi */}
            <div className="flex min-h-screen flex-col lg:ml-[280px]">
                <DashboardHeader 
                    user={user} 
                    setMobileOpen={setMobileOpen} 
                />

                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {/* Max width container taake content boht phailay nahi */}
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}