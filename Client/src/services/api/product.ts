import { ProductInput } from '@/types/index';
import { api } from './axios';

export const getAllProducts = async () => {
  const { data } = await api.get<{ products: ProductInput[] }>('/products');
  return data.products;
};

export const getProductBySlug = async (slug: string) => {
  const { data } = await api.get<ProductInput>(`/products/${slug}`);
  return data;
}; 