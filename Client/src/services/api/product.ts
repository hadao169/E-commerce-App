import { ProductInput } from '@/types/index';
import { api } from './axios';
import { SortOption, FilterOption } from '@/types/index';
import { createProductQuery } from '@/lib/helpers';

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
  filter?: FilterOption
): Promise<ProductInput[]> => {
  try {
    // Ở đây, category là path param, còn các filter/sort để query string
    const queryString = createProductQuery({ sort, filter });
    const url = `/products/category/${category}${queryString ? `?${queryString}` : ""}`;
    const { data } = await api.get<ProductInput[]>(url);
    return data;
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    throw error;
  }
};

export const searchProducts = async (
  keyword: string,
  sort?: SortOption,
  filter?: FilterOption
): Promise<ProductInput[]> => {
  try {
    const queryString = createProductQuery({ keyword, sort, filter });
    const { data } = await api.get<{ products: ProductInput[] }>(`/products/search?${queryString}`);
    return data.products;
  } catch (error) {
    console.error("Failed to search products:", error);
    throw error;
  }
};

export const getProductDetail = async (id: string): Promise<ProductInput> => {
  try {
    const { data } = await api.get<{ product: ProductInput }>(`/products/${id}`);
    if (!data.product) {
      throw new Error('Product not found');
    }
    return data.product;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be caught by the component
  }
}


