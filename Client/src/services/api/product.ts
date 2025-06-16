import { ProductInput } from '@/types/index';
import { api } from './axios';
import { SortOption } from '@/types/index';

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
  sortOption?: SortOption
): Promise<ProductInput[]> => {
  try {
    const params = new URLSearchParams();
    if (sortOption) {
      params.set('sortBy', sortOption.field);
      if (sortOption.order) {
        params.set('order', sortOption.order);
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



