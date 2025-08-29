"use client";

import React, { useState } from "react";
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
import { User, Mail, Heart, Edit, Star, ArrowLeft } from "lucide-react";

interface BuyerProfileProps {
  user: any;
  onBack: () => void;
}

export default function BuyerProfile({ user, onBack }: BuyerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.name || "fashionlover2024",
    email: user?.email || "user@example.com",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b332c6db?w=150&h=150&fit=crop&crop=face",
  });

  // Mock liked products data
  const likedProducts = [
    {
      id: 1,
      name: "Elegant Summer Dress",
      category: "dresses",
      price: 225000,
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=250&fit=crop",
      shop: "Dar Fashion House",
      likedDate: "2024-12-15",
    },
    {
      id: 2,
      name: "Designer Handbag",
      category: "bags",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=250&fit=crop",
      shop: "Zanzibar Luxury",
      likedDate: "2024-12-14",
    },
    {
      id: 3,
      name: "Silk Blouse",
      category: "tops",
      price: 189000,
      image:
        "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=200&h=250&fit=crop",
      shop: "Dar Fashion House",
      likedDate: "2024-12-13",
    },
    {
      id: 4,
      name: "Wedding Gown",
      category: "wedding-dresses",
      price: 800000,
      image:
        "https://images.unsplash.com/photo-1594736797933-d0d2d19b2d10?w=200&h=250&fit=crop",
      shop: "Bridal Dreams Arusha",
      likedDate: "2024-12-12",
    },
    {
      id: 5,
      name: "Casual Jeans",
      category: "denims",
      price: 150000,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=250&fit=crop",
      shop: "Denim World Mwanza",
      likedDate: "2024-12-11",
    },
  ];

  // Get top interests based on liked products categories
  const getTopInterests = () => {
    const categoryCount = likedProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category, count]) => ({ category, count }));
  };

  const topInterests = getTopInterests();

  const handleSaveProfile = () => {
    // In a real app, save to API here
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} type="button">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Button>
        <h2 className="text-2xl">My Profile</h2>
      </div>

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
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24">
                  {/* Keep AvatarImage as-is (your UI lib handles it) */}
                  <AvatarImage src={profileData.profileImage} />
                  <AvatarFallback className="text-lg">
                    {profileData.username.charAt(0).toUpperCase()}
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
                      value={profileData.username}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.email}</span>
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
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Shopping Interests</CardTitle>
              <CardDescription>Based on your liked products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topInterests.map(({ category, count }) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="capitalize">{category.replace("-", " ")}</span>
                    <Badge variant="secondary">{count} items</Badge>
                  </div>
                ))}
              </div>
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
              <div className="grid md:grid-cols-2 gap-4">
                {likedProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="w-16 h-20 relative">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            style={{ objectFit: "cover", borderRadius: 8 }}
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm line-clamp-2">{product.name}</h4>
                          <p className="text-lg text-primary">TZS {product.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{product.shop}</p>
                          <p className="text-xs text-muted-foreground">
                            Liked on {new Date(product.likedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {likedProducts.length === 0 && (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg mb-2">No liked products yet</h3>
                  <p className="text-muted-foreground">Start browsing and like products you're interested in!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
