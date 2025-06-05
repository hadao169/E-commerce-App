// import axios from 'axios';
// import { Product } from '@/types/product';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const getProducts = async (): Promise<Product[]> => {
//   const { data } = await api.get<Product[]>('/products');
//   return data;
// };

// export const getProductBySlug = async (slug: string): Promise<Product> => {
//   const { data } = await api.get<Product>(`/products/${slug}`);
//   return data;
// }; 