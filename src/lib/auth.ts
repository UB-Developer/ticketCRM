import { AuthUser } from "@/types/auth";

export function getToken(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return (
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token")
    );
}

export function getUser(): AuthUser | null {
    if (typeof window === "undefined") {
        return null;
    }

    const user =
        localStorage.getItem("auth_user") ||
        sessionStorage.getItem("auth_user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user) as AuthUser;
    } catch {
        return null;
    }
}

export function isAuthenticated(): boolean {
    return !!getToken();
}

export function logout(): void {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");

    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
}