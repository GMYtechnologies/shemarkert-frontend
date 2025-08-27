import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
/*import { categories } from './categories'; */
import { 
  Store, 
  Plus, 
  MapPin, 
  Phone, 
  Mail,
  Upload,
  Eye,
  Edit,
  Package,
  Star,
  Cat
} from 'lucide-react';
import { categories } from './categories';

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
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  sizes: string[];
  colors: string[];
  description: string;
}

interface ShopManagementProps {
  onShopSelect: (shop: Shop | null) => void;
  selectedShop: Shop | null;
}

export default function ShopManagement({ onShopSelect, selectedShop }: ShopManagementProps) {
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

  const [isAddingShop, setIsAddingShop] = useState(false);
  const [newShop, setNewShop] = useState({
    name: '',
    description: '',
    location: '',
    contact: '',
    email: '',
    image: ''
  });

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '',
    sizes: [] as string[],
    colors: [] as string[],
    description: ''
  });

  const handleAddShop = () => {
    if (!newShop.name || !newShop.location || !newShop.contact) {
      alert('Please fill in all required fields');
      return;
    }

    const shop: Shop = {
      id: Date.now().toString(),
      ...newShop,
      rating: 0,
      totalProducts: 0,
      products: [],
      image: newShop.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop'
    };

    setShops([...shops, shop]);
    setNewShop({ name: '', description: '', location: '', contact: '', email: '', image: '' });
    setIsAddingShop(false);
  };

  const handleAddProduct = () => {
    if (!selectedShop || !newProduct.name || !newProduct.category || !newProduct.price) {
      alert('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock) || 0,
      image: newProduct.image || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      sizes: newProduct.sizes,
      colors: newProduct.colors,
      description: newProduct.description
    };

    const updatedShops = shops.map(shop => 
      shop.id === selectedShop.id 
        ? { ...shop, products: [...shop.products, product], totalProducts: shop.totalProducts + 1 }
        : shop
    );

    setShops(updatedShops);
    const updatedSelectedShop = updatedShops.find(shop => shop.id === selectedShop.id);
    onShopSelect(updatedSelectedShop || null);

    setNewProduct({
      name: '', category: '', price: '', stock: '', image: '',
      sizes: [], colors: [], description: ''
    });
    setIsAddingProduct(false);
  };

  if (selectedShop) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => onShopSelect(null)}>
              ← Back to My Shops
            </Button>
            <div>
              <h2 className="text-2xl">{selectedShop.name}</h2>
              <p className="text-muted-foreground">{selectedShop.totalProducts} products</p>
            </div>
          </div>
          <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
            <DialogTrigger asChild>
              <Button className="bg-garbata-gradient hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh]">
              <DialogHeader className="flex-shrink-0">
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product to {selectedShop.name}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 overflow-y-auto scrollbar-hide flex-1 min-h-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select 
                      value={newProduct.category} 
                      onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price (TZS)</Label>
                    <Input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock Quantity</Label>
                    <Input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      placeholder="Enter stock quantity"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Product Image URL</Label>
                  <Input
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    placeholder="Enter image URL or leave empty for default"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Available Sizes (comma separated)</Label>
                    <Input
                      value={newProduct.sizes.join(', ')}
                      onChange={(e) => setNewProduct({
                        ...newProduct, 
                        sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      })}
                      placeholder="XS, S, M, L, XL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Available Colors (comma separated)</Label>
                    <Input
                      value={newProduct.colors.join(', ')}
                      onChange={(e) => setNewProduct({
                        ...newProduct, 
                        colors: e.target.value.split(',').map(c => c.trim()).filter(c => c)
                      })}
                      placeholder="Red, Blue, Black, White"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Product Description</Label>
                  <Textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Describe your product..."
                  />
                </div>

                <div className="flex gap-2 pt-4 flex-shrink-0">
                  <Button onClick={handleAddProduct} className="bg-garbata-gradient hover:opacity-90">
                    Add Product
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedShop.products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary">
                    {categories.find(Cat => Cat.id === product.category)?.name || product.category}
                  </Badge>
                  <span className="text-lg text-primary">TZS {product.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Stock: {product.stock} items</p>
                {product.sizes.length > 0 && (
                  <p className="text-xs text-muted-foreground mb-2">
                    Sizes: {product.sizes.join(', ')}
                  </p>
                )}
                {product.colors.length > 0 && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Colors: {product.colors.join(', ')}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {selectedShop.products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products yet. Add your first product!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">My Shops</h2>
        <Dialog open={isAddingShop} onOpenChange={setIsAddingShop}>
          <DialogTrigger asChild>
            <Button className="bg-garbata-gradient hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add Shop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh]">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>Add New Shop</DialogTitle>
              <DialogDescription>Create a new shop to start selling your products</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto scrollbar-hide flex-1 min-h-0">
              <div className="space-y-2">
                <Label>Shop Name *</Label>
                <Input
                  value={newShop.name}
                  onChange={(e) => setNewShop({...newShop, name: e.target.value})}
                  placeholder="Enter shop name"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Location *</Label>
                <Input
                  value={newShop.location}
                  onChange={(e) => setNewShop({...newShop, location: e.target.value})}
                  placeholder="City, Region"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Contact Number *</Label>
                <Input
                  value={newShop.contact}
                  onChange={(e) => setNewShop({...newShop, contact: e.target.value})}
                  placeholder="+255 xxx xxx xxx"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={newShop.email}
                  onChange={(e) => setNewShop({...newShop, email: e.target.value})}
                  placeholder="shop@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Shop Image URL</Label>
                <Input
                  value={newShop.image}
                  onChange={(e) => setNewShop({...newShop, image: e.target.value})}
                  placeholder="Enter image URL or leave empty for default"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Shop Description</Label>
                <Textarea
                  value={newShop.description}
                  onChange={(e) => setNewShop({...newShop, description: e.target.value})}
                  placeholder="Describe your shop..."
                />
              </div>
              
              <div className="flex gap-2 pt-4 flex-shrink-0">
                <Button onClick={handleAddShop} className="bg-garbata-gradient hover:opacity-90">
                  Create Shop
                </Button>
                <Button variant="outline" onClick={() => setIsAddingShop(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <Card key={shop.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <img 
                src={shop.image} 
                alt={shop.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <div className="space-y-2">
                <h3 className="text-lg">{shop.name}</h3>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{shop.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{shop.contact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{shop.rating}</span>
                  </div>
                  <Badge variant="outline">{shop.totalProducts} products</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{shop.description}</p>
              </div>
              <Button 
                onClick={() => onShopSelect(shop)}
                className="w-full mt-4 bg-garbata-gradient hover:opacity-90"
              >
                Manage Shop
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}