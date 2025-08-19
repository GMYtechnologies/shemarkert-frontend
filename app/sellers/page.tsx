// app/page.js (Next.js 13+ with App Router)
// or pages/index.js (Next.js 12)

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = ["Dashboard", "My Shops", "Profile", "Analytics"];

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
        <div className="flex items-center  justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12  rounded-full flex items-center justify-center">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Welcome back, malmeh</h1>
              <p className="text-muted-foreground">Seller Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle/> 
            <button className="px-4 py-2 rounded-xl ">
              Subscription
            </button>
            <button className="px-4 py-2 rounded-xl ">
              Logout
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex justify-center mb-8">
        <div className="container mx-auto px-16 py-8">

        <div className="bg-purple-500 rounded-full p-1 grid grid-cols-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-16 py-0.5 rounded-full transition ${
                activeTab === tab
                  ? "bg-garbata text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-gray-500 rounded-2xl p-8 shadow-lg">
        <h2 className="text-lg font-semibold mb-8">{activeTab}</h2>
        <p className="text-gray-300">
          Content for <span className="font-semibold">{activeTab}</span> will appear here.
        </p>
      </main>
    </div>
  );
}
