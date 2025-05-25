import api from "../api";

export const registerRequest = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginRequest = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
};

export const googleLoginRequest = () => {
  window.location.href = "http://localhost:4000/api/auth/google";
};

export const logoutRequest = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// get current user from the token and render it in the header userButton
export const getCurrentUserRequest = async () => {
  const response = await api.get("/auth/user");
  const accessToken = response.headers["authorization"];
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    console.log("Access token set in localStorage", accessToken);
  }
  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};
