"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-10 w-10 rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]" />
        );
    }

    const currentTheme =
        theme === "system" ? resolvedTheme : theme;

    return (
        <button
            type="button"
            onClick={() =>
                setTheme(
                    currentTheme === "dark"
                        ? "light"
                        : "dark"
                )
            }
            aria-label="Toggle theme"
            className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                shadow-sm
                transition-all
                hover:bg-slate-50
                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-slate-300
                dark:hover:bg-white/[0.07]
            "
        >
            {currentTheme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}