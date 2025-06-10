import { ProductInput } from '@/types/index';
import { api } from './axios';

export const getAllProducts = async (): Promise<ProductInput[]> => {
  try {
    const { data } = await api.get<{ products: ProductInput[] }>('/products');
    return data.products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error; // or return []
  }
};

export const getProductsByCategory = async (category: string): Promise<ProductInput[]> => {
  try {
    const { data } = await api.get<ProductInput[]>(`/products/category/${category}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw error;
  }
};