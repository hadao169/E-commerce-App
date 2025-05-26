import axios from "axios";
import { apiRoot } from "../../lib/constants";
import { refreshTokenRequest, forceLogoutRequest } from "./auth";

// Create an Axios instance with default config
const api = axios.create({
  baseURL: apiRoot,
  withCredentials: true, // Enable sending cookies
});

const privateApi = axios.create({
  baseURL: apiRoot,
  withCredentials: true, // Enable sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Before each request is sent, attach the accessToken (if exists)
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// After each response, handle token refresh and error cases
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request has already been retried, reject
    if (error?.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Attempt to refresh the token
      const { accessToken } = await refreshTokenRequest();

      // Update the failed request's authorization header
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      // Retry the original request
      return privateApi(originalRequest);
    } catch (refreshError) {
      // If refresh token fails, force logout
      forceLogoutRequest();
      return Promise.reject(refreshError);
    }
  }
);

export { api, privateApi };
