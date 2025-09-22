"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import ThemeToggle from "@/components/ThemeToggle";
import { Search, User, ShoppingBag } from "lucide-react";
import ThemeToggle from "@/app/ThemeToggle";

interface BuyerHeaderProps {
  user: any;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onProfileClick?: () => void;
  showSearch?: boolean;
  currentPage?: "dashboard" | "subscription" | "profile";
}

export default function BuyerHeader({
  user,
  searchQuery = "",
  onSearchChange,
  onProfileClick,
  showSearch = true,
  currentPage = "dashboard",
}: BuyerHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/buyer-dashboard")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              type="button"
            >
              <div className="w-10 h-10 bg-garbata-gradient rounded-full flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl">SheMarket</h1>
            </button>
          </div>

          {showSearch && (
            <div className="flex-1 max-w-md mx-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onSearchChange?.(e.target.value)
                  }
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            

            {currentPage !== "subscription" && (
              <Button onClick={() => router.push("/subscription")} variant="outline" size="sm">
                Go Premium
              </Button>
            )}

            {currentPage !== "profile" &&  (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>router.push("/profile")}
                className="flex items-center gap-2"
              >
                Profile
              </Button>
            )}

            <Button onClick={() => router.push("/")} variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
