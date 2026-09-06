import { cookies } from "next/headers";
import { groupService } from "@/services/groupService";
import UmrahGroupsClient from "./UmrahGroupsClient";

export default async function UmrahGroupsPage() {
  // Server side se pehli dafa data fetch karein
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  
  const initialData = await groupService.getAllGroups(1, token);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Umrah Groups</h1>
        <div className="text-xs font-bold bg-cyan-500/10 text-cyan-600 px-3 py-1 rounded-full">
            Live Inventory
        </div>
      </div>

      {/* Client component ko initial data pass kar diya */}
      <UmrahGroupsClient initialData={initialData} />
    </div>
  );
}