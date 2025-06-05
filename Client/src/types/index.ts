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
  emailVerified: boolean;
  tokenVersion: number;
  createdAt: string;
  updatedAt: string;
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