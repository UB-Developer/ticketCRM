"use client";
import  { useEffect, useState } from "react";
import { groupService } from "@/services/groupService";
import GroupTable from "@/components/groups/GroupTable";
import { UmrahGroup } from "@/types/umrah-group";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function UmrahGroupsPage() {
    const [groups, setGroups] = useState<UmrahGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ current: 1, last: 1, total: 0 });

    const loadData = async (page: number) => {
        setLoading(true);
        try {
            const res = await groupService.getAllGroups(page);
            setGroups(res.data);
            setPagination({
                current: res.current_page,
                last: res.last_page,
                total: res.total
            });
        } catch (error) {
            console.error("Failed to load groups", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(pagination.current); }, [pagination.current]);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Available Groups ({pagination.total})</h1>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-cyan-500" /></div>
            ) : (
                <>
                    <GroupTable groups={groups} />
                    
                    {/* Pagination UI */}
                    <div className="flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                        <span className="text-sm text-slate-500">Page {pagination.current} of {pagination.last}</span>
                        <div className="flex gap-2">
                            <button 
                                disabled={pagination.current === 1}
                                onClick={() => setPagination(p => ({...p, current: p.current - 1}))}
                                className="p-2 border rounded-lg disabled:opacity-30 hover:bg-slate-50"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button 
                                disabled={pagination.current === pagination.last}
                                onClick={() => setPagination(p => ({...p, current: p.current + 1}))}
                                className="p-2 border rounded-lg disabled:opacity-30 hover:bg-slate-50"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}