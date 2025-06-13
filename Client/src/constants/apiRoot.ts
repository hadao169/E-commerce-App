export const apiRoot =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:4000/api";

console.log(apiRoot)

