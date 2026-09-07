"use client";
import React from "react";
import { Save, Info } from "lucide-react";
import { UmrahGroup } from "@/types/umrah-group";
import { formatPrice } from "@/lib/utils";

export default function GroupForm({ group }: { group: UmrahGroup }) {
    return (
        <form className="bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                <Info className="h-5 w-5 text-cyan-500" />
                <h3 className="text-lg font-bold">Update Group Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Group Name</label>
                    <input defaultValue={group.name} className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">PNR Number</label>
                    <input defaultValue={group.pnr_number} className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Total Seats</label>
                    <input type="number" defaultValue={group.total_seats} className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Adult Price</label>
                    <input type="number" defaultValue={formatPrice(group.price)} className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 text-emerald-600 font-bold" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Child Rate</label>
                    <input type="number" defaultValue={formatPrice(group.childe_rate)} className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Infant Rate</label>
                    <input type="number" defaultValue={formatPrice(group.infent_rate)} className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500" />
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-slate-900 dark:bg-cyan-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                    <Save className="h-5 w-5" /> Save Changes
                </button>
            </div>
        </form>
    );
}