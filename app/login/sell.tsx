// page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store } from "lucide-react";

// ... your other imports

export default function SellerDashboard({ user }: { user: any }) {
  const router = useRouter();

  // 🔹 Keep track of which tab is active
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-garbata-gradient rounded-full flex items-center justify-center">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl">
                  Welcome back, {user?.name || "Fashion Entrepreneur"}
                </h1>
                <p className="text-muted-foreground">Seller Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={() => setActiveTab("shops")} variant="outline">
                Go to Shops
              </Button>
              <Button onClick={() => setActiveTab("profile")} variant="outline">
                Profile
              </Button>
              <Button onClick={() => router.push("/")} variant="ghost">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Section */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="shops">My Shops</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Content */}
          <TabsContent value="dashboard">
            <h2 className="text-xl font-bold">Dashboard Overview</h2>
            <p>All your quick stats go here...</p>
          </TabsContent>

          {/* Shops Content */}
          <TabsContent value="shops">
            <h2 className="text-xl font-bold">My Shops</h2>
            <p>Here’s your shop management content...</p>
          </TabsContent>

          {/* Profile Content */}
          <TabsContent value="profile">
            <h2 className="text-xl font-bold">Profile Settings</h2>
            <p>Edit your profile details here...</p>
          </TabsContent>

          {/* Analytics Content */}
          <TabsContent value="analytics">
            <h2 className="text-xl font-bold">Analytics</h2>
            <p>Charts and business insights here...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
