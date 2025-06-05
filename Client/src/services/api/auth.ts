import { api, privateApi } from "./axios";
import { LoginResponse, RegisterInput, User } from "@/types/auth";

export const registerRequest = async (userData: RegisterInput): Promise<User> => {
  const response = await privateApi.post("/auth/register", userData);
  return response.data;
};

export const loginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await privateApi.post("/auth/login", { email, password });
    const { accessToken, user } = response.data;
    localStorage.setItem("token", accessToken);
    return { user, accessToken };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
};

export const googleLoginRequest = () => {
  window.location.href = "http://localhost:4000/api/auth/google";
};

export const logoutRequest = async (): Promise<void> => {
  try {
    await privateApi.post("/auth/logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("token");
  }
};

export const getCurrentUserRequest = async (): Promise<User> => {
  try {
    const response = await privateApi.get("/auth/user");
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }
    throw error;
  }
};

export const refreshTokenRequest = async (): Promise<{ accessToken: string }> => {
  try {
    const response = await api.post(
      "/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken);
    return { accessToken };
  } catch (error) {
    localStorage.removeItem("token");
    throw error;
  }
};

export const forceLogoutRequest = (): void => {
  localStorage.removeItem("token");
  if (typeof window !== "undefined") {
    window.location.href = "/signin";
  }
};