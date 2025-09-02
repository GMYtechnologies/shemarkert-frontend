"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BuyerHeader from "@/components/BuyerHeader";
import { Heart, Star, User } from "lucide-react";
import ProductDetailsDialog from "@/components/ProductDetailsDialog";
import Categories from "../categories";
import BuyerProfile from "@/components/BuyerProfile";

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
  shops: Shop[];
}

interface BuyerDashboardProps {
  user: any;
}

export default function BuyerDashboard({  }: BuyerDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [shopRatings, setShopRatings] = useState<Record<number, number>>({});

  const products: Product[] = [
    {
      id: 1,
      name: "Elegant Summer Dress",
      category: "dresses",
      price: 225000,
      image:
        "/images/summerdress.jpeg",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Pink", "Blue", "White"],
      description:
        "Perfect for summer occasions with flowy fabric and elegant design.",
      rating: 4.8,
      likes: 245,
      shops: [
        { id: 1, name: "Dar Fashion House", rating: 4.9, location: "Dar es Salaam", contact: "+255 754 123 456" },
        { id: 2, name: "Arusha Style Studio", rating: 4.7, location: "Arusha", contact: "+255 765 987 654" },
        { id: 3, name: "Mwanza Boutique", rating: 4.6, location: "Mwanza", contact: "+255 789 123 567" },
        { id: 4, name: "Dodoma Fashion", rating: 4.8, location: "Dodoma", contact: "+255 756 234 890" },
        { id: 5, name: "Zanzibar Style", rating: 4.9, location: "Stone Town, Zanzibar", contact: "+255 777 345 678" },
        { id: 6, name: "Kilimanjaro Chic", rating: 4.5, location: "Moshi", contact: "+255 768 456 789" },
        { id: 7, name: "Tanga Trends", rating: 4.4, location: "Tanga", contact: "+255 745 567 890" },
        { id: 8, name: "Morogoro Mode", rating: 4.7, location: "Morogoro", contact: "+255 756 678 901" },
      ],
    },
    {
      id: 2,
      name: "Designer Handbag",
      category: "bags",
      price: 400000,
      image:
        "/images/handbag.jpeg",
      sizes: ["One Size"],
      colors: ["Black", "Brown", "Tan"],
      description:
        "Luxury handbag made from premium materials with modern design.",
      rating: 4.9,
      likes: 189,
      shops: [
        { id: 3, name: "Zanzibar Luxury", rating: 4.8, location: "Stone Town, Zanzibar", contact: "+255 777 246 813" },
        { id: 1, name: "Dar Fashion House", rating: 4.9, location: "Dar es Salaam", contact: "+255 754 123 456" },
        { id: 9, name: "Luxury Bags Arusha", rating: 4.6, location: "Arusha", contact: "+255 782 345 678" },
        { id: 10, name: "Mwanza Accessories", rating: 4.5, location: "Mwanza", contact: "+255 794 567 890" },
      ],
    },
    {
      id: 3,
      name: "Silk Blouse",
      category: "tops",
      price: 189000,
      image:
        "/images/silkblouse.jpeg",
      sizes: ["XS", "S", "M", "L"],
      colors: ["White", "Cream", "Light Blue"],
      description: "Premium silk blouse perfect for professional and casual wear.",
      rating: 4.6,
      likes: 156,
      shops: [
        { id: 1, name: "Dar Fashion House", rating: 4.9, location: "Dar es Salaam", contact: "+255 754 123 456" },
        { id: 4, name: "Mwanza Chic", rating: 4.5, location: "Mwanza", contact: "+255 789 369 258" },
        { id: 11, name: "Silk Boutique Dodoma", rating: 4.7, location: "Dodoma", contact: "+255 756 789 012" },
        { id: 12, name: "Elegant Wear Zanzibar", rating: 4.8, location: "Zanzibar", contact: "+255 777 890 123" },
        { id: 13, name: "Professional Style Arusha", rating: 4.6, location: "Arusha", contact: "+255 785 123 456" },
        { id: 14, name: "Classy Tops Mwanza", rating: 4.4, location: "Mwanza", contact: "+255 793 456 789" },
      ],
    },
    {
      id: 4,
      name: "Maternity Dress",
      category: "maternity",
      price: 185000,
      image:
        "/images/maternitydress.jpeg",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy", "Pink", "Burgundy"],
      description: "Comfortable and stylish maternity dress for expecting mothers.",
      rating: 4.7,
      likes: 132,
      shops: [{ id: 5, name: "Mama Style Dodoma", rating: 4.6, location: "Dodoma", contact: "+255 756 123 789" }],
    },
    {
      id: 5,
      name: "Wedding Gown",
      category: "wedding-dresses",
      price: 800000,
      image:
        "/images/weddingdress.jpeg",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Ivory", "Champagne"],
      description: "Exquisite wedding gown with intricate lace details and flowing train.",
      rating: 4.9,
      likes: 298,
      shops: [{ id: 6, name: "Bridal Dreams Arusha", rating: 4.8, location: "Arusha", contact: "+255 767 456 123" }],
    },
    {
      id: 6,
      name: "Casual Jeans",
      category: "denims",
      price: 150000,
      image:
        "/images/denimjeans.jpeg",
      sizes: ["26", "28", "30", "32", "34"],
      colors: ["Blue", "Black", "Light Blue"],
      description: "Comfortable casual jeans perfect for everyday wear.",
      rating: 4.4,
      likes: 87,
      shops: [{ id: 7, name: "Denim World Mwanza", rating: 4.3, location: "Mwanza", contact: "+255 784 567 890" }],
    },
    {
      id: 7,
      name: "Gym Leggings",
      category: "sportswear",
      price: 85000,
      image:
        "/images/gymleggings.jpeg",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Grey", "Purple"],
      description: "High-quality athletic leggings for workouts and active lifestyle.",
      rating: 4.6,
      likes: 156,
      shops: [{ id: 8, name: "FitZone Dar", rating: 4.7, location: "Dar es Salaam", contact: "+255 756 789 012" }],
    },
    {
      id: 8,
      name: "Evening Heels",
      category: "shoes",
      price: 275000,
      image:
        "/images/eveningheels.jpeg",
      sizes: ["36", "37", "38", "39", "40"],
      colors: ["Black", "Red", "Gold"],
      description: "Elegant evening heels perfect for special occasions and formal events.",
      rating: 4.8,
      likes: 203,
      shops: [{ id: 9, name: "Sole Sisters", rating: 4.9, location: "Arusha", contact: "+255 745 234 567" }],
    },
    {
      id: 9,
      name: "Bikini Set",
      category: "bikinis",
      price: 120000,
      image:
        "/images/bikiniset.jpeg",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Coral", "Turquoise", "Black"],
      description: "Stylish bikini set perfect for beach vacations and poolside relaxation.",
      rating: 4.5,
      likes: 98,
      shops: [{ id: 10, name: "Beach Vibes Zanzibar", rating: 4.6, location: "Zanzibar", contact: "+255 778 345 678" }],
    },
    {
      id: 10,
      name: "Hair Extension Bundle",
      category: "hair-extensions",
      price: 320000,
      image:
        "/images/hairextensions.jpeg",
      sizes: ['14"', '16"', '18"', '20"'],
      colors: ["Black", "Brown", "Blonde"],
      description: "Premium quality human hair extensions for natural looking length and volume.",
      rating: 4.9,
      likes: 421,
      shops: [{ id: 11, name: "Hair Palace", rating: 4.8, location: "Dar es Salaam", contact: "+255 765 456 789" }],
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRateShop = (shopId: number, rating: number) => {
    setShopRatings((prev) => ({ ...prev, [shopId]: rating }));

    const shopName = selectedProduct?.shops.find((shop) => shop.id === shopId)?.name;
    alert(`Thank you for rating ${shopName}! Your ${rating}-star rating has been submitted.`);
  };

  if (showProfile) {
    return (
      <div className="min-h-screen bg-background">
        <BuyerHeader user={User} onProfileClick={() => setShowProfile(false)} showSearch={false} currentPage="profile" />
        <div className="container mx-auto px-6 py-6">
          <BuyerProfile user={User} onBack={() => setShowProfile(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <BuyerHeader
        user={User}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onProfileClick={() => setShowProfile(true)}
        currentPage="dashboard"
      />

      <div className="container mx-auto px-6">
        {/* Compact Categories */}
        <Categories selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} mode="buyer" compact={true} />

        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="flex items-center gap-4 mb-6 p-4 bg-accent rounded-lg">
            <span className="text-sm">Active filters:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-2">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("")} className="ml-1 text-xs">×</button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-2">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="ml-1 text-xs">×</button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={() => { setSelectedCategory(""); setSearchQuery(""); }}>
              Clear all
            </Button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all cursor-pointer">
              <div onClick={() => setSelectedProduct(product)}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                  />
                  <Button size="sm" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg text-primary">TZS {product.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{product.likes} likes</span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                  <div className="text-xs text-muted-foreground">
                    Available at {product.shops.length} shop{product.shops.length !== 1 ? "s" : ""}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or browse different categories</p>
            <Button onClick={() => { setSelectedCategory(""); setSearchQuery(""); }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Compact Product Details Dialog */}
      <ProductDetailsDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        shopRatings={shopRatings}
        onRateShop={handleRateShop}
      />
    </div>
  );
}
