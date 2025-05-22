export const apiRoot =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-app-u16v.onrender.com"
    : "http://localhost:4000/api";
