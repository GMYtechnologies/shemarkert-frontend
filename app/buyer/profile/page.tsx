"use client";

import React, { useState, forwardRef } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Mail,
  Heart,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";

/* -------------------- Embedded UI Components (same as you had) -------------------- */

const Button = forwardRef(({ className, variant, size, ...props }: any, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const sizeClasses = size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-4 py-2";
  const variantClasses =
    variant === "outline"
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : variant === "ghost"
      ? "hover:bg-accent hover:text-accent-foreground"
      : "";
  const finalClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className || ""}`;
  return <button ref={ref} className={finalClasses} {...props} />;
});
Button.displayName = "Button";

const Card = forwardRef(({ className, ...props }: any, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ""}`} {...props} />
));
Card.displayName = "Card";

const CardHeader = forwardRef(({ className, ...props }: any, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className || ""}`} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, ...props }: any, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ className, ...props }: any, ref) => (
  <p ref={ref} className={`text-sm text-muted-foreground ${className || ""}`} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ className, ...props }: any, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className || ""}`} {...props} />
));
CardContent.displayName = "CardContent";

const Input = forwardRef(({ className, type, ...props }: any, ref) => {
  const baseClasses =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
  const finalClasses = `${baseClasses} ${className || ""}`;
  return <input type={type} className={finalClasses} ref={ref} {...props} />;
});
Input.displayName = "Input";

const Label = forwardRef(({ className, ...props }: any, ref) => (
  <label ref={ref} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`} {...props} />
));
Label.displayName = "Label";

const Avatar = forwardRef(({ className, ...props }: any, ref) => (
  <span ref={ref} className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ""}`} {...props} />
));
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef(({ className, ...props }: any, ref) => (
  <img ref={ref} className={`aspect-square h-full w-full ${className || ""}`} {...props} />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef(({ className, ...props }: any, ref) => (
  <span ref={ref} className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className || ""}`} {...props} />
));
AvatarFallback.displayName = "AvatarFallback";

const Badge = forwardRef(({ className, variant, ...props }: any, ref) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";
  const variantClasses = variant === "secondary" ? "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80" : "";
  const finalClasses = `${baseClasses} ${variantClasses} ${className || ""}`;
  return <span ref={ref} className={finalClasses} {...props} />;
});
Badge.displayName = "Badge";

const Separator = forwardRef(({ className, ...props }: any, ref) => (
  <div ref={ref} className={`shrink-0 bg-border h-[1px] w-full ${className || ""}`} {...props} />
));
Separator.displayName = "Separator";

/* -------------------- Header -------------------- */

const BuyerHeader = ({ onLogoutClick, onProfileClick, currentPage }: any) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const mockUser = {
    name: "",
    email: "",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332c6db?w=150&h=150&fit=crop&crop=face",
  };

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(to right, #F7418F, #FF894B)" }}
              >
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
                onChange={(e: any) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {currentPage !== "profile" && (
              <Button variant="ghost" size="sm" onClick={onProfileClick} className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">Profile</span>
              </Button>
            )}
            <Button onClick={() => router.push("/sellers")} variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

/* -------------------- BuyerProfile (MAIN) -------------------- */

const BuyerProfile = ({ user, onBack }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.name,
    email: user?.email,
    profileImage:
      user?.profileImage ||
      "https://images.unsplash.com/photo-1494790108755-2616b332c6db?w=150&h=150&fit=crop&crop=face",
  });

  // sample liked products so the grid visually matches your screenshot
  const likedProducts = [
    {
      id: 1,
      title: "Elegant Summer Dress",
      price: "TZS 225,000",
      shop: "Dar Fashion House",
      likedOn: "12/14/2024",
      image:
        "https://images.unsplash.com/photo-1520975914086-c4f5f0b0b8b6?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Designer Handbag",
      price: "TZS 400,000",
      shop: "Zanzibar Luxury",
      likedOn: "12/13/2024",
      image:
        "https://images.unsplash.com/photo-1524661135-33a6a7f96aef?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Silk Blouse",
      price: "TZS 189,000",
      shop: "Dar Fashion House",
      likedOn: "12/12/2024",
      image:
        "https://images.unsplash.com/photo-1533704056055-3c4b1d7c6b1b?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Wedding Gown",
      price: "TZS 800,000",
      shop: "Bridal Dreams Arusha",
      likedOn: "12/11/2024",
      image:
        "https://images.unsplash.com/photo-1520975914086-c4f5f0b0b8b6?w=400&h=400&fit=crop",
    },
  ];

  const topInterests: any[] = [];

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shopping
          </Button>
          <h2 className="text-2xl">My Profile</h2>
        </div>

        {/* MAIN GRID: Left stacked column (1) + Right content column (2) */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: profile + interests (sticky) */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Profile Card */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Profile Information</span>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profileData.profileImage} />
                      <AvatarFallback className="text-lg">
                        {profileData.username
                          ? profileData.username.charAt(0).toUpperCase()
                          : <User className="h-6 w-6" />}
                      </AvatarFallback>
                    </Avatar>

                    {isEditing && (
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      {isEditing ? (
                        <Input
                          id="username"
                          value={profileData.username || ""}
                          onChange={(e: any) => setProfileData({ ...profileData, username: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{profileData.username || "Not set"}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email || ""}
                          onChange={(e: any) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{profileData.email || "Not set"}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="bg-garbata-gradient hover:opacity-90">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Shopping Interests */}
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Interests</CardTitle>
                  <CardDescription>Based on your liked products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topInterests.length > 0 ? (
                      topInterests.map(({ category, count }: any) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="capitalize">{category.replace("-", " ")}</span>
                          <Badge variant="secondary">{count} items</Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">No interests found.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* RIGHT COLUMN: liked products */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Liked Products ({likedProducts.length})</span>
                </CardTitle>
                <CardDescription>Products you've shown interest in</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {likedProducts.map((p) => (
                    <div key={p.id} className="relative rounded-xl border p-4">
                      {/* heart button */}
                      <button className="absolute top-3 right-3 bg-card/60 border rounded-full p-1 hover:opacity-90">
                        <Heart className="h-4 w-4 text-red-500" />
                      </button>

                      <div className="flex gap-4">
                        <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden bg-muted">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">{p.title}</h3>
                          <p className="text-sm text-muted-foreground">{p.shop}</p>
                          <div className="mt-3 flex items-baseline justify-between">
                            <span className="text-pink-400 font-bold">{p.price}</span>
                            <span className="text-xs text-muted-foreground">Liked on {p.likedOn}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {likedProducts.length === 0 && (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg mb-2">No liked products yet</h3>
                      <p className="text-muted-foreground">Start browsing and like products you're interested in!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------- App wrapper -------------------- */

export default function App() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const mockUser = {
    name: "qbab",
    email: "annalisbruno8@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332c6db?w=150&h=150&fit=crop&crop=face",
  };

  const handleProfileClick = () => setCurrentPage("profile");
  const handleBack = () => setCurrentPage("dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BuyerHeader onProfileClick={handleProfileClick} currentPage={currentPage} />
      <main className="py-6">
        {currentPage === "dashboard" ? (
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-xl font-bold">Buyer Dashboard Content Goes Here...</h2>
            <p className="mt-2 text-muted-foreground">Click the profile button to view your profile.</p>
          </div>
        ) : (
          <BuyerProfile user={mockUser} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

