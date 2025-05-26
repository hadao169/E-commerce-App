import { api, privateApi } from "./axios";

export const registerRequest = async (userData) => {
  const response = await privateApi.post("/auth/register", userData);
  return response.data;
};

export const loginRequest = async (email, password) => {
  try {
    const response = await privateApi.post("/auth/login", { email, password });
    const { accessToken, user } = response.data;
    localStorage.setItem("token", accessToken);
    return { user, accessToken };
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
};

export const googleLoginRequest = () => {
  window.location.href = "http://localhost:4000/api/auth/google";
};

export const logoutRequest = async () => {
  try {
    await privateApi.post("/auth/logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error);
    // Still remove token even if server request fails
    localStorage.removeItem("token");
  }
};

// get current user after login from the token and render it in the header userButton
export const getCurrentUserRequest = async () => {
  try {
    const response = await privateApi.get("/auth/user");
    return response.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }
    throw error;
  }
};

export const refreshTokenRequest = async () => {
  try {
    const response = await api.post(
      "/auth/refresh-token",
      {},
      {
        withCredentials: true, // This ensures cookies are sent
      }
    );
    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken);
    return { accessToken };
  } catch (error) {
    localStorage.removeItem("token");
    throw error;
  }
};

export const forceLogoutRequest = () => {
  localStorage.removeItem("token");
  if (typeof window !== "undefined") {
    window.location.href = "/signin";
  }
};
