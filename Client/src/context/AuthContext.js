"use client";

import {
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

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
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
        router.push("/login");
      }
    };

    handleGoogleCallback();
  }, [router]);

  const login = async (email, password) => {
    try {
      const data = await loginRequest(email, password);
      if (data?.user && data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
        setUser(data.user);
        return true;
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      console.error("Login error:", error);

      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerRequest(userData);
      if (response?.success) {
        return true;
      }
      throw new Error("Registration failed");
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
      router.push("/login");
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
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
