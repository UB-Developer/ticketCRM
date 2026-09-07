import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
    async updateProfile(formData: FormData) {
        const response = await fetch(`${API_URL}/ticket/update-profile`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${getToken()}` },
            body: formData,
        });

        const data = await response.json(); // Server ka pura response (success ya error)
        if (!response.ok) throw new Error(data.message || "Kuch ghalat ho gaya");
        return data; // Isme server ka 'message' aur 'user' hoga
    },

    async changePassword(data: any) {
        const response = await fetch(`${API_URL}/ticket/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Password change fail");
        return result; // Isme server ka 'message' hoga
    }
};