"use client";
import React,{
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getCurrentUserRequest,
} from "@/services/api/auth";
import { UserSchema, UserSignupInput } from "@/types/index";
import { errorMessage } from "@/lib/utils";

interface AuthContextType {
  user: UserSchema | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: UserSignupInput) => Promise<boolean>;
  isAuthenticated: boolean;
  error: string | null;
}

// Initialize AuthContext with an explicit undefined value to allow the context to be optional initially
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSchema | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }
      // get user and save to local storage
      const userData = await getCurrentUserRequest();
      if (!userData?.user) throw new Error("No user found");
      setUser(userData.user);
      setError(null);
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setError(errorMessage(error as Error));
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle Google OAuth callback
  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          localStorage.setItem("token", token);
          const userData = await getCurrentUserRequest();
          if (userData?.user) {
            setUser(userData.user);
            setError(null);
            router.push("/");
          } else {
            throw new Error("Failed to get user data");
          }
        }
      } catch (error) {
        console.error("Google login error:", error);
        setError(errorMessage(error as Error));
        localStorage.removeItem("token");
        router.push("/signin");
      }
    };

    handleGoogleCallback();
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password);
      if (data?.user && data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
        setUser(data.user);
        setError(null);
        return true;
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      console.error("Login error:", error);
      setError(errorMessage(error as Error));
      return false;
    }
  };

  const register = async (userData: UserSignupInput) => {
    try {
      const response = await registerRequest(userData);
      if (response?.success) {
        setError(null);
        return true;
      }
      throw new Error("Registration failed");
    } catch (error) {
      console.error("Register error:", error);
      setError(errorMessage(error as Error));
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setError(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError(errorMessage(error as Error));
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      router.push("/signin");
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
