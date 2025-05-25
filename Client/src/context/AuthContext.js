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
  refreshTokenRequest,
} from "@/services/api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const userData = await getCurrentUserRequest();
      if (userData?.user) {
        setUser(userData.user);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setError(error.message);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle Google OAuth callback
  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        setLoading(true);
        setError(null);
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
        setError(error.message);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    handleGoogleCallback();
  }, [router]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const data = await loginRequest(email, password);
      if (data?.user && data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
        setUser(data.user);
        return true;
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerRequest(userData);
      if (response?.success) {
        return true;
      }
      throw new Error("Registration failed");
    } catch (error) {
      console.error("Register error:", error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await logoutRequest();
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
      router.push("/login");
    }
  };

  const refreshToken = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await refreshTokenRequest();
      if (data?.accessToken && data?.user) {
        localStorage.setItem("token", data.accessToken);
        setUser(data.user);
      } else {
        throw new Error("Invalid refresh token response");
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      setError(error.message);
      localStorage.removeItem("token");
      setUser(null);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    refreshToken,
    clearError: () => setError(null),
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
