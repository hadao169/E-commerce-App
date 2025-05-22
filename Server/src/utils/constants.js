import env from "../config/env.js";

// Whitelist domains that is allowed to access the server APIs
export const WHITELIST_DOMAINS = ["http://localhost:3000", env.CLIENT_URL];
