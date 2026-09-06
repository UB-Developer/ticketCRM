import api from "@/lib/api"; 
import { UmrahGroup } from "@/types/umrah-group";

interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

export const groupService = {
    getAllGroups: async (page: number = 1) => {
        const response = await api.get<PaginatedResponse<UmrahGroup>>(`/ticket/groups?page=${page}`);
        return response.data;
    },

    getGroupByPnr: async (pnr: string) => {
        const response = await api.get<UmrahGroup>(`/ticket/groups/detail/${pnr}`);
        return response.data;
    },

    updateGroup: async (id: number, data: any) => {
        const response = await api.put(`/ticket/groups/${id}`, data);
        return response.data;
    }
};