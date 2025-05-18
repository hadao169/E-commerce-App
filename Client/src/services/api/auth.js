import api from "../api";

export const loginRequest = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const registerRequest = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const logoutRequest = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUserRequest = async () => {
  const response = await api.get("/auth/user");
  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};
