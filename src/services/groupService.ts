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
    getAllGroups: async (page: number = 1, params: any = {}, token?: string) => {
        
        // Aapka authorization logic
        const config = token 
            ? { headers: { Authorization: `Bearer ${token}` } } 
            : {};

        // URL Parameters banana (Page + Search/Filters)
        // Object.fromEntries aur filter isliye taake khali filters API ko na jayein
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v != null && v !== "")
        );

        const query = new URLSearchParams({
            page: page.toString(),
            ...cleanParams
        }).toString();

        const response = await api.get<PaginatedResponse<UmrahGroup>>(
            `/ticket/groups?${query}`, 
            config 
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