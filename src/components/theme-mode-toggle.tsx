"use client"

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleMode() {
    const { resolvedTheme, setTheme } = useTheme();

    // Ensure theme is loaded before rendering
    if (!resolvedTheme) return null;
    return (
        <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
        >
            {/* Show Sun icon in Dark Mode */}
            <Sun
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${resolvedTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                    }`}
            />

            {/* Show Moon icon in Light Mode */}
            <Moon
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${resolvedTheme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                    }`}
            />

            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
