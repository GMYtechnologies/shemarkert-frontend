"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ShopManagement from '../ShopManagement';
import { Label } from "@/components/ui/label"
import { 
  Store, 
  User, 
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Heart,
  Eye,
  Mail,
  Edit
} from 'lucide-react';
import { ModeToggle } from '../sellers/page';
import { useRouter } from "next/navigation";
import router from 'next/router';


interface Shop {
  id: string;
  name: string;
  description: string;
  location: string;
  contact: string;
  email: string;
  image: string;
  rating: number;
  totalProducts: number;
  products: any[];
}

interface SellerDashboardProps {
  user: any;
}
export default function SellerDashboard({ user }: SellerDashboardProps) {
  const navigate = useRouter();
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [editingShopId, setEditingShopId] = useState<string | null>(null);
  
  // Mock shops data - in real app would come from API
  const [shops, setShops] = useState<Shop[]>([
    {
      id: '1',
      name: 'Dar Fashion House',
      description: 'Premium women\'s fashion boutique offering the latest trends and timeless pieces.',
      location: 'Dar es Salaam, Tanzania',
      contact: '+255 754 123 456',
      email: 'info@darfashion.com',
      image: '/images/landingshop.jpeg',
      rating: 4.8,
      totalProducts: 25,
      products: []
    }
  ]);

  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    location: '',
    contact: '',
    email: '',
    image: ''
  });

  const totalShops = shops.length;
  const totalProducts = shops.reduce((sum, shop) => sum + shop.totalProducts, 0);
  const totalValue = shops.reduce((sum, shop) => sum + (shop.totalProducts * 150000), 0); // Average price estimate
  const avgRating = shops.reduce((sum, shop) => sum + shop.rating, 0) / shops.length;

  const handleEditShop = (shop: Shop) => {
    setEditingShopId(shop.id);
    setEditFormData({
      name: shop.name,
      description: shop.description,
      location: shop.location,
      contact: shop.contact,
      email: shop.email,
      image: shop.image
    });
  };

  const handleSaveShopEdit = () => {
    setShops(shops.map(shop => 
      shop.id === editingShopId 
        ? { ...shop, ...editFormData }
        : shop
    ));
    setEditingShopId(null);
    alert('Shop profile updated successfully!');
  };//
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
                <h1 className="text-xl">Welcome back, {user?.name || 'Fashion Entrepreneur'}</h1>
                <p className="text-muted-foreground">Seller Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
             <Button onClick={() => router.push('/subscription')} variant="outline">
                Subscription
              </Button>
              <Button onClick={() => router.push('/')} variant="ghost">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8" >
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="shops">My Shops</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Shops</CardTitle>
                  <Store className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{totalShops}</div>
                  <p className="text-xs text-muted-foreground">active shops</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Products</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{totalProducts}</div>
                  <p className="text-xs text-muted-foreground">across all shops</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Estimated Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">TZS {totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">inventory value</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Average Rating</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{avgRating.toFixed(1)}★</div>
                  <p className="text-xs text-muted-foreground">shop ratings</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Overview</CardTitle>
                  <CardDescription>Your selling journey at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Business Growth</span>
                    <div className="flex items-center gap-2 w-32">
                      <div className=" h-2 bg-secondary rounded-full overflow-hidden">
                     <div className="bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '75%' }}>

                      </div>
                      <span className="text-sm">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shop Performance</span>
                    <div className="flex items-center gap-2 w-32">
                      <div className=" w-48 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-2 bg-gradient -to-r from-purple-500 to-pink-500" style={{ width: '87%' }}>
                      </div>
                      <span className="text-sm">87%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Satisfaction</span>
                    <div className="flex items-center gap-2 w-32">
                      <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '94%' }}>
                      </div>
                      <span className="text-sm">94%</span>
                    </div>
                  </div>
                </div>
              </div>
             </div>
             </CardContent>
             </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Statistics</CardTitle>
                  <CardDescription>Key metrics for your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      Profile Views
                    </span>
                    <span className="text-primary">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Customer Inquiries
                    </span>
                    <span className="text-primary">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      Product Favorites
                    </span>
                    <span className="text-primary">345</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shops">
            <ShopManagement 
              onShopSelect={setSelectedShop}
              selectedShop={selectedShop}
            />
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-4xl space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl">Shop Profiles</h2>
                <p className="text-muted-foreground">Manage your shop information</p>
              </div>

              <div className="space-y-6">
                {shops.map((shop, index) => (
                  <Card key={shop.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Shop {index + 1}: {shop.name}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditShop(shop)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={shop.image} />
                          <AvatarFallback>{shop.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg">{shop.name}</h3>
                          <p className="text-muted-foreground">{shop.location}</p>
                          <p className="text-sm text-muted-foreground">{shop.contact}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Heart className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span>{shop.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{shop.totalProducts} products</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{shop.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">2,847</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Shop Ratings</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{avgRating.toFixed(1)}★</div>
                  <p className="text-xs text-muted-foreground">Based on customer reviews</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Inquiries</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">89</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Favorites</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">345</div>
                  <p className="text-xs text-muted-foreground">Products favorited</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your business performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Business Visibility</span>
                    <div className="flex items-center gap-2 w-32">
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="w-32 h-2 bg-gradient -to-r from-purple-500 to-pink-500" style={{ width: '75%' }}>
                      </div>
                      <span className="text-sm">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Engagement</span>
                    <div className="flex items-center gap-2 w-32">
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="w-32 h-2 bg-gradient -to-r from-purple-500 to-pink-500" style={{ width: '87%' }}>
                      </div>
                      <span className="text-sm">87%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Product Quality Rating</span>
                    <div className="flex items-center gap-2 w-32">
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="w-32 h-2 bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '94%' }}>
                      </div>
                      <span className="text-sm">94%</span>
                    </div>
                  </div>
                </div>
             </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Shop Profile Modal */}
      {editingShopId && (
        <Dialog open={!!editingShopId} onOpenChange={() => setEditingShopId(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Shop Profile</DialogTitle>
              <DialogDescription>Update your shop information and details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-shop-name">Shop Name</Label>
                  <Input
                    id="edit-shop-name"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={editFormData.location}
                    onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={editFormData.contact}
                    onChange={(e) => setEditFormData({...editFormData, contact: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">Shop Image URL</Label>
                <Input
                  id="edit-image"
                  value={editFormData.image}
                  onChange={(e) => setEditFormData({...editFormData, image: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Shop Description</Label>
                <Textarea
                  id="edit-description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveShopEdit} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingShopId(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        )
      }
        </TabsContent>
     </Tabs>
    </div>
    </div>
  );
}


