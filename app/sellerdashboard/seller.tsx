import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ThemeToggle from '../ThemeToggle';
import { useRouter } from 'next/navigation';
/*import ShopManagement from './ShopManagement';*/
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
  const router = useRouter();
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
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
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
  };

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
              <ThemeToggle size="sm" />
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

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="shops">My Shops</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          </Tabs>
    </div>
</div>
)
}