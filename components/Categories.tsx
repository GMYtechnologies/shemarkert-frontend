import React from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'dresses', name: 'Dresses', emoji: '👗' },
  { id: 'tops', name: 'Tops', emoji: '👚' },
  { id: 'maternity', name: 'Maternity', emoji: '🤱' },
  { id: 'hair-extensions', name: 'Hair Extensions & Wigs', emoji: '💇' },
  { id: 'wedding-dresses', name: 'Wedding Dresses', emoji: '👰' },
  { id: 'shoes', name: 'Shoes', emoji: '👠' },
  { id: 'lingerie', name: 'Lingerie', emoji: '🩱' },
  { id: 'suits', name: 'Suits', emoji: '👩‍💼' },
  { id: 'sportswear', name: 'Sportswear', emoji: '🏃‍♀️' },
  { id: 'leggings', name: 'Leggings', emoji: '🦵' },
  { id: 'pants', name: 'Pants', emoji: '👖' },
  { id: 'tshirts', name: 'T-Shirts', emoji: '👕' },
  { id: 'undergarments', name: 'Undergarments', emoji: '🩲' },
  { id: 'bags', name: 'Bags', emoji: '👜' },
  { id: 'hair-accessories', name: 'Hair Accessories', emoji: '🎀' },
  { id: 'denims', name: 'Denims', emoji: '👖' },
  { id: 'bikinis', name: 'Bikinis', emoji: '👙' },
  { id: 'others', name: 'Others', emoji: '✨' },
];

interface CategoriesProps {
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
  mode?: 'buyer' | 'seller';
  compact?: boolean;
}

export default function Categories({ selectedCategory, onCategorySelect, mode = 'buyer', compact = false }: CategoriesProps) {
  if (compact) {
    return (
      <div className="py-3">
        <div className="flex overflow-x-auto gap-2 scrollbar-hide pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={`
                h-12 px-3 flex-shrink-0 flex items-center gap-2 rounded-full whitespace-nowrap
                ${selectedCategory === category.id 
                  ? 'bg-garbata-gradient hover:opacity-90' 
                  : 'hover:bg-accent'
                }
              `}
              onClick={() => onCategorySelect?.(category.id)}
            >
              <span className="text-sm">{category.emoji}</span>
              <span className="text-xs">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h3 className="text-lg mb-6 text-center">Shop by Category</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`
              h-24 w-full flex flex-col items-center justify-center gap-2 rounded-full
              ${selectedCategory === category.id 
                ? 'bg-garbata-gradient hover:opacity-90' 
                : 'hover:bg-accent'
              }
            `}
            onClick={() => onCategorySelect?.(category.id)}
          >
            <span className="text-2xl">{category.emoji}</span>
            <span className="text-xs text-center leading-tight">{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export { categories };