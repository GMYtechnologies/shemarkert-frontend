"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Store } from "lucide-react";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 rounded-2xl bg-gray-700 hover:bg-gray-600 transition"
    >
       {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}