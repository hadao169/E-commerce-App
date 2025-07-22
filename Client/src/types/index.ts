import { userSigninSchema, userSignupSchema, ProductInputSchema } from "@/lib/validation";
import { z } from "zod";

// Information typed in from the user
export type UserSigninInput = z.infer<typeof userSigninSchema>;
export type UserSignupInput = z.infer<typeof userSignupSchema>;
export type ProductInput = z.infer<typeof ProductInputSchema>;

export interface UserSchema {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  emailVerified?: boolean;
  tokenVersion?: number;
  createdAt?: string;
  updatedAt?: string;
}

// API Response types
export interface AuthResponse {
  user: UserSchema;
  accessToken: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export type LoginResponse = {
  user: UserSchema;
  accessToken: string;
};

export type RegisterInput = {
  id?: string;
  username: string;
  email: string;
  password: string;
};

export type SortOption = {
  field: string;
  order?: "asc" | "desc";
}

export type FilterOption = {
  minPrice?: number;
  maxPrice?: number;
  avgRating?: number;
};

