import React from 'react';
import router, { useRouter } from "next/navigation"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  ShoppingBag, 
  User, 
  Activity,
  Eye,
  Heart,
  Star,
  MessageSquare,
  BarChart3,
  Package,
  ArrowRight
} from 'lucide-react';

export default function DashboardPreview() {
    const router = useRouter();

  const sellerFeatures = [
    { icon: BarChart3, label: "Analytics with Likes Tracking", description: "Monitor product performance and customer engagement" },
    { icon: Activity, label: "Monthly Growth Graphs", description: "Track views and likes over time with visual charts" },
    { icon: Package, label: "Multi-Shop Stock Management", description: "Manage inventory across multiple shops efficiently" },
    { icon: MessageSquare, label: "Customer Reviews Page", description: "View and respond to buyer feedback and comments" },
    { icon: Eye, label: "Product Performance Metrics", description: "See detailed stats on product views and engagement" },
    { icon: Star, label: "Rating System", description: "Track customer satisfaction and product ratings" }
  ];

  const buyerFeatures = [
    { icon: ShoppingBag, label: "Single Product Focus", description: "Redesigned interface for individual product browsing" },
    { icon: Star, label: "Product Rating System", description: "Rate products and see average ratings from other buyers" },
    { icon: MessageSquare, label: "Product Comments", description: "Leave comments and read reviews on specific products" },
    { icon: Heart, label: "Product Interaction", description: "Like products and engage with sellers directly" },
    { icon: User, label: "Streamlined Navigation", description: "Simplified interface removing multi-shop complexity" },
    { icon: Eye, label: "Enhanced Product Details", description: "Rich product information with seller contact details" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-4">SheMarket Dashboard Updates</h1>
          <p className="text-muted-foreground mb-6">
            View your recently redesigned seller and buyer dashboards with enhanced features
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-garbata-gradient hover:opacity-90"
              onClick={() => router.push('/demo-seller')}
            >
              <Store className="h-5 w-5 mr-2" />
              View Seller Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push('/demo-buyer')}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              View Buyer Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Seller Dashboard Features */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-garbata-gradient rounded-full flex items-center justify-center">
                  <Store className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Seller Dashboard Updates</CardTitle>
                  <CardDescription>Enhanced analytics and management tools</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sellerFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                  <feature.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm">{feature.label}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
              <Button 
                className="w-full mt-4 bg-garbata-gradient hover:opacity-90"
                onClick={() => router.push('/demo-seller')}
              >
                Explore Seller Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Buyer Dashboard Features */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Buyer Dashboard Updates</CardTitle>
                  <CardDescription>Streamlined shopping experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {buyerFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                  <feature.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm">{feature.label}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
              <Button 
                className="w-full mt-4"
                variant="outline"
                onClick={() => router.push('/demo-buyer')}
              >
                Explore Buyer Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-accent rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg mb-2">Key Updates Summary</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Analytics Dashboard</Badge>
                <Badge variant="secondary">Product Likes Tracking</Badge>
                <Badge variant="secondary">Monthly Growth Charts</Badge>
                <Badge variant="secondary">Reviews System</Badge>
                <Badge variant="secondary">Product Comments</Badge>
                <Badge variant="secondary">Stock Management</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => router.push('/')}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}