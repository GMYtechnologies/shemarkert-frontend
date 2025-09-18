'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import "./globals.css";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/sellers';
import BuyerHeader from '@/components/BuyerHeader';
import Categories from '@/components/Categories';
import BuyerProfile from '@/components/BuyerProfile';
import ProductDetailsDialog from '@/components/ProductDetailsDialog';
import { 

  Heart, 
  Star,
  Loader2

} from 'lucide-react';

// Types
interface Shop {
  id: number;
  name: string;
  rating: number;
  location: string;
  contact: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
  description: string;
  rating: number;
  likes: number;
  shop: Shop;
  sellerId: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface BuyerDashboardProps {
  user: User;
}

interface Comment {
  id: number;
  text: string;
  author: string;
  date: string;
  likes: number;
}

export default function BuyerDashboard({ user }: BuyerDashboardProps) {
  const router = useRouter();
  
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [productRatings, setProductRatings] = useState<Record<number, number>>({});
  const [productComments, setProductComments] = useState<Record<number, Comment[]>>({});
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // If using JWT
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products || []);
        
        // Extract unique categories from products
        
        const uniqueCategories = [...new Set(data.products.map((product: Product) => product.category))];
        setCategories(uniqueCategories);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch product ratings and comments
  const fetchProductInteractions = async () => {
    try {
      const response = await fetch('/api/products/interactions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProductRatings(data.ratings || {});
          setProductComments(data.comments || {});
        }
      }
    } catch (err) {
      console.error('Error fetching product interactions:', err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchProducts();
    fetchProductInteractions();
  }, []);

  // Refresh products when a new product is uploaded
  const handleProductUpdate = () => {
    fetchProducts();
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shop.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle product rating
  const handleRateProduct = async (productId: number, rating: number) => {
    try {
      const response = await fetch('/api/products/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId,
          rating,
          userId: user.id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProductRatings(prev => ({
            ...prev,
            [productId]: rating
          }));
          
          // Update product rating in the products list
          setProducts(prev => prev.map(product => 
            product.id === productId 
              ? { ...product, rating: data.newAverageRating }
              : product
          ));
          
          alert(`Thank you for rating this product! Your ${rating}-star rating has been submitted.`);
        }
      }
    } catch (error) {
      console.error('Error rating product:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  // Handle adding comment
  const handleAddComment = async (productId: number, comment: string) => {
    try {
      const response = await fetch('/api/products/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId,
          comment,
          userId: user.id,
          userName: user.name
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const newComment: Comment = {
            id: data.commentId,
            text: comment,
            author: user.name || 'Anonymous User',
            date: new Date().toLocaleDateString(),
            likes: 0
          };
          
          setProductComments(prev => ({
            ...prev,
            [productId]: [...(prev[productId] || []), newComment]
          }));
        }
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  // Handle liking a product
  const handleLikeProduct = async (productId: number) => {
    try {
      const response = await fetch('/api/products/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId,
          userId: user.id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update product likes in the products list
          setProducts(prev => prev.map(product => 
            product.id === productId 
              ? { ...product, likes: data.newLikesCount }
              : product
          ));
        }
      }
    } catch (error) {
      console.error('Error liking product:', error);
    }
  };

  // Show profile view
  if (showProfile) {
    return (
      <div className="min-h-screen bg-background">
        <BuyerHeader 
          user={user}
          onProfileClick={() => setShowProfile(false)}
          showSearch={false}
          currentPage="profile"
        />
        <div className="container mx-auto px-6 py-6">
          <BuyerProfile user={user} onBack={() => setShowProfile(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <BuyerHeader 
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onProfileClick={() => setShowProfile(true)}
        currentPage="dashboard"
      />

      <div className="container mx-auto px-6">
         <ModeToggle />
        {/* Dynamic Categories */}
        <Categories 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          
          mode="buyer"
          compact={true}
        />

        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="flex items-center gap-4 mb-6 p-4 bg-accent rounded-lg">
            <span className="text-sm">Active filters:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-2">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('')} className="ml-1 text-xs">×</button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-2">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="ml-1 text-xs">×</button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSelectedCategory('');
                setSearchQuery('');
              }}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-destructive/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="text-lg mb-2">Error Loading Products</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => fetchProducts()}>
              Try Again
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all cursor-pointer">
                <div onClick={() => setSelectedProduct(product)}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-product.jpg'; // Fallback image
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeProduct(product.id);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg text-primary">TZS {product.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{product.likes} likes</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Sold by {product.shop.name}</span>
                      <span className="bg-secondary px-2 py-1 rounded capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Products Found */}
        {!loading && !error && filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or browse different categories
            </p>
            <Button onClick={() => {
              setSelectedCategory('');
              setSearchQuery('');
            }}>
              Clear filters
            </Button>
          </div>
        )}

        { /* No Products Available */ }
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-2">No products available</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to discover amazing products when sellers upload them!
            </p>
            <Button onClick={() => fetchProducts()}>
              Refresh
            </Button>
          </div>
        )}
      </div>

      { /* Product Details Dialog */ }
      <ProductDetailsDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        productRating={productRatings[selectedProduct?.id || 0] || 0}
        onRateProduct={handleRateProduct}
        comments={productComments[selectedProduct?.id || 0] || []}
        onAddComment={handleAddComment}
      />
    </div>
  );
}