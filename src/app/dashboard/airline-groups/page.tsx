"use client";

import React, { useState } from "react"; // Extra comma hata diya
import { 
    Plane, 
    Search, 
    Filter, 
    Plus, 
    Clock, 
    MoreVertical,
    ChevronRight,
} from "lucide-react";

const mockGroups = [
    {
        id: 1,
        name: "Umrah Premium Group - Nov",
        group_no: "GRP-78601",
        pnr_number: "PNR-XYZ123",
        total_seats: 50,
        available_seats: 12,
        departure_date: "2024-11-15",
        return_date: "2024-11-30",
        days: 15,
        nights: 14,
        price: 185000,
        childe_rate: 165000,
        infent_rate: 45000,
        kg_allowance: "40kg",
        status: "Active",
        supplier: { name: "Air Blue" },
        flights: [
            {
                id: 101,
                flight_number: "PA-470",
                from_place: "LHE",
                to_place: "JED",
                departure_time: "14:30",
                arrival_time: "18:45",
                duration: "6h 15m",
                logo: "✈️",
                type: "Departure"
            },
            {
                id: 102,
                flight_number: "PA-471",
                from_place: "JED",
                to_place: "LHE",
                departure_time: "21:00",
                arrival_time: "03:30",
                duration: "6h 30m",
                logo: "✈️",
                type: "Return"
            }
        ]
    }
];

// Function ka naam UmrahGroupsPage kar diya
export default function UmrahGroupsPage() {
    const [groups] = useState(mockGroups);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Umrah Groups</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your flight groups and seat inventory</p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 active:scale-95">
                    <Plus className="h-4 w-4" />
                    Create New Group
                </button>
            </div>

            {/* Filter Bar */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by PNR, Group No or Name..." 
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                    <Filter className="h-4 w-4" />
                    Filters
                </button>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {groups.map((group) => (
                    <div key={group.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03]">
                        
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                                    <Plane className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                                        {group.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-mono bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                                            {group.group_no}
                                        </span>
                                        <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                                            PNR: {group.pnr_number}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Flight Timeline */}
                        <div className="relative mb-6 space-y-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] p-4">
                            {group.flights.map((flight) => (
                                <div key={flight.id} className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-slate-900 dark:text-white">{flight.departure_time}</span>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider">{flight.from_place}</span>
                                    </div>
                                    <div className="flex flex-1 flex-col items-center px-4">
                                        <div className="relative flex w-full items-center justify-center">
                                            <div className="h-[1px] w-full bg-slate-300 dark:bg-white/10"></div>
                                            <Plane className={`absolute h-4 w-4 text-cyan-500 ${flight.type === 'Return' ? 'rotate-180' : ''}`} />
                                        </div>
                                        <span className="mt-1 text-[10px] text-slate-400 font-medium">{flight.duration}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-lg font-bold text-slate-900 dark:text-white">{flight.arrival_time}</span>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider">{flight.to_place}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-white/5 pt-6">
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Seats</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{group.available_seats}/{group.total_seats}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Duration</p>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{group.days}D/{group.nights}N</span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Price</p>
                                <span className="text-sm font-bold text-emerald-500">₨ {group.price.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                            <button className="flex items-center gap-2 text-sm font-bold text-cyan-500 hover:gap-3 transition-all">
                                View Details
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}