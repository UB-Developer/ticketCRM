"use client";

import { useState } from "react";
import { groupService } from "@/services/groupService";
import GroupTable from "@/components/groups/GroupTable";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function UmrahGroupsClient({ initialData }: { initialData: any }) {
  // Local state mein data aur page number rakhein
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > data.last_page) return;

    setLoading(true);
    try {
      // Client side par API call (Axios interceptor token khud handle karega)
      const res = await groupService.getAllGroups(newPage);
      setData(res); // URL change nahi hoga, sirf data update hoga
      
      // Page ke top par scroll karein (Optional)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Pagination failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Loading Overlay taake user ko pata chale data load ho raha hai */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-[#050b14]/50 backdrop-blur-[2px] rounded-3xl">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
        </div>
      )}

      {/* Table Section */}
      <GroupTable groups={data.data} />

      {/* Pagination Footer - No URL change logic */}
      <div className="flex justify-between items-center bg-white dark:bg-white/[0.03] p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="text-sm font-medium text-slate-500">
          Showing <span className="text-slate-900 dark:text-white">{data.current_page}</span> of {data.last_page} pages
          <span className="ml-2 text-[10px] text-slate-400">({data.total} Total)</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(data.current_page - 1)}
            disabled={data.current_page === 1 || loading}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => handlePageChange(data.current_page + 1)}
            disabled={data.current_page === data.last_page || loading}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}