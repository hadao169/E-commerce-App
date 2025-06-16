import { api, privateApi } from "./axios";
import { LoginResponse, RegisterInput, UserSchema } from "@/types/index";
import { errorMessage } from "@/lib/utils";

// Register new user, returns user info
export const registerRequest = async (userData: RegisterInput): Promise<{ user: UserSchema }> => {
  const response = await privateApi.post<{ user: UserSchema }>("/auth/register", userData);
  return response.data;
};

// Login with email & password, returns user info + accessToken
export const loginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await privateApi.post<LoginResponse>("/auth/signin", { email, password });
    const { accessToken, user } = response.data;
    localStorage.setItem("token", accessToken);
    return { user, accessToken };
  } catch (error: unknown) {
    //     if (axios.isAxiosError(error) && error.response?.data?.message) {
    //   throw new Error(error.response.data.message);
    // }
  throw new Error(errorMessage(error as Error));
}
};

// Redirect to Google OAuth login
export const googleLoginRequest = (): void => {
  if (typeof window !== "undefined") {
    window.location.href = "http://localhost:4000/api/auth/google";
  }
};

// Logout user, clears token and calls backend logout
export const logoutRequest = async (): Promise<void> => {
  try {
    await privateApi.post("/auth/signout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("token");
  }
};

// Get current logged-in user info
interface AxiosErrorWithStatus {
  response?: {
    status?: number;
    data?: string;
  };
}

  export const getCurrentUserRequest = async (): Promise<{ user: UserSchema }> => {
    try {
      const response = await privateApi.get<{ user: UserSchema }>("/auth/user");
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithStatus;
      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
      }
      throw error;
    }
  };


// Refresh JWT token
export const refreshTokenRequest = async (): Promise<{ accessToken: string }> => {
  try {
    const response = await api.post<{ accessToken: string }>(
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

// Force logout on client side: clear token and redirect to signin page
export const forceLogoutRequest = (): void => {
  localStorage.removeItem("token");
  if (typeof window !== "undefined") {
    window.location.href = "/signin";
  }
};
