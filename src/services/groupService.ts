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
    // Yahan humne dusra argument 'token' add kar diya hai jo optional (?) hai
    getAllGroups: async (page: number = 1, token?: string) => {
        
        // Agar token pass kiya gaya hai (Server Side se), toh headers mein add karein
        const config = token 
            ? { headers: { Authorization: `Bearer ${token}` } } 
            : {};

        const response = await api.get<PaginatedResponse<UmrahGroup>>(
            `/ticket/groups?page=${page}`, 
            config // Ye config headers bhejay ga
        );
        
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