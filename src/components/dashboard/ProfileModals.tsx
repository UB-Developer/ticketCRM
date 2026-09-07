"use client";
import { useState, useRef } from "react";
import { AuthUser } from "@/types/auth";
import { X, Camera, Phone, User as UserIcon, Mail, Lock } from "lucide-react";
import { userService } from "@/services/userService";

interface Props {
    user: AuthUser;
    onClose: () => void;
    onUpdate: (updatedUser: AuthUser) => void;
}

export default function EditProfileModal({ user, onClose, onUpdate }: Props) {
    const [tab, setTab] = useState<"info" | "password">("info");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Form States
    const [phone, setPhone] = useState(user.phone || "");
    const [avatarPreview, setAvatarPreview] = useState(user.avatar || null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();
            fd.append("phone", phone);
            if (avatarFile) fd.append("avatar", avatarFile);

            const data = await userService.updateProfile(fd);
            onUpdate(data.user);
            alert("Profile updated!");
            onClose();
        } catch (err: any) {
            alert(err.message);
        } finally { setLoading(false); }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userService.changePassword({
                current_password: passwords.current,
                new_password: passwords.new,
                new_password_confirmation: passwords.confirm
            });
            alert("Password changed successfully!");
            onClose();
        } catch (err: any) {
            alert(err.message);
        } finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0f172a] shadow-2xl">
                {/* Tabs */}
                <div className="flex border-b border-slate-100 dark:border-white/10">
                    <button onClick={() => setTab("info")} className={`flex-1 py-4 text-sm font-bold ${tab === "info" ? "text-blue-500 border-b-2 border-blue-500" : "text-slate-400"}`}>General</button>
                    <button onClick={() => setTab("password")} className={`flex-1 py-4 text-sm font-bold ${tab === "password" ? "text-blue-500 border-b-2 border-blue-500" : "text-slate-400"}`}>Security</button>
                    <button onClick={onClose} className="p-4"><X size={18}/></button>
                </div>

                <div className="p-6">
                    {tab === "info" ? (
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            {/* Avatar */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative h-20 w-20 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden border-2 border-blue-500/20">
                                    {avatarPreview ? <img src={avatarPreview} className="h-full w-full object-cover" /> : <UserIcon className="m-auto h-full w-1/2 opacity-20"/>}
                                    <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                                        <Camera className="text-white" size={20}/>
                                    </button>
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} accept="image/*" />
                            </div>

                            {/* Info (Read Only) */}
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Name</label>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-500">
                                        <UserIcon size={16}/> {user.name}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Email</label>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-500">
                                        <Mail size={16}/> {user.email}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Phone Number</label>
                                    <div className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-white/10">
                                        <Phone size={16} className="text-blue-500"/>
                                        <input value={phone} onChange={e => setPhone(e.target.value)} className="bg-transparent outline-none text-sm w-full" placeholder="Enter phone..." />
                                    </div>
                                </div>
                            </div>
                            <button disabled={loading} className="w-full bg-blue-600 py-3 rounded-xl text-white font-bold">{loading ? "Saving..." : "Save Changes"}</button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="space-y-3">
                                <input type="password" placeholder="Current Password" required className="w-full p-3 rounded-xl border dark:bg-white/5 dark:border-white/10 text-sm" onChange={e => setPasswords({...passwords, current: e.target.value})} />
                                <input type="password" placeholder="New Password" required className="w-full p-3 rounded-xl border dark:bg-white/5 dark:border-white/10 text-sm" onChange={e => setPasswords({...passwords, new: e.target.value})} />
                                <input type="password" placeholder="Confirm Password" required className="w-full p-3 rounded-xl border dark:bg-white/5 dark:border-white/10 text-sm" onChange={e => setPasswords({...passwords, confirm: e.target.value})} />
                            </div>
                            <button disabled={loading} className="w-full bg-slate-900 dark:bg-blue-600 py-3 rounded-xl text-white font-bold uppercase text-xs tracking-wider">Update Password</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}