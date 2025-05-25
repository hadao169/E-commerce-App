import { WHITELIST_DOMAINS } from "../utils/constants.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || WHITELIST_DOMAINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
