"use client";
import React, {
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

interface AuthContextType {
  user: UserSchema | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: UserSignupInput) => Promise<boolean>;
  isAuthenticated: boolean;
}

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
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      const { user } = await getCurrentUserRequest();
      if (!user) throw new Error("No user found");
      setUser(user);
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
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
            router.push("/");
          } else {
            throw new Error("Failed to get user data");
          }
        }
      } catch (error) {
        console.error("Google login error:", error);
        localStorage.removeItem("token");
        router.push("/signin");
      }
    };

    handleGoogleCallback();
  }, [router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await loginRequest(email, password);
      if (data?.user && data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error("An unexpected error occurred");
    }
  };

  const register = async (userData: UserSignupInput) => {
    try {
      const { user } = await registerRequest(userData);
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Logout error:", error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
