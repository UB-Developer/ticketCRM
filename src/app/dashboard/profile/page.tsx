"use client";
import { useState, useEffect } from "react";
import { getUser, setAuth, getToken } from "@/lib/auth";
import { AuthUser } from "@/types/auth";
import ProfileForm from "@/components/dashboard/ProfileForm.tsx";
import PasswordForm from "@/components/dashboard/PasswordForm.tsx";
export default function ProfilePage() {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    const handleUserUpdate = (updatedUser: AuthUser) => {
        setUser(updatedUser);
        // Cookies/LocalStorage update karein
        const token = getToken() || "";
        setAuth(token, updatedUser); 
    };

    if (!user) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-slate-500 text-sm">Manage your account information and security.</p>
            </div>

            {/* Profile Info Form */}
            <ProfileForm user={user} onUpdate={handleUserUpdate} />

            {/* Password Change Form */}
            <PasswordForm />
        </div>
    );
}