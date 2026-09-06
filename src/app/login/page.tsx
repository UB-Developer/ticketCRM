"use client";

import { FormEvent, useState, useEffect } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Plane, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { setAuth, isAuthenticated } from "@/lib/auth"; // Import helpers

export default function LoginPage() {
    const router = useRouter();

    // -- AUTH GUARD: Agar user pehle se login hai toh usay dashboard bhaij do --
    useEffect(() => {
        if (isAuthenticated()) {
            router.replace("/dashboard");
        }
    }, [router]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Laravel API Call
            const response = await api.post("/ticket/login", { 
                email, 
                password 
            });

            const data = response.data;

            if (data?.token && data?.user) {
                // 1. Cookies mein save karein (Server-side compatibility ke liye)
                setAuth(data.token, data.user);

                // 2. Next.js ko refresh karein taake Middleware aur Server components ko naye cookies mil jayein
                router.refresh();

                // 3. Dashboard par bhejein
                router.push("/dashboard");
            } else {
                throw new Error("Invalid login response from server.");
            }
        } catch (err: any) {
            setError(
                err?.response?.data?.message || "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
            <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
                {/* Background Glow Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
                    <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
                </div>

                <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-2xl">
                    
                    {/* Left Side (Decorative) */}
                    <div className="hidden lg:flex relative min-h-[680px] flex-col justify-between p-12 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-500/10 border-r border-white/10">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-xl">
                                    <Plane className="w-6 h-6 text-cyan-300" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-xl tracking-wide text-white">TRAVEL</h1>
                                    <p className="text-[10px] text-slate-400 tracking-[0.35em]">VVIP CRM</p>
                                </div>
                            </div>

                            <div className="mt-32 max-w-lg">
                                <p className="text-cyan-300 text-sm font-semibold uppercase tracking-[0.3em] mb-5">Welcome Back</p>
                                <h2 className="text-5xl font-bold leading-tight">
                                    Manage your <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">travel business.</span>
                                </h2>
                                <p className="mt-6 text-slate-400 leading-7">Manage airline groups, Umrah packages, and bookings from one powerful dashboard.</p>
                            </div>
                        </div>

                        <div className="relative z-10 grid grid-cols-3 gap-4">
                            <Feature title="Airline" text="Groups" />
                            <Feature title="Umrah" text="Packages" />
                            <Feature title="Custom" text="Bookings" />
                        </div>
                    </div>

                    {/* Right Side (Login Form) */}
                    <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-black/20">
                        <div className="w-full max-w-md">
                            <div className="mb-9">
                                <p className="text-sm text-cyan-300 font-medium mb-3">Secure Login</p>
                                <h2 className="text-3xl font-bold">Welcome back</h2>
                                <p className="mt-3 text-sm text-slate-400">Sign in to access your travel dashboard.</p>
                            </div>

                            {error && (
                                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="agent@example.com"
                                            required
                                            className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-white outline-none focus:border-cyan-400/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                                    <div className="relative">
                                        <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-12 text-white outline-none focus:border-cyan-400/50 transition-all"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition">
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-white/5 accent-cyan-400" />
                                        <span className="text-sm text-slate-400">Remember me</span>
                                    </label>
                                    <button type="button" className="text-sm text-cyan-300 hover:text-cyan-200 transition">Forgot password?</button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group w-full h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                                >
                                    <span className="flex items-center justify-center gap-3">
                                        {loading ? <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : "Sign In"}
                                        {!loading && <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />}
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Feature({ title, text }: { title: string; text: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-xs text-slate-500 mt-1">{text}</p>
        </div>
    );
}