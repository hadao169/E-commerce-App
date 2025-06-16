import { useCallback, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllProducts, getProductsByCategory } from '@/services/api/product';

type SortOption = {
  field: string;
  order?: 'asc' | 'desc';
  label: string;
};

const sortOptions: SortOption[] = [
  { field: 'price', order: 'asc', label: 'Price: Low to High' },
  { field: 'price', order: 'desc', label: 'Price: High to Low' },
  { field: 'numSales', order: 'desc', label: 'Best Selling' },
  { field: 'avgRating', order: 'desc', label: 'Top Rated' }
];

export const useProductSort = (category?: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState<{ field: string; order: string } | null>(null);

  // Update current sort when URL changes
  useEffect(() => {
    const sort = searchParams.get('sort');
    if (sort) {
      const [field, order] = sort.split(':');
      setCurrentSort({ field, order });
    } else {
      setCurrentSort(null);
    }
  }, [searchParams]);

  const handleSort = useCallback(async (option: SortOption) => {
    try {
      setIsLoading(true);
      
      // Create new URLSearchParams without modifying the original
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('sort', `${option.field}:${option.order}`);
      
      // Fetch products first
      const products = category 
        ? await getProductsByCategory(category, { field: option.field, order: option.order })
        : await getAllProducts();

      // Only update URL if fetch was successful
      if (products) {
        // Use replace instead of push to avoid adding to history stack
        router.replace(`?${newParams.toString()}`, { scroll: false });
      }
      
      return products;
    } catch (error) {
      console.error('Failed to sort products:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [category, router, searchParams]);

  return {
    sortOptions,
    isLoading,
    handleSort,
    currentSort
  };
}; 