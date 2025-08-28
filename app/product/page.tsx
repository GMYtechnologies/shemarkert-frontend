'use client';

import React, { useState } from 'react';
import {Dialog }from '@/components/ui/dialog';

// Next.js page props structure
interface PageProps {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Your product and shop interfaces
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

// Sample data - replace with your actual data fetching
const sampleProduct: Product = {
  id: 1,
  name: "Sample Product",
  category: "Fashion",
  price: 50000,
  image: "/placeholder-product.jpg",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Blue", "Green"],
  description: "This is a sample product description.",
  rating: 4.5,
  likes: 120,
  shops: [
    {
      id: 1,
      name: "Sample Shop 1",
      rating: 4.8,
      location: "Dar es Salaam",
      contact: "+255 123 456 789"
    },
    {
      id: 2,
      name: "Sample Shop 2",
      rating: 4.2,
      location: "Dodoma",
      contact: "+255 987 654 321"
    }
  ]
};

// This is a Next.js page component - it should NOT accept ProductDetailsDialogProps
export default function ProductPage({ params, searchParams }: PageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopRatings, setShopRatings] = useState<Record<number, number>>({});

  const handleOpenDialog = () => {
    setSelectedProduct(sampleProduct);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleRateShop = (shopId: number, rating: number) => {
    setShopRatings(prev => ({
      ...prev,
      [shopId]: rating
    }));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>
      
      {/* Button to open dialog */}
      <button
        onClick={handleOpenDialog}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Product Details
      </button>

      {/* Product Details Dialog */}
      <Dialog
        product ={selectedProduct}
        onClose={handleCloseDialog}
        shopRatings={shopRatings}
        onRateShop={handleRateShop}
      />
    </div>
  );
}