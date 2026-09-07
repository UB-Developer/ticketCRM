"use client";
import { useState } from "react";
import { Lock } from "lucide-react";
import { userService } from "@/services/userService";
import { toast } from "@/utils/notifications";

export default function PasswordForm() {
    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState({ current: "", new: "", confirm: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await userService.changePassword({
                current_password: pass.current,
                new_password: pass.new,
                new_password_confirmation: pass.confirm
            });

            // Server ka message: "Password successfully change ho gaya!"
            toast.success(res.message);
            setPass({ current: "", new: "", confirm: "" });

        } catch (err: any) {
            // Server ka error: "Old password incorrect hai." ya "The password must be 8 characters."
            toast.error(err.message);
        } finally { setLoading(false); }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-[#0f172a] p-6 rounded-3xl border border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold flex items-center gap-2"><Lock size={18} className="text-blue-500" /> Change Password</h3>
            <div className="space-y-3">
                <input type="password" placeholder="Current Password" required className="w-full p-3 rounded-xl border dark:bg-white/5 dark:border-white/10 text-sm outline-none focus:border-blue-500 transition" onChange={e => setPass({ ...pass, current: e.target.value })} value={pass.current} />
                <input type="password" placeholder="New Password" required className="w-full p-3 rounded-xl border dark:bg-white/5 dark:border-white/10 text-sm outline-none focus:border-blue-500 transition" onChange={e => setPass({ ...pass, new: e.target.value })} value={pass.new} />
                <input type="password" placeholder="Confirm New Password" required className="w-full p-3 rounded-xl border dark:bg-white/5 dark:border-white/10 text-sm outline-none focus:border-blue-500 transition" onChange={e => setPass({ ...pass, confirm: e.target.value })} value={pass.confirm} />
            </div>
            <button disabled={loading} className="w-full md:w-max px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-bold transition">
                {loading ? "Updating..." : "Update Security"}
            </button>
        </form>
    );
}