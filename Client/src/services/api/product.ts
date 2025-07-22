import { ProductInput } from '@/types/index';
import { api } from './axios';
import { SortOption, FilterOption } from '@/types/index';

export const getAllProducts = async (): Promise<ProductInput[]> => {
  try {
    const { data } = await api.get<{ products: ProductInput[] }>('/products/');

    return data.products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error; // or return []
  }
};

export const getProductsByCategory = async (
  category: string,
  sort?: SortOption,
  filter?: FilterOption,
): Promise<ProductInput[]> => {
  try {
    const params = new URLSearchParams();
    if (sort ) {
      params.set('sortBy', sort.field);
      if (sort.order) {
        params.set('order', sort.order);
      }
    }

    if (filter) {
      if (filter.avgRating) {
        params.set('avgRating', filter.avgRating.toString());
      }
      if (filter.minPrice !== undefined && filter.maxPrice !== undefined) {
        params.set('minPrice', filter.minPrice.toString());
        params.set('maxPrice', filter.maxPrice.toString());
      }
    }

    const queryString = params.toString();
    const url = `/products/category/${category}${queryString ? `?${queryString}` : ''}`;
    
    const { data } = await api.get<ProductInput[]>(url);
    return data;
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw error;
  }
};



