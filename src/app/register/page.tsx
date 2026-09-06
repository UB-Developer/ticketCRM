"use client";

import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Plane,
    User,
    UserPlus,
} from "lucide-react";

// Bhai jaan ye imports lazmi check kar lena apne folder structure ke hisaab se
import api from "@/lib/api";
import { setAuth, isAuthenticated } from "@/lib/auth";

export default function RegisterPage() {
    const router = useRouter();

    // States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

     useEffect(() => {
            if (isAuthenticated()) {
                router.replace("/dashboard");
            }
        }, [router]);

    // Input Change Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");   
        setLoading(true);

        try {
            const response = await api.post("/ticket/register", formData);
            const data = response.data;

            if (data?.token && data?.user) {
                // ✅ COOKIES SET KAREIN
                setAuth(data.token, data.user);

                // ✅ Refresh and Redirect
                router.refresh();
                router.push("/dashboard");
            }
        } catch (err: any) {
            const backendError = err.response?.data?.message || "Registration failed.";
            setError(String(backendError));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b14] px-6 py-10 text-white">
            {/* Background Glows */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-150px] top-[-150px] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
            </div>

            <div className="relative z-10 w-full max-w-[500px]">
                {/* Back Button */}
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="rounded-3xl border border-white/10 bg-[#091321]/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
                    {/* Header/Logo */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/20">
                            <Plane className="h-6 w-6" />
                        </div>
                        <h1 className="mt-5 text-2xl font-bold">Create Your Account</h1>
                        <p className="mt-2 text-sm text-slate-500">Join Travel VVIP CRM</p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.05]"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.05]"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
                            <div className="relative">
                                <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition focus:border-cyan-400/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Confirm Password</label>
                            <div className="relative">
                                <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    required
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition focus:border-cyan-400/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <label className="flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                required
                                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan-500"
                            />
                            <span className="text-xs leading-5 text-slate-500">
                                I agree to the terms and conditions and understand that my account access is subject to administrator approval.
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Creating Account...
                                </span>
                            ) : (
                                <>
                                    <UserPlus className="h-4 w-4" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Redirect */}
                    <div className="mt-7 border-t border-white/10 pt-6 text-center">
                        <p className="text-sm text-slate-500">Already have an account?</p>
                        <Link
                            href="/login"
                            className="mt-2 inline-block text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                        >
                            Sign in to your account
                        </Link>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-600">
                    Travel VVIP CRM • Secure Travel Management
                </p>
            </div>
        </main>
    );
}