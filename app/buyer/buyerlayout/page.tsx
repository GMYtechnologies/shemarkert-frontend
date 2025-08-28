"use client";

import React, { useState, forwardRef } from 'react';
import { useRouter } from 'next/dist/client/components/navigation';
import {
  Search,
  User,
  ShoppingBag
} from 'lucide-react';



const Button = forwardRef(({ className, variant, size, ...props }: any, ref) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const sizeClasses = size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-4 py-2";
  const variantClasses = variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : "";
  const finalClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className || ''}`;
  return <button ref={ref} className={finalClasses} {...props} />;
});
Button.displayName = "Button";

// Re-implementation of shadcn/ui Input
const Input = forwardRef(({ className, type, ...props }: any, ref) => {
  const baseClasses = "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
  const finalClasses = `${baseClasses} ${className || ''}`;
  return <input type={type} className={finalClasses} ref={ref} {...props} />;
});
Input.displayName = "Input";

// Re-implementation of shadcn/ui Avatar
const Avatar = forwardRef(({ className, ...props }: any, ref) => {
  const finalClasses = `relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ''}`;
  return <span ref={ref} className={finalClasses} {...props} />;
});
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef(({ className, ...props }: any, ref) => {
  const finalClasses = `aspect-square h-full w-full ${className || ''}`;
  return <img ref={ref} className={finalClasses} {...props} />;
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef(({ className, ...props }: any, ref) => {
  const finalClasses = `flex h-full w-full items-center justify-center rounded-full bg-muted ${className || ''}`;
  return <span ref={ref} className={finalClasses} {...props} />;
});
AvatarFallback.displayName = "AvatarFallback";

// --- End of Embedded UI Components ---

// This is the core header component for the buyer's dashboard.
// It includes a logo, a search bar, a profile button, and a logout button.
const BuyerHeader = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Simulates a user for the profile display
  const mockUser = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c6db?w=150&h=150&fit=crop&crop=face"
  };

  const handleProfileClick = () => {
    console.log("Profile button clicked.");
    // In a real app, you would navigate to the profile page here.
    // router.push('/buyer/profile');
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, you would clear the user's session and navigate to the login page.
    router.push('page/');
  };

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/page')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to right, #F7418F, #FF894B)' }}>
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl">SheMarket</h1>
            </button>
          </div>

          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileClick}
              className="flex items-center gap-2"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Profile</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function App() { return <BuyerHeader />; }