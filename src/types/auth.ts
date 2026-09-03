export type UserRole = "admin" | "agent";

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    phone?: string; // Ticket user ke liye phone add kiya
    role: UserRole;
    avatar?: string | null;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}