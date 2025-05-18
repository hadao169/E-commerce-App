"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getCurrentUserRequest,
  refreshTokenRequest,
} from "@/services/api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Get user info from token
        const user = await getCurrentUserRequest();
        if (user) {
          setUser(user);
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginRequest(email, password);
      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
      router.push("/");
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await registerRequest(userData);
      router.push("/signin");
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const refreshToken = async () => {
    try {
      const data = await refreshTokenRequest();
      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
    } catch (error) {
      console.error("Refresh token error:", error);
    }
  };
  const value = {
    user,
    login,
    logout,
    register,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
