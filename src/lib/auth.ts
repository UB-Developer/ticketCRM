import Cookies from "js-cookie";
import { AuthUser } from "@/types/auth";

// Token nikalne ke liye
export function getToken(): string | null {
    // Agar server side hai
    if (typeof window === "undefined") {
        return null; // Server components mein hum seedha headers se uthatay hain
    }
    // Agar client side hai
    return Cookies.get("auth_token") || null;
}

// User data nikalne ke liye
export function getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;

    const user = Cookies.get("auth_user");
    if (!user) return null;

    try {
        return JSON.parse(user) as AuthUser;
    } catch {
        return null;
    }
}

// Login ke waqt data save karne ke liye (Isko Login page par use karein)
export function setAuth(token: string, user: AuthUser) {
    // 7 din ke liye cookie save hogi (Server aur Client dono par readable)
    Cookies.set("auth_token", token, { expires: 7, path: '/' });
    Cookies.set("auth_user", JSON.stringify(user), { expires: 7, path: '/' });
}

export function isAuthenticated(): boolean {
    return !!getToken();
}

// Logout logic
export function logout(): void {
    Cookies.remove("auth_token", { path: '/' });
    Cookies.remove("auth_user", { path: '/' });

    if (typeof window !== "undefined") {
        window.location.href = "/login";
    }
}