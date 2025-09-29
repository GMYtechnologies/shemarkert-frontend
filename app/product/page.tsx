"use client";

import React from "react";
import BuyerDashboard from "@/components/BuyerDashboard";

// If you have a user provider/context, replace the demoUser below with the actual user from context.
const demoUser = { id: 1, name: "Demo Buyer", email: "buyer@demo.com", role: "buyer" };

export default function BuyerPage() {
  return <BuyerDashboard user={demoUser} />;
}
