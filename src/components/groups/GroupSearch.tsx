"use client";
import { Search, Calendar, Hash, FilterX } from "lucide-react";

export default function GroupSearch({ onSearch, onClear }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-white/5 p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
            {/* Keyword Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search Name or PNR..."
                    onChange={(e) => onSearch('q', e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none focus:border-cyan-500 transition-all text-sm"
                />
            </div>

            {/* Days Filter */}
            <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                    type="number" 
                    placeholder="Total Days..."
                    onChange={(e) => onSearch('days', e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none focus:border-cyan-500 transition-all text-sm"
                />
            </div>

            {/* Date Range */}
            <div className="relative col-span-1 md:col-span-1">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                    type="date" 
                    onChange={(e) => onSearch('start_date', e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none focus:border-cyan-500 transition-all text-sm"
                />
            </div>

            {/* Clear Button */}
            <button 
                onClick={onClear}
                className="h-12 flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-sm font-bold"
            >
                <FilterX size={18} /> Clear Filters
            </button>
        </div>
    );
}