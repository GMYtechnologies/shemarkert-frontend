"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Heart, 
  Edit, 
  ArrowLeft, 
  Upload,
  Camera
} from "lucide-react";

interface BuyerProfileProps {
  user: any;
  onBack: () => void;
}

export default function BuyerProfile({ user, onBack }: BuyerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState({
    username: user?.name || "Fashion Lover",
    email: user?.email || "user@example.com",
    phone: "",
    location: "",
    profileImage: "/images/default-avatar.png",
  });

  const [likedProducts, setLikedProducts] = useState<any[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedLikes = localStorage.getItem('likedProducts');
    
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    
    if (savedLikes) {
      setLikedProducts(JSON.parse(savedLikes));
    }
  }, []);

  // Calculate top interests from liked products
  const getTopInterests = () => {
    if (likedProducts.length === 0) return [];
    
    const categoryCount = likedProducts.reduce((acc: any, product: any) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryCount)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 3)
      .map(([category, count]) => ({ category, count }));
  };

  // Handle profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
      setSuccess('Profile image updated!');
      setTimeout(() => setSuccess(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Save profile data
  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsEditing(false);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Remove liked product
  const handleRemoveLike = (productId: number) => {
    const updatedLikes = likedProducts.filter(product => product.id !== productId);
    setLikedProducts(updatedLikes);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
  };

  const topInterests = getTopInterests();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Button>
        <h2 className="text-2xl font-semibold">My Profile</h2>
      </div>

      {/* Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Profile Information
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.profileImage} />
                    <AvatarFallback className="text-lg">
                      {profileData.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <Separator />

              {/* Profile Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Username</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.username}
                      onChange={(e) =>
                        setProfileData({ ...profileData, username: e.target.value })
                      }
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.username}</span>
                    </div>
                  )}
                </div>
 </div>
              {/* Save/Cancel Buttons */}
              {isEditing && (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} className="flex-1">
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
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Shopping Interests</CardTitle>
              <CardDescription>Based on your liked products</CardDescription>
            </CardHeader>
            <CardContent>
              {topInterests.length > 0 ? (
                <div className="space-y-3">
                  {topInterests.map(({ category, count }: any) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="capitalize">
                        {category.replace("-", " ")}
                      </span>
                      <Badge variant="secondary">{count} item{count !== 1 ? 's' : ''}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Start liking products to see your interests!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Liked Products */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Liked Products ({likedProducts.length})
              </CardTitle>
              <CardDescription>Products you've shown interest in</CardDescription>
            </CardHeader>
            <CardContent>
              {likedProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {likedProducts.map((product) => (
                    <Card key={product.id} className="group hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="w-16 h-20 relative flex-shrink-0">
                            <Image
                              src={product.image || '/images/placeholder.jpg'}
                              alt={product.name}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium line-clamp-2">{product.name}</h4>
                            <p className="text-lg font-semibold text-primary">
                              TZS {product.price?.toLocaleString() || 'N/A'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.shop?.name || 'Unknown Shop'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Liked on {product.likedDate ? new Date(product.likedDate).toLocaleDateString() : 'Recently'}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleRemoveLike(product.id)}
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No liked products yet</h3>
                  <p className="text-muted-foreground">
                    Start browsing and like products you're interested in!
                  </p>
                  <Button className="mt-4" onClick={onBack}>
                    Start Shopping
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
    