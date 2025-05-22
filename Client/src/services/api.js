import axios from "axios";
import { redirect } from "next/navigation";
import { refreshTokenRequest } from "./api/auth";
import { jwtDecode } from "jwt-decode";
import { apiRoot } from "../lib/constants";

const api = axios.create({
  baseURL: apiRoot,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
// add token to headers before sending request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Refresh token
// api.interceptors.response.use(
//   (response) => response,
//   async () => {
//     // convert token expiration time to milliseconds (*1000)
//     const expiresAt = jwtDecode(localStorage.getItem("token")).exp * 1000;
//     if (Date.now() >= expiresAt - 1000 * 60 * 10) {
//       const data = await refreshTokenRequest();
//       localStorage.setItem("refreshedToken", data.accessToken);
//       return api(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

// Response interceptor
// check if token is expired, if so, redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      redirect("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
