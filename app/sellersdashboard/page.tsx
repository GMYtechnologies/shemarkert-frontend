"use client";
import React, { useState } from 'react';
import { Activity } from "lucide-react";
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
  Star,
  Store, 
  User, 
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Heart,
  Eye,
  Mail,
  Edit,
  UsersRound
} from 'lucide-react';
import { ModeToggle } from '../sellers/page';
import { useRouter } from "next/navigation";
import router from 'next/router';

type Product = {
  id: string;
  name: string;
  price: number;
  likes: number;
  views: number;
};
type Review = {
  id: string;
  product: string;
  comment: string;
  customerName: string;
  date?: string; 
};

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
  const [monthlyViews, setMonthlyViews] = useState<number | null>(null);
  const [monthlyLikes, setMonthlyLikes] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shops' | 'profile' | 'analytics' | 'reviews'>('dashboard');
  const topProducts = [
  {
    id: 'tp1',
    name: 'Summer Maxi Dress',
    image: '/images/maxi.jpg',
    category: 'Dresses',
    sales: 320,
    reviews: 45,
  },
  // Add more products as needed
];


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
  const mockProducts: Product[] = [
    { id: 'p1', name: 'Elegant Red Dress', price: 120000, likes: 250, views: 1500 },
    { id: 'p2', name: 'Casual Blue Jeans', price: 80000, likes: 180, views: 1200 },
    //... more products
  ];
  const mockReviews: Review[] = [
    { id: 'r1', product: 'Elegant Red Dress', comment: 'Absolutely love this dress! Fits perfectly and the quality is top-notch.', customerName: 'Amina M.', date: '2025-08-28' },
    { id: 'r2', product: 'Casual Blue Jeans', comment: 'Great jeans for everyday wear. Very comfortable and stylish.', customerName: 'Zawadi K.', date: '2025-08-30' },
    { id: 'r3', product: 'Kitenge Wrap Skirt', comment: 'Beautiful colors and perfect for hot weather!', customerName: 'Neema J.', date: '2025-09-01' },
  ];
  

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

  //=====Derive metrics=====
  const totalLikes = mockProducts.reduce((sum, product) => sum + product.likes, 0);
  const totalViews = mockProducts.reduce((sum, product) => sum + product.views, 0);
const avgCommentLength =
  mockReviews.reduce((sum, review) => sum + review.comment.length, 0) / mockReviews.length || 0;

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
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

         <TabsContent value="dashboard">
            {/* Top Metrics Cards - Only Likes and Views */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Likes</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{totalLikes.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    +15% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">TotalViews</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{totalViews.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    +8% this month
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Performance - Simplified without stock info */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Most liked products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProducts.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-garbata-gradient rounded-full flex items-center justify-center text-white text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">TZS {product.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span className="text-sm text-primary">{product.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-muted-foreground">{product.views}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
          
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>Latest feedback from buyers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl text-primary">{avgRating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{mockReviews.length} reviews</span>
                  </div>
                  <div className="space-y-3">
                    {mockReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="border-l-2 border-primary pl-3">
                        <p className="text-sm">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">{review.product}</p>
                      </div>
                    ))}
                  </div>
                  {/* <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab('reviews')}>
                    View All Reviews
                  </Button> */}
                </CardContent>
              </Card>
              </div>
          </TabsContent>


            

              
          <TabsContent value="reviews">
            {/* Simplified Reviews Dashboard - No Charts */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>Overview of customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-6xl space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl">Customer Reviews</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-lg">{avgRating.toFixed(1)} / 5.0</span>
                  </div>
                  <p className="text-muted-foreground">{mockReviews.length} total reviews</p>
                </div>
              </div>
              </div>
            

              {/* Individual Reviews */}
              <div className="space-y-4">
                <h3 className="text-lg">All Reviews</h3>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>{review.customerName.charAt(0)} </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm">{review.customerName}</h4>
                              
                              </div>
                              <p className="text-xs text-muted-foreground">{review.product}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{review.comment}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Heart className="h-3 w-3 mr-1" />
                            Helpful
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              </CardContent>
            
            
            </Card>
           </TabsContent>

          <TabsContent value="shops">
            <ShopManagement 
              onShopSelect={setSelectedShop}
              selectedShop={selectedShop}
            />
          </TabsContent>

          

          <TabsContent value="analytics">
            {/* Simplified Analytics Dashboard - No Charts */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Monthly Views</CardTitle>
                  <Eye className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{monthlyViews}</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +12% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Monthly Likes</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{monthlyLikes}</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +18% growth
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Avg. Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-primary">{avgRating.toFixed(1)}★</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +0.3 this month
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Performance Summary */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Ranked by engagement (likes and views)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProducts.sort((a, b) => b.likes - a.likes).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="text-sm">{product.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Heart className="h-3 w-3 text-red-500" />
                              {product.likes}
                              <Eye className="h-3 w-3 text-blue-500" />
                              {product.views}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-primary">TZS {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Insights</CardTitle>
                  <CardDescription>Key business observations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">Growth Trend</span>
                    </div>
                    <p className="text-xs text-green-700">Your product likes increased by 18% this month</p>
                  </div>

                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-800">Top Performer</span>
                    </div>
                    <p className="text-xs text-blue-700">Elegant Summer Dress is your most liked product</p>
                  </div>

                  <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <UsersRound className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-purple-800">Customer Insight</span>
                    </div>
                    <p className="text-xs text-purple-700">Average rating improved by 0.3 stars</p>
                  </div>

                  <div className="p-3 bg-pink-50 border-l-4 border-pink-500 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-pink-600" />
                      <span className="text-sm text-pink-800">Engagement Rate</span>
                    </div>
                    <p className="text-xs text-pink-700">76% engagement rate - Great job!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


