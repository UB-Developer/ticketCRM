"use client";
import React from "react";
import Link from "next/link";
import { Eye, Ticket, ArrowRight } from "lucide-react";
import { UmrahGroup } from "@/types/umrah-group";

interface Props { groups: UmrahGroup[]; }

export default function GroupTable({ groups }: Props) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-white/5 text-[11px] font-bold uppercase text-slate-500">
                    <tr>
                        <th className="px-6 py-4">Group Name</th>
                        <th className="px-6 py-4">PNR</th>
                        <th className="px-6 py-4">Available Seats</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {groups.map((group) => (
                        <tr key={group.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                                {group.name}
                                <div className="text-[10px] text-cyan-600 font-medium uppercase">{group.group_no}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">
                                    <Ticket className="h-3 w-3" /> {group.pnr_number}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-emerald-500">{group.available_seats} / {group.total_seats}</td>
                            <td className="px-6 py-4 font-black text-slate-900 dark:text-white">Rs {group.price.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right">
                                <Link 
                                    href={`/dashboard/groups/${group.pnr_number}`}
                                    className="inline-flex items-center gap-1 text-xs font-bold bg-cyan-500 text-white px-3 py-1.5 rounded-lg hover:bg-cyan-600 transition-all"
                                >
                                    View Detail <ArrowRight className="h-3 w-3" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}