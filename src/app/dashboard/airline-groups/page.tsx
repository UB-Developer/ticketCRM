import { cookies } from "next/headers";
import { groupService } from "@/services/groupService";
import UmrahGroupsClient from "./UmrahGroupsClient";

export default async function UmrahGroupsPage({ searchParams }: any) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Beech mein khali object {} bhejna hai kyunke server par initial search nahi hoti
    const initialData = await groupService.getAllGroups(page, {}, token);

    return (
        <div className="p-6 space-y-6">
            <UmrahGroupsClient initialData={initialData} />
        </div>
    );
}