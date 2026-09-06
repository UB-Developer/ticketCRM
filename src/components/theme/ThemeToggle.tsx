"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ye client side par mount hone ka wait karta hai
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-10 w-10 rounded-xl border border-slate-200 dark:border-white/10" />;
    }

    const currentTheme = theme === "system" ? resolvedTheme : theme;

    return (
        <button
            type="button"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
        >
            {currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}