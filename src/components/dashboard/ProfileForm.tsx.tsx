"use client";
import { useState, useRef } from "react";
import { Camera, Phone, User, Mail, Save, Loader2 } from "lucide-react";
import { userService } from "@/services/userService";
import { AuthUser } from "@/types/auth";
import { toast } from "@/utils/notifications";

export default function ProfileForm({ user, onUpdate }: { user: AuthUser, onUpdate: (u: AuthUser) => void }) {
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState(user.phone || "");
    const [preview, setPreview] = useState(user.avatar || null);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();
            fd.append("phone", phone);
            if (fileRef.current?.files?.[0]) fd.append("avatar", fileRef.current.files[0]);

            const res = await userService.updateProfile(fd); // Backend call

            onUpdate(res.user);

            // Server wala success message
            toast.success(res.message);

        } catch (err: any) {
            // Server wala error message (e.g. "Old password incorrect" ya "Validation error")
            toast.error(err.message);
        } finally { setLoading(false); }
    };
    
    return (
        <form onSubmit={handleProfileSubmit} className="space-y-6 bg-white dark:bg-[#0f172a] p-6 rounded-3xl border border-slate-200 dark:border-white/10">
            <div className="flex flex-col items-center gap-4">
                <div className="relative group w-24 h-24">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500/20 bg-slate-100">
                        {preview ? <img src={preview} className="w-full h-full object-cover" /> : <User className="w-full h-full p-4 opacity-20" />}
                    </div>
                    <button type="button" onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg"><Camera size={14} /></button>
                    <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={(e) => setPreview(e.target.files ? URL.createObjectURL(e.target.files[0]) : preview)} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 ml-1">NAME (READ ONLY)</label>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-500 flex items-center gap-2"><User size={16} /> {user.name}</div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 ml-1">EMAIL (READ ONLY)</label>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-500 flex items-center gap-2"><Mail size={16} /> {user.email}</div>
                </div>
                <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 ml-1">PHONE NUMBER</label>
                    <div className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-white/10 focus-within:border-blue-500 transition">
                        <Phone size={16} className="text-blue-500" />
                        <input value={phone} onChange={e => setPhone(e.target.value)} className="bg-transparent outline-none w-full text-sm" placeholder="Phone..." />
                    </div>
                </div>
            </div>

            <button disabled={loading} className="w-full md:w-max px-8 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Profile
            </button>
        </form>
    );
}