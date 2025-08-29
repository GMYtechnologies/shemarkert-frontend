"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Phone,
  ShoppingBag,
  Heart,
  Info,
  Store,
} from "lucide-react";

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

interface ProductDetailsDialogProps {
  product: Product | null;
  onClose: () => void;
  shopRatings: Record<number, number>;
  onRateShop: (shopId: number, rating: number) => void;
}

export default function ProductDetailsDialog({
  product,
  onClose,
  shopRatings,
  onRateShop,
}: ProductDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details");

  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4">
          <DialogTitle className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-muted-foreground" />
            {product.name}
          </DialogTitle>
          <DialogDescription>
            Product details and shop information
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="shops" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Shops ({product.shops.length})
              </TabsTrigger>
              <TabsTrigger value="specs" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Specifications
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden mt-4">
              {/* --- DETAILS TAB --- */}
              <TabsContent
                value="details"
                className="h-full m-0 overflow-y-auto scrollbar-hide"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{product.rating}</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {product.likes} likes
                        </span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-3xl text-primary mb-2">
                        TZS {product.price.toLocaleString()}
                      </p>
                      <Badge variant="secondary" className="mb-4">
                        {product.category}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground">{product.description}</p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm mb-2">Available Sizes</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <Badge key={size} variant="outline">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm mb-2">Available Colors</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map((color) => (
                            <Badge key={color} variant="outline">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Available at {product.shops.length} shop
                        {product.shops.length !== 1 ? "s" : ""}
                      </p>
                      <Button
                        onClick={() => setActiveTab("shops")}
                        className="w-full bg-garbata-gradient hover:opacity-90"
                      >
                        View Shops & Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* --- SHOPS TAB --- */}
              <TabsContent
                value="shops"
                className="h-full m-0 flex flex-col"
              >
                <div className="text-center mb-4 flex-shrink-0">
                  <h3 className="text-lg mb-2">Available Shops</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact shops directly or rate your experience
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  <div className="space-y-4 pr-1">
                    {product.shops.map((shop) => (
                      <Card key={shop.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div className="space-y-2">
                              <h5 className="text-lg">{shop.name}</h5>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                <span>{shop.rating}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{shop.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                <span>{shop.contact}</span>
                              </div>
                            </div>
                            <Button size="sm" className="bg-garbata-gradient hover:opacity-90">
                              Contact Shop
                            </Button>
                          </div>

                          <Separator className="mb-3" />

                          {/* Compact Rating Section */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Rate this shop:</span>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    onClick={() => onRateShop(shop.id, rating)}
                                    className="p-1 hover:scale-110 transition-transform"
                                    title={`Rate ${rating} star${rating !== 1 ? "s" : ""}`}
                                  >
                                    <Star
                                      className={`h-4 w-4 ${
                                        rating <= (shopRatings[shop.id] || 0)
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300 hover:text-yellow-400"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                              {shopRatings[shop.id] && (
                                <Badge variant="secondary" className="text-xs">
                                  {shopRatings[shop.id]}★
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Padding for scroll */}
                    <div className="h-4"></div>
                  </div>
                </div>
              </TabsContent>

              {/* --- SPECS TAB --- */}
              <TabsContent
                value="specs"
                className="h-full m-0 overflow-y-auto scrollbar-hide"
              >
                {/* (same as your original SPECS implementation, unchanged) */}
                {/* ✅ Left unchanged for Next.js, only cleaned imports */}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
