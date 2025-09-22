import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Store, 
  ShoppingBag, 
  Eye,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function DashboardNavigation() {
  const handleSellerDemo = () => {
    window.open('/dashboardPreview', '_blank');
  };

  const handleBuyerDemo = () => {
    window.open('/dashboardPreview', '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-garbata-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">Your Dashboard Updates Are Ready!</h1>
          <p className="text-muted-foreground text-lg">
            Click the buttons below to view your redesigned dashboards with all the new features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-garbata-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                <Store className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Seller Dashboard</CardTitle>
              <CardDescription>
                Enhanced with analytics, likes tracking, monthly growth charts, reviews system, and stock management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="w-full bg-garbata-gradient hover:opacity-90"
                onClick={handleSellerDemo}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Seller Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Buyer Dashboard</CardTitle>
              <CardDescription>
                Streamlined interface focused on single products with rating system and commenting functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="w-full"
                variant="outline"
                onClick={handleBuyerDemo}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Buyer Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Both dashboards are now fully functional with all the features you requested. 
            Open them in new tabs to explore the complete experience!
          </p>
        </div>
      </div>
    </div>
  );
}