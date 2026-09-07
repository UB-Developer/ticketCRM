"use client";
import { useState } from "react";
import { groupService } from "@/services/groupService";
import GroupTable from "@/components/groups/GroupTable";
import GroupSearch from "@/components/groups/GroupSearch";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function UmrahGroupsClient({ initialData }: { initialData: any }) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});

    const fetchData = async (pageNumber: number, currentFilters: any) => {
        setLoading(true);
        try {
            // Page bhejo, Filters bhejo, Token chor do (Client side par token null jayega)
            const res = await groupService.getAllGroups(pageNumber, currentFilters);
            setData(res);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        fetchData(1, newFilters); // Search hamesha page 1 se shuru hogi
    };

    const clearFilters = () => {
        setFilters({});
        fetchData(1, {});
        // Inputs ko reset karne ke liye window reload ya refs use kar saktay hain
    };

    return (
        <div className="space-y-6 relative">
            <GroupSearch onSearch={handleSearch} onClear={clearFilters} />

            {loading && (
                <div className="absolute inset-x-0 top-40 z-20 flex justify-center"><Loader2 className="animate-spin h-12 w-12 text-cyan-500" /></div>
            )}

            <div className={loading ? "opacity-30 pointer-events-none" : ""}>
                <GroupTable groups={data.data} />
            </div>

            {/* Pagination (Pehle wala logic rahega bas fetchData use hoga) */}
            <div className="flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                <span className="text-sm text-slate-500">Page {data.current_page} of {data.last_page}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => fetchData(data.current_page - 1, filters)}
                        disabled={data.current_page === 1 || loading}
                        className="p-2 border rounded-xl disabled:opacity-30"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => fetchData(data.current_page + 1, filters)}
                        disabled={data.current_page === data.last_page || loading}
                        className="p-2 border rounded-xl disabled:opacity-30"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}