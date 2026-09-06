"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { groupService } from "@/services/groupService";
import GroupCard from "@/components/groups/GroupCard";
import GroupForm from "@/components/groups/GroupForm";
import { UmrahGroup } from "@/types/umrah-group";

export default function DetailPage() {
    const { pnr } = useParams();
    const [group, setGroup] = useState<UmrahGroup | null>(null);

    useEffect(() => {
        if (pnr) {
            groupService.getGroupByPnr(pnr as string).then(setGroup);
        }
    }, [pnr]);

    if (!group) return <div className="p-20 text-center">Loading Detail...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <GroupCard group={group} />
            <GroupForm group={group} />
        </div>
    );
}