import React from "react";
import { Plane, Calendar, MapPin, Users } from "lucide-react";
import { UmrahGroup } from "@/types/umrah-group";
import { formatPrice } from "@/lib/utils";

export default function GroupCard({ group }: { group: UmrahGroup }) {
    const going = group.flights.find(f => f.pivot?.type === 'going');
    const returnF = group.flights.find(f => f.pivot?.type === 'return');

    return (
        <div className="bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-black">{group.name}</h2>
                        <p className="opacity-80 text-sm font-mono tracking-widest">PNR: {group.pnr_number} | {group.group_no}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-center">
                        <div className="text-xs font-bold uppercase">Price</div>
                        <div className="text-xl font-black">Rs {formatPrice(group.price)}</div>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Flight Details Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                        <Plane className="h-4 w-4" /> Flight Itinerary
                    </h3>
                    
                    {[going, returnF].map((flight, idx) => flight && (
                        <div key={idx} className="relative flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <img src={`https://noorulharmain.com.pk/storage/${flight.logo}`} className="h-8 w-8 object-contain" alt="airline" />
                                <div>
                                    <div className="font-bold text-sm">{flight.from_place} → {flight.to_place}</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">{idx === 0 ? 'Going' : 'Return'} Flight</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-black text-slate-900 dark:text-white">{flight.departure_time}</div>
                                <div className="text-[10px] text-slate-400 font-bold">{flight.flight_number}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Seats & Info Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                        <Users className="h-4 w-4" /> Group Inventory
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Total Seats</div>
                            <div className="text-xl font-black text-slate-900 dark:text-white">{group.total_seats}</div>
                        </div>
                        <div className="p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-emerald-50/50 dark:bg-emerald-500/5">
                            <div className="text-[10px] font-bold text-emerald-600 uppercase">Available</div>
                            <div className="text-xl font-black text-emerald-600">{group.available_seats}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-white/10 p-3 rounded-xl">
                        <Calendar className="h-4 w-4 text-cyan-500" />
                        Duration: {group.days} Days / {group.nights} Nights
                    </div>
                </div>
            </div>
        </div>
    );
}